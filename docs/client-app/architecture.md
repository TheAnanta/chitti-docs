# Architecture

## Overview

The CHITTI. client application is built with the Flutter SDK following the clean
architectural principles and taking guidance from the
[Android Architectural Components](https://developer.android.com/topic/architecture)
such as **modularization, unidirectional dataflow and Hilt-like injection**.

The **Flutter SDK** [<sup>1</sup>](#references-1) is a comprehensive framework
that aids in building beautiful, native-like cross-platform applications from a
single codebase with the help of the Flutter Engine which renders content over
native applications as a fragment, making use of the rich performance and
optimization delivered by the **Dart** [<sup>2</sup>](#references-2) programming
language.

## Modules

Every module within CHITTI is specificially architected to make sure each module
follows the principle of least coupling, i.e, stays independant of each other,
but works together like a monolithic structure without the need for
publisher/subscriber architecture.

We also make sure to comply with the principle of highest cohesion, i.e, modules
should comprise a collection of code that acts as a system. They should have
clearly defined responsibilities and stay within boundaries of certain domain
knowledge.

The CHITTI application is primarily divided into the follow major modules:

### core

1. **`core/constants`**: A set of constants that can be used throughout the
   application which involve the different categories of the user application
   such as faculty core, open elective, etc.
2. **`core/di`**: A set of classes and methods required for dynamically
   injecting required classes into the constructors of other dependant
   classes/objects to implement singleton classes.<br/>To know more about
   dependency injection, you can refer to the following
   [**blog**](https://developer.android.com/training/dependency-injection).
3. **`core/error`**: A set of exceptions and failure classes that are used
   throughout the application to handle errors.<br/>Standardizing exceptions and
   grouping errors into specific classes really helps us make sure we identify
   and handle error correctly, making sure we don't make any kind of human error
   due to typo mistakes in the error mitigation.
4. **`core/navigation`**: A module that houses the navigation service that
   allows for dynamically handling routing and navigation between different
   pages/screens.
5. **`core/network`**: A set of classes and methods used to format the endpoints
   for the API requests and for dynamically handling network requests and
   responses using predefined headers and building reusable code that includes
   adding token from Firebase and handling JSON encoding and decoding.
6. **`core/theme`**: A set of classes and methods required for injecting
   required classes into the constructors of other dependant classes/objects to
   implement singleton classes related to theming and sizing for building
   responsive UI.
7. **`core/utils`**: A set of utility functions and helper methods used
   throughout the application that deal with data structures, mathematical
   operations, device and security operations.

### features:

1. **`feature/activity`**: The users interaction history in the CHITTI ecosystem
   is tracked by the entity termed as **activity**. Everytime the user
   subscribes to a topic, watches a video, reads the notes or scrims over a
   cheatsheet or views an important questions, its is logged as an activity.
   Activities help us **track the progress of a user** in the application to
   help provide suggestive correlation between their grades and their time spent
   on the application.
   <br/>This module exists to function as the primary source of truth and
   operational depenedency of the activity model and related depenendency,
   existing as a cohesive non-coupled module.
2. **`feature/app`**: This module provides the major depenednecies required to
   boot start the app which include the `get_version_usecase` which checks if
   the user is in the latest version of the application, or needs to update the
   app through the splash screen.
3. **`feature/auth`**: This module exposes the entire authentication blueprint
   that the application requires, exposing critical modules and user interfaces.
4. **`feature/chat`**: An external module that was built for the **BetaChat™ (by
   ananta studio)** interface that provides chat features like DMs, ticketing
   and more to the application.
5. **`feature/commerce`**: A critical module that houses methods, classes and
   dependencies that coordinate and are highly cohesed to work together that
   build the entire payment workflow and related datapoints such as coupons,
   cart, feedback, offers, Apple Pay, RazorPay, etc.
6. **`feature/community`**: A nice-to-have module that brings the feature of
   community based learning and social interactions to the CHITTI app.
7. **`feature/courses`**: A critical module that houses methods, classes and
   dependencies that are responsible for fetching, viewing and tracking states
   of content within the application like videos, notes, cheatsheets, and
   important questions through different courses, units and topics.
8. **`feature/home`**: A module responsible for displaying the home screen which
   is a complex unit displaying multiple areas of responsive UI, and custom
   announcements/offers, exam tips and more.
9. **`feature/notifications`**: A module cohesive and decoupled to deal with
   notifications via the push notifications and the Firebase Cloud Messaging
   module.
10. **`feature/student`**: A public module that interacts with the student data
    from the backend to search, query and filter users to provide and hydrate
    other non-hydrated parts _**(providing entire data of a user rather than
    just user_id in any other table; non-hydrated - user_id; hydrated - entire
    user data filtered based on user id)**_ of the application data.
11. **`feature/support`**: A set of methods, classes and interfaces that are
    pivotal to unlocking the support system of the application in terms of FAQ
    and ability to create, triage (delegate), solve and disucss issues faced
    within the application.

### shared

1. **`shared/extensions`**: A set of utility classes that help reduce
   boilerplate within the application.
2. **`shared/utils`**: A set of callbacks required within the application that
   are called when an action is completed.
3. **`shared/widgets`**: A set of visual widgets that are reused in multiple
   aspects of the mobile application including animations, puzzle-peiced widgets
   and more.

### utils

A set of utility classes responsibile for critical features that support not
directly, but as utility classes such as atomic updates, sections and more.

## Components

The components of the every module within the client application can be primary
divided into 3 layers: data, domain and presentation layer.

• **The data layer** deals with data and operations related to maintaining the
application data. The data layer includes datasources, implementation of
repositories and model with their functions.

• **The domain layer** deals with handling busssiness logic and performing
common repetitive operations and defined the scope of code to the scope of the
bussiness activity. The domain layer includes abstract repository patterns,
entities that the bussiness deals with, and use cases that the application needs
to handle to meet bussiness requirements.

• **The presentation layer** deals with interfaces that the user interacts with.
The presentation layer includes widgets and pages that are visible to the user,
injectors and state management that aid in providing the state to the respective
widgets and pages to be used to draw the elements on the screen and making sure
the data is always up-to-date and synchronized.

### Models

Models are the digital implementation of real-world objects. They include
properties and methods that help identify the object and define boundaries
around which/how the object can be handled. The CHITTI. application makes use of
the following models throughout the scope of the application:

1. Activity
2. Admin
3. Editor
4. Instructor
5. Staff
6. Student
7. Chat
8. ChatMessage
9. Coupon
10. CourseCartItem
11. Feedback
12. Offers
13. Payment
14. Reel
15. Course
16. Enrollments
17. Unit
18. Topic
19. UnitWithResources
20. Cheatsheet
21. Video
22. Notes
23. Important Questions
24. Banner
25. Notification
26. Badge
27. EnrolledCourse
28. FAQ
29. Ticket
30. TicketComment

These specific models are defined based on the **bussiness model** of CHITTI.
and are
[static final](https://www.geeksforgeeks.org/final-static-variable-java/)
classes that are implemented in the data layer to help set constraints on the
various operations that can be performed on data of the particular type. More
about the schemas of each of the above models can be read [**here**](models).

### Datasources

Datasources are specialized classes that hold, provide and allow for
modification of application data. For CHITTI. the API responses from the
serverlet application acts as the primary datasource and the **primary source of
truth**.

The data source uses the `fetch` method provided by the
[`http`](https://pub.dev/packages/http) package to make the HTTP requests to the
serverlet.

For convenience, better state management and better user experience, a copy of
the data from the primary source of truth is cloned and cached in the repository
for faster, cheaper and easier access to data, i.e, acts as the **secondary
source of truth**, however as an **online-first experience**, the data from the
primary source of truth, the application data from the APIs serve as the final
ultimate source of truth.

### Repositories

Repositories are specialized classes that interface the presentation layer and
data sources to expose the application data from multiple data sources to
provide the latest source of truth to the presentation layer. Due to high
upsurge in the HTTP requests that are sent to the servelet from the client
application, proper management of the source of truth becomes inevitable.

As per the requirement of the product owner, the application can only be run
only from a single device instance at a particular instance of time. This
eliminates the chance of deadlock on the data present in the server. Hence,
optimal fetching of data can be implemented by using the repository through
cloning the application data from the server during app startup, and then making
changes to both offline and online datasources implemented through the
repository to reduce the HTTP `GET` requests, reducing the bandwith on the
server.

Thus, the client application, extends the
[**`SemesterRepository`**](https://github.com/TheAnanta/chitti-app/blob/main/lib/data/semester_repository.dart)
to interface the application data pertaining to the relevant semester details of
a particular authenticated student and the presentation layer. The data in the
`SemesterRepository` is further utilized to fetch the specific topic-related
data and content at runtime on request by the
[**`UnitRepository`**](https://github.com/TheAnanta/chitti-app/blob/main/lib/data/unit_repository.dart)
which holds the latest data about each individual topic of a unit present in a
subject, stored as cache in the internal memory, to be retrived for further use
and upholds the latest changes to the data to synchronize indirectly with the
data present in the server.

### Use cases

Use cases are constraint-bounded well-defined functions that are the backbone
for the bussiness activity of the application. They are functions which are
called frequently from different parts of the application to serve the purpose
of the application. They expose functions, methods and data through well-defined
strucutre and schema like data fetching, modifying data, etc.

The CHITTI app heavily relies on two major use cases:

1. fetchSemester
2. fetchResourcesForUnit

More about the use cases, their input and output schemas and usage can be
understood [**here**](usecases).

### Injector

The injector is a specialized static class that exposes the repository to the
presentation layer, providing the specific instance of a specific class that is
very costly to construct to the descendants of the application widget tree below
the initialization.

According to the
[Android Architectural Components](https://developer.android.com/topic/architecture),
injection of specific dependencies caters for the ability to be able to develop
and test efficient code to work with different sources, i.e, abstracts the logic
into well-defined classes that can swapped out at any particular instance of
time without disturbing the harmonical balance of the application, thus avoiding
any potential coupling within the application.

In the context of the CHITTI., the injector injects a
[**singleton**](https://en.wikipedia.org/wiki/Singleton_pattern) instance of the
`SemesterRepository` and `UnitRepository` to the descendants of the
`MaterialApp` widget.

### State Management

State management libraries maintain (fetched and updated) the application data
provided by the repositories through the static singleton instance of the
injector contains the application state based on user interaction. They maintain
a history of the state to be able to produce the dynamic user interace in the
application upon binding with the stateless state holder views.

In CHITTI., the in-built state management functionality provided by the Flutter
SDK such as
[`ChangeNotifier`](https://api.flutter.dev/flutter/foundation/ChangeNotifier-class.html),
[`ValueListenableBuilder`](https://api.flutter.dev/flutter/widgets/ValueListenableBuilder-class.html)
and [`setState`](https://api.flutter.dev/flutter/widgets/State/setState.html)
are used to manage and share state across the application with help from the
singleton instance of the related repositories through the injector.

### Widgets

Widgets are specialized Dart classes that are defined to be producing a
stateless/stateful user interface after a series of computatations,
measurements, composition and painting.

Flutter follows the declarative pattern of writing code, i.e, the user interface
is built/updated on the application state that is provided rather than user
called functions to set the application state, i.e, in laymans terms, what you
provide is what you get.

In CHITTI., most of the widgets are simple stateless widgets due to their
low-cost of construction, simplicity of lifecycle, and static data they display.
The state management libraries act as the primary source of stateless holders
for the app state to be displayed with the lifeless stateless widgets.

### Pages

Pages are stateless/stateful widgets that are a combination of specific
components rendered to build complex user interface screens that help establish
the userflow.

The primary pages of CHITTI. are follows:

1. Splash Page
2. Login Page
3. Home Page
4. Dashboard Fragment
5. Subject Page
6. Topic Page
7. PDF Viewer Page
8. Video Player Page
9. Profile Page

## References

<span id="references-1">1. The "Flutter" name and logo are trademarks owned by
Google.</span><br/><br/>

<span id="references-2">2. The "Dart" name and logo are trademarks owned by
Google.</span><br/><br/>
