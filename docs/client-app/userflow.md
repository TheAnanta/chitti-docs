# User Flow

## Onboarding

### Authentication

As soon as the user installs the CHITTI. client application, the user is greeted to authenticate with the credentials of their learning management system portal, to provide secure authentication and to uniquely map a student to their account on CHITTI, in exchange for an authentication token provided by the Firebase Auth Admin SDK.

If an authenticated user already exists, the user is sent to the home page displaying the dashboard fragment.

### Enrollment

The user authentication is then used to fetch academic details of the users, such as the current semester enrolled, the course code of the subjects enrolled in the current semester, the academic GPA and academic progress, their hall ticket.

This data helps deliver a seamless personally tailored experience for every student, such as visibility of currently enrolled courses only, motivation before the examination and helps revoke access after the specific examination to ensure the legally secured content of CHITTI. stays proprietory and is not shared within fellow students.

## Data Fetching

Upon enrollment of a student, the data is used to fetch the semester particulars such as the subjects enrolled and application data, primarily, the course code of subjects for enrolled semester, the units within each subject enrolled, the roadmap items of a particular unit, the purchase status of a particular subject by the user and the resource IDs of the resources visited/completed by the user.

During the app startup, at the splash page where the injector is initialized, the semester repository is responsible for fetching the above data. Upon successful retrival of the data, the user is sent to the dashboard fragment hosted in the home page.

## Navigation

The dashboard fragment, displays a grid of courses enrolled by the user in the current semester along with the progress of completion. Upon selecting a specific course, the user is navigated to the subject page which briefs the user on the course, displays a comprehensive list of topics under each unit of the courses, which can be unlocked/locked.

### Payment

If the user hasn't completed the purchase for a specific course, the user is prompted to purchase the course by presenting the user with a comprehensive bottom modal sheet which explains the benefit of purchasing a course on CHITTI.

When the user decides to make a payment, an API request is sent to create a specific order on the payment gateway with the course ID, the user ID, and the amount. We retrive the razorpay order ID which is then used to initialize the payment gateway interface (Razorpay UI) with the order_ID and the payment flow is then handled by the payment gateway, to provide two callbacks:

1. **Success callback:** Although the success callback provides valuable data regarding the puchase, the CHITTI client app makes use of the webhook callback for security to append the course ID to the list of enrolled courses for the respective user, which is then read from the data source.

   If the payment is deemed successful by the web hook, then the **course is appended** to the list and the **subscription type** of the user is changed. More about subscriptions and subscription types can be read [**here**](/reference/client#subscription-type).

   Once the event is trigged about change of the subscription type, the user is reauthenticated programmatically with the new token containing the fresh details of the user.

2. **Failure callback:** The user is prompted to complete the payment again.

### Course

Upon successfully enrolling a specific course _(used interchangable with subject)_, the user is presented with the weighted roadmap of individual topics in each unit of the course, to help aid in the last minute exam preparation.

Upon choosing a specific roadmap item, the user is navigated to the resource page for the specific topic.

### Resources

The resource page uses a tabbed view to simplify the user navigation while accessing the user content, such as videos, notes, important questions, etc. Whenever a user access a specific resource, its resource ID is appended to the completed resources datafield, helping track progress.

### PDF Viewer

The application makes use of the [**`pdfrx`**](https://pub.dev/packages/pdfrx) package to render the high quality PDFs and deliver a plethora of features like Table of Contents (ToC), highlighting, and thumbnail view, all from the url of the resource hosted on Firebase Storage.

### Video Player

The application makes extensive use of the [**`video_player`**](https://pub.dev/packages/video_player) and its NetworkController to stream high quality videos stored on Firebase Storage directly to the user, and specific overlays are implemented to help the user navigate through the video, such as skip 10s, the video scrubber, play/pause, etc.

## Profile

The profile aims to be a centralized repository for viewing the report regarding a user overall progress, recently visited resources, etc.
