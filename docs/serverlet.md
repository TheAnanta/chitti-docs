# Serverlet

## Overview

The serverlet application serves as the interface **(API)** exposing the application data from the database via well-defined syntax, requests and semantics termed as API routes.

The serverlet application depends on the representational state transfer **(REST)** architecture to serve client requests to the underlying data based on the HTTP request/response protocol. As a user makes a request to a specific endpoint of the serverlet, an SQL query is run to fetch/modify data in the database to respond with a specific response with a specific HTTP status code.

### Technology stack:

1. Express [<sup>1</sup>](#references-1)
2. PostgreSQL [<sup>2</sup>](#references-2)
3. Prisma ORM
4. Node.Js [<sup>1</sup>](#references-1)
5. Firebase Admin SDK

Understanding the complex and well-coupled nature of the data, a structured relational database was choosed for CHITTI. and hence, the free tier offerring of PostgreSQL by Supabase has been used in this project.

To manage the complexity of the project and the suprisingly different syntax of SQL, Prisma, an object relation manager is employed to allow writing of custom models, and handle transactions with ease in javascript using objects and methods.

Few endpoints are secured with the token based authentication provided by Firebase Auth, to ensure authorization before processing the request and more about it can be read [**here**](security).

### Hosting

1. **Firebase [<sup>3</sup>](#references-3) Functions**\
   The servelet application is written as a specialized non-preemptive application hosted over the Firebase [<sup>3</sup>](#references-3) Function offerring in the free tier.
2. **Supabase [<sup>4</sup>](#references-4)**\
   The SQL offerring of the supabase is used to host the database for the entire application which is connected using the pooling and connection url using Prisma as the ORM.

## Setup

The entry point to the code is available at **`functions/src/index.ts`**.\
The prisma schema is available at `functions/prisma/prisma.schema`.

### Repository

URL: https://github.com/theananta/chitti-server

### Steps to run

To run the client application:

1. Clone the repository.
2. Run `npm run serve` to emulate the Firebase Functions locally.
3. Run `npm run deploy` to deploy the project to the Firebase SDK, which interally run `npm run lint` before deploying.

## Next Steps

To know more about database schemas/models, checkout the schema references available [**here**](database-schema).

To know more about the different APIs exposed through the serverlet, and their paramters, checkout the API references available [**here**](/reference/client).

## References

<span id="references-1">1. Node.Js and Express are projects of the OpenJS Foundation. This is a statement of the OpenJS Foundation’s trademarks and its policy and guidelines relating to use of
trademarks owned by the OpenJS Foundation and used by projects under the OpenJS Foundation.</span><br/><br/>

<span id="references-2">2. Postgres, PostgreSQL and the Slonik Logo are trademarks or registered trademarks of the PostgreSQL Community Association of Canada.</span><br/><br/>

<span id="references-3">3. The "Firebase" name and logo are trademarks owned by Google.</span><br/><br/>

<span id="references-4">4. All Supabase trademarks, logos, or other brand elements can never be modified or used for any other purpose other than to represent Supabase Inc.</span><br/><br/>
