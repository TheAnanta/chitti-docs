# Admin panel application

## Overview

The admin web application serves as the interface between the database and content that is served over the serverlet application.

The web application allows the **admins** _(users with elevated permissions to manage content)_ to **view, edit and delete** subjects, units, topics and the content for each of the earlier stated hierarchial unit.

Every route and operation is secured with **token-based authentication**.

### Technology Stack

1. Next.Js [<sup>1</sup>](#references-1)
2. Cascading Style Sheet (CSS)
3. TailwindCSS [<sup>2</sup>](#references-2)
4. Typescript
5. Node.Js [<sup>3</sup>](#references-3)
6. Firebase [<sup>4</sup>](#references-4)

### Hosting

**Platform:** Vercel\
**URL**: The admin panel can be accessed at [`admin.scorewithchitti.in`](https://admin.scorewithchitti.in).

## Setup

The entry point to the code is available at **`/src/app/page.tsx`**.

### Repository

URL: https://github.com/ManasMalla/chitti-admin

### Steps to run

To run the client application:

1. Clone the repository.
2. Run `npm run dev` to run the development server locally
3. Run `npm run build` to build the application locally.

## Architecture

### Functions

The admin panel is a **client-side** rendered web application which makes extensive use of built in JavaScript functions like `fetch`, `alert`, and `prompt` to handle data fetching and intimation of status to the user.

It makes heavy usage of React hooks like `useState` and `useEffect` to handle state management and page lifecycle.

The admin panel upload the specific resources to be created on the **`Firebase Storage`** instance hosted in the nearest non-quota center, i.e, `us-central-1`, to retrive a downloadable URL to be parsed into the POST APIs at the time of resource creation.

### Features

The admin application allows the user to:

1. View existing courses
2. Add new courses mapped to GITAM courses
3. View units of a specific course
4. Add new units to a specific course
5. View the topics and their priority level within a unit.
6. Add a new topic to a specific unit and mention its priority level for exam preparation.
7. Edit the priority of a specific topic within a unit.
8. Upload, modify and delete important questions pertaining to a specific unit.
9. View the specific resources of a specific topic such as notes, imporant questions, cheatsheets and videos.
10. Upload, modify and delete specific resources within a specific topic.
11. Revoking the device ID of a specific user on request.

## Authentication

The admin is greeted to authenticate with the credentials of their learning management system portal, to provide secure authentication and to uniquely map the student admin to their account on CHITTI, in exchange for an authentication token provided by the Firebase Auth Admin SDK.

The token is then stored as a short-lived cookie which is appended as the **Bearer** `Authorization` headers of APIs sent through the admin panel.

## References

<span id="references-1">1. The Next.js trademark includes the Next.js name & logo, and any word, phrase, image, or other designation that identifies any Vercel products.</span><br/><br/>

<span id="references-2">2. The Tailwind name and logos are trademarks of Tailwind Labs Inc.</span><br/><br/>

<span id="references-3">3. Node.Js and Express are projects of the OpenJS Foundation. This is a statement of the OpenJS Foundation’s trademarks and its policy and guidelines relating to use of
trademarks owned by the OpenJS Foundation and used by projects under the OpenJS Foundation.</span><br/><br/>

<span id="references-4">4. The "Firebase" name and logo are trademarks owned by Google.</span><br/><br/>
