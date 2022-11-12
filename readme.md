# Overview 
 
This project consists of a GraphQL API implemented on Nodejs. The purpose of this API is to handle events. Say for example someone want to organise an event and want to host his event to get participants. The user can either upload his own event or book a posted event published by another person.
This is a very typical crud api to play with GraphQL and its utilities.


## Features 
### Database
To store this application data we have used mongoDB as our database along with `mongoose`
which is an npm package that allow as to interact with mongoDB.
### Queries
This API exposes these queries (a query in GraphQL means a request that doesn't save or store anything on the database, usually for getting data):

![queries](https://amirplatform.s3.eu-central-1.amazonaws.com/project/aucz5aagagfmym0e4z1l.png)

* `events`: returns all available events.
* `event`: return a specific event based on the eventId passed to the request.
* `users`: returns all registered users.
* `user`: return a specific user based on the userId passed to the request.
* `bokings`: return all registered bookings.
* `login`:  returns an access token if the authentification has succeeded.

### Mutations
This API exposes these mutations (a mutation in GraphQL means a request that affect the database usually for saving, deleting or updating data):

![mutations](https://amirplatform.s3.eu-central-1.amazonaws.com/project/vrnnlv8lto7wqpp9kxvh.png)

* `createEvent` : creates / saves an event.
* `bookEvent`: reserves / books an event.
* `createUser`:  creates a user account.
* `deleteUser`:  deletes a user account.
* `updateUser`:  updates the user informations (email, username etc..).
* `updateUserPassword`:  updates the user password.



* `bokings`: return all registered bookings.
* `login`:  returns an access token if the authentification has succeeded.