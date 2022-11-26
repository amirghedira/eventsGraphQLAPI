# Overview 
 
This project consists of a GraphQL API implemented on Nodejs. The purpose of this API is to handle events. Say for example someone want to organise an event and want to host his event to get participants. The user can either upload his own event or book a posted event published by another person.
This is a very typical crud api to play with GraphQL and its utilities.


# Launch the project
To launch the project, you have to first add a `.env` file in the root directory that will hold the environment variables of the backend. You can find a `.env.example` folder as reference for the environment variables used.

## Using Docker
Note: Docker must be installed on your machine.

To launch the project, simply run:
```bash
docker-compose -f docker-compose-local.yml up --build --force-recreate
```
## Manually
After adding a `.env` file, you have to install the NodeJS packages on the backend

To install the backend Node packages, simply run:
``` bash
npm install
```
To run the backend server, run:
``` bash
npm start
```
To run the backend server in development mode, run:
``` bash
npm run dev
```
Note that the server will listen on port `5000`


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