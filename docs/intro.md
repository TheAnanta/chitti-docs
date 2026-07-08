---
sidebar_position: 1
---

# Docs

## Preface

**[CHITTI.](https://scorewithchitti.in)** Your last minute exam preparation buddy. (hereforth refered to as **CHITTI.**) is an edutech venture built under the roof of the Venture Development Center, Gandhi Institute of Technology and Management ([GITAM](https://gitam.edu)), as of on date April 23, 2025. The application and its technical dependencies were built by the house of [the ananta studio](https://theananta.in).

The application can be modularized in to the following which will be individually discussed in further sections in detail:

- [Landing webpage](#landing-webpage)
- [Client application](#client-application)
- [Admin web application](#admin-web-application)
- [Serverlet application](#serverlet-application)

## Modules

### Landing webpage

Landing webpage serve a source of information about the product, its model and provides useful resources for new customers and organizations that need reliable source of information to establish a mutual agreement over information shared, thus allowing us to make use of services provided by the said 3rd party organization.

In the context of CHITTI., the landing webpage serves as the source of information for\
• new customers to understand the product, its benefits;\
• serves as a reliable source of information to be shared with the market stores for individual platforms that host the client application **_(eg. Play Store, App Store, etc.)_**;\
• and the Razorpay team to meet with their policies and make payments.

#### Technology Stack:

1. HyperText Markup Language (HTML)
2. TailwindCSS [<sup>1</sup>](#references-1)
3. JavaScript (JS)

#### Hosting

**Platform:** GitHub Pages\
**URL:** The webpage can be accessed at [`scorewithchitti.in`](https://scorewithchitti.in).

## Setup

The entry point to the code is available at **`index.html`**.

### Repository

URL: https://github.com/theananta/chitti-landing

### Steps to run

To run the client application:

1. Clone the repository.
2. Open the index.html file.

<!-- Detailed architectural overview about the landing webpage can be found [here](/docs/landing/overview). -->

### Client application

The client application _(labelled `CHITTI.` on market stores)_ is the entry point for customers who are currently enrolled (or) wish to be enrolled customers of CHITTI. to access the resources purchased (or) to be purchased.

The application allows users to sign in with their organizational email address and password used to login to the learning management system portal, as a measure of secure authentication to provide a personally tailored experience. The users are then offered to purchase content for the subjects they wish to pursue, of which they are enrolled in the current semester in the organization. On successful purchase, the content is available to the users, which is revoked upon completion of the exam **automatically**.

**NOTE**: The client application provides a free-tier for the users, i.e, the **first unit** of every subject is provided as a **freemium** offerring.

The client application is available to the public for the following platforms:

- [Android](https://play.google.com/store/apps/details?id=dev.theananta.chitti)
- [iOS](https://apps.apple.com/in/app/chitti/id6761459926)
- [Windows](https://github.com/TheAnanta/chitti-app/releases/download/5.0.6/chitti.exe)
- [macOS](https://github.com/TheAnanta/chitti-app/releases/download/5.0.5/chitti-2025-5.0.5-mac.dmg)

#### Technology Stack

1. Flutter [<sup>2</sup>](#references-2)
2. Google Cloud [<sup>3</sup>](#references-3)

Detailed architectural overview about the client application can be found [here](/docs/client-app/overview).

### Serverlet application

The serverlet application serves as the interface **(API)** exposing the application data from the database via well-defined syntax, requests and semantics termed as API routes.

The serverlet application depends on the representational state transfer **(REST)** architecture to serve client requests to the underlying data based on the HTTP request/response protocol. As a user makes a request to a specific endpoint of the serverlet, an SQL query is run to fetch/modify data in the database to respond with a specific response with a specific HTTP status code.

#### Technology stack:

1. Express [<sup>4</sup>](#references-4)
2. PostgreSQL [<sup>5</sup>](#references-5)
3. Prisma ORM
4. Node.Js [<sup>4</sup>](#references-4)

#### Hosting

1. **Cloud Run [<sup>3</sup>](#references-3)**\
   The servelet application is written as a specialized non-preemptive application hosted over the Google Cloud Run [<sup>3</sup>](#references-3) Functions offerring in the free tier.
2. **Cloud SQL [<sup>3</sup>](#references-3)**\
   The SQL offerring of Google Cloud is used to host the database for the entire application which is connected using the pooling URL of Prisma as the ORM.

### Admin application

The admin application serves as the interface between the database and content that is served over the serverlet application.

The mobile application allows the **admins** _(users with elevated permissions to manage content)_ to **view, edit and delete** subjects, units, topics and the content for each of the earlier stated hierarchial unit.

#### Technology Stack:

1. Flutter [<sup>2</sup>](#references-2)
2. Cloud Run [<sup>3</sup>](#references-3)
3. Cloud SQL [<sup>3</sup>](#references-3)

#### Hosting

- [Android](https://play.google.com/store/apps/details?id=dev.theananta.chitti)
- [iOS](https://apps.apple.com/in/app/chitti/id6761459926)

Detailed architectural overview about the admin application can be found [here](/docs/admin-app).

## References

<span id="references-1">1. The Tailwind name and logos are trademarks of Tailwind Labs Inc.</span><br/><br/>

<span id="references-2">2. The "Flutter" name and logo are trademarks owned by Google LLC.</span><br/><br/>

<span id="references-3">3. "Google Cloud", "Cloud Run", and "Cloud SQL" are trademarks or registered trademarks of Google LLC.</span><br/><br/>

<span id="references-4">4. Node.js and Express are projects of the OpenJS Foundation. This is a statement of the OpenJS Foundation’s trademarks and its policy and guidelines relating to use of trademarks owned by the OpenJS Foundation and used by projects under the OpenJS Foundation.</span><br/><br/>

<span id="references-5">5. Postgres, PostgreSQL and the Slonik Logo are trademarks or registered trademarks of the PostgreSQL Community Association of Canada.</span><br/><br/>
