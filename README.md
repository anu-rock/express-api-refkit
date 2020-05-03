# Express API Refkit

[![Dependency Status](https://david-dm.org/anuragbhd/express-api-refkit.svg)](https://david-dm.org/anuragbhd/express-api-refkit)

If you are looking to build a brand new API based on Node/Express and MongoDB, look no futher.

> ⚠️ This is NOT a starter template. There are plenty of starters out in the open that will let you use them as base to build RESTful web APIs.

The purpose of this repository — its _raison d'etre_ — is to provide reference code to anyone (especially myself) looking to create a beautiful 💄, secure 👮‍♂️ and well-tested 🧪 Node/Express-based API from scratch. You read it right: **from scratch**.

Creating from scratch has the invaluable benefit of learning while doing. Most likely, there will be struggle which will make you better. You will know by heart all parts under the hood and exactly how they interact with each other. Basing your project off of a starter kit takes that away from you. Hence the need for a reference kit (or refkit, as I like to call it).

Call it a non-textual, non-visual tutorial on building your own API. You see the code, you learn from it, and perhaps adapt it in your own project.

Copy and prosper 🖖.

> This repository is partially inspired by Microsoft's popular [TypeScript Node Starter](https://github.com/microsoft/TypeScript-Node-Starter).
>
> In fact, I started out creating my own API based on this TypeScript starter but found it hard to adapt it to my requirements.
>
> The starter comes with a lot of website-related bloat, stuff that usually one does not need in a pure API project. Also, in my opinion, TypeScript adds to the complexity.

## Table of Contents

- [What's in the Box?](#whats-in-the-box)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Running the API](#running-the-api)
  - [Creating Your Own API](#creating-your-own-api)
- [Project Structure](#project-structure)
- [NPM Scripts](#npm-scripts)
- [Debugging](#debugging)
- [Testing](#testing)
  - [Manual testing](#manual-testing)
  - [Unit testing](#unit-testing)
- [Dependencies](#dependencies)
  - [`dependencies`](#dependencies-1)
  - [`devDependencies`](#devdependencies)
- [License](#license)

## What's in the Box?

- API source code (see [Project Structure](#project-structure))
- Docker setup for:
  - API container
  - [MongoDB](https://www.mongodb.com/) container
  - [Mongo Express](https://github.com/mongo-express/mongo-express) container
- `package.json` configured with all dependencies (see [Dependencies](#dependencies))
- Debug task for VS Code (see [Debugging](#Debugging); this will save you countless hours)

## Prerequisites

Docker Desktop

(get it from https://www.docker.com/products/docker-desktop if you don't have it installed already)

## Getting Started

There are two parts in this section:

1. Running the API
2. Creating your own API

Do the first part once and then dedicate yourself to the second part.

### Running the API

- Clone the repository:

```
git clone https://github.com/anuragbhd/express-api-refkit.git <project_name>
```

- Run the API

```
cd <project_name>
docker-compose up
```

Docker will take care of installing all NPM dependencies inside the API container. It will also start the MongoDB container on which our API actively relies.

- Verify that the API is running by visiting `http://localhost:3000/api` in browser.

You should see something like this:

![express-api-running-in-browser](https://user-images.githubusercontent.com/1288616/80913467-78ba2d00-8d62-11ea-8651-0ab289da7006.png)

- Also verify that the MongoDB UI is available at http://localhost:8081.

You should see something like this:

![mongo-express-screenshot](https://user-images.githubusercontent.com/1288616/80913469-7ce64a80-8d62-11ea-85f9-04507ddefb69.png)

### Creating Your Own API

1. Fire up your terminal.

2. Create a new directory for your project.

```
mkdir my-awesome-api
```

3. Now start building your API from scratch, like literally:

```
cd my-awesome-api
npm init
```

4. Copy-paste code from this repository whenever necessary. Preferably, type it out on your own.

## Project Structure

| Name                | Description                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **.vscode**         | Contains VS Code specific settings                                                            |
| **node_modules**    | Contains all your npm dependencies                                                            |
| **src**             | Contains your source code                                                                     |
| **src/config**      | Passport authentication strategies and login middleware                                       |
| **src/controllers** | Controllers define functions that respond to various http requests                            |
| **src/middleware**  | Express middleware (plural), such as JWT verification                                         |
| **src/models**      | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/util**        | Common utilities such as global constants, logger, secrets, and other scripts                 |
| **src**/api.js      | Script to configure our Express API                                                           |
| **src**/routes.js   | API routes defined in a separate file                                                         |
| **src**/server.js   | Entry point to our express app                                                                |
| **test**            | Contains your tests. Separate from source because there is a different build process.         |
| .dockerignore       | Files and folders to ignore while building our docker image (currently only node_modules)     |
| .env.example        | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| docker-compose.yml  | Instructions for `docker-compose` command to properly start/stop our containers               |
| Dockerfile          | Instructions to build our Express API container                                               |
| jest.config.js      | Used to configure Jest running tests written in TypeScript                                    |
| package.json        | File that contains npm dependencies as well as build scripts                                  |

## NPM Scripts

Execute a script in Docker like this (get your container id using `docker ps` command):

```
docker exec -it <container-id> /bin/bash
npm run <script>
```

| Npm Script    | Description                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| `start`       | Does the same as 'npm run serve'. Can be invoked with `npm start`                     |
| `serve`       | Runs node on `src/server.js` which is the apps entry point                            |
| `watch`       | Same as `serve` but with added benefit of auto-restarting Node server on code changes |
| `watch-debug` | The same as `watch` but includes the --inspect flag so you can attach a debugger      |
| `test`        | Runs tests using Jest test runner                                                     |
| `seed-test`   | Seed the test database with sample data                                               |

## Debugging

The following applies to Visual Studio Code.

> Debugging a Node app running inside a Docker container can be tricky. See [Debug Node.js within a container](https://code.visualstudio.com/docs/containers/debug-node) and [How to Debug a Node.js app in a Docker Container](https://blog.risingstack.com/how-to-debug-a-node-js-app-in-a-docker-container/) for solutions.
>
> Fortunately, you don't have to implement any of these solutions as the correct one has already been added for you.

1. While the API's Docker container is running, go to **Run** sidebar and click the green play button against "Attach to Docker" dropdown option. Alternatively, press F5.
2. Add a few breakpoints in, say, ArticleController (`src/controllers/article.js`).
3. Hit the corresponding API endpoint from browser or Postman.

## Testing

## Manual testing

Use an API testing client of your choice, for example [Postman](https://www.postman.com/).

1. Create a new user:

```
POST /api/users HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
	"email": "xyz@email.com",
	"password": "Abc123$$",
	"confirmPassword": "Abc123$$"
}
```

2. Generate an auth token:

```
POST /api/auth HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
	"email": "xyz@email.com",
	"password": "Abc123$$"
}
```

3. Create a new article (using the generated token):

```
POST /api/articles HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZWFlNmY4ZDkwOTRkMjAwNTI5MjczMzIiLCJpYXQiOjE1ODg0OTAxNjEsImV4cCI6MTU4ODU3NjU2MSwiYXVkIjoiYmxvZ25ldC5jb20iLCJpc3MiOiJhbnVyYWdiaGFuZGFyaS5jb20ifQ.U1wPTE9m4U8bWw5HAIydJhAxgSqhj8nBq1-UZPBrP6w
Content-Type: application/json

{
	"title": "Hello, friend.",
	"body": "Life is wonderful once you start living it.",
	"tags": []
}
```

4. Fetch all articles for the authenticated user (using the generated token):

```
GET /api/articles HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZWFlNmY4ZDkwOTRkMjAwNTI5MjczMzIiLCJpYXQiOjE1ODg0OTAxNjEsImV4cCI6MTU4ODU3NjU2MSwiYXVkIjoiYmxvZ25ldC5jb20iLCJpc3MiOiJhbnVyYWdiaGFuZGFyaS5jb20ifQ.U1wPTE9m4U8bWw5HAIydJhAxgSqhj8nBq1-UZPBrP6w
```

## Unit testing

Drop to our API container's shell:

```
docker exec -it <container-id> /bin/bash
```

Once in, run this command:

```
npm run test
```

## Dependencies

Dependencies are managed through `package.json`.
In that file you'll find two sections:

### `dependencies`

| Package           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| bcrypt            | Library for hashing and salting user passwords.       |
| body-parser       | Express 4 middleware.                                 |
| compression       | Express 4 middleware.                                 |
| dotenv            | Loads environment variables from .env file.           |
| errorhandler      | Express 4 middleware.                                 |
| express           | Node.js web framework.                                |
| express-validator | Easy form validation for Express.                     |
| jsonwebtoken      | Issue and verify JWT tokens for authorization.        |
| lodash            | General utility library.                              |
| mongoose          | MongoDB ODM.                                          |
| passport          | Simple and elegant authentication library for node.js |
| passport-local    | Sign-in with Username and Password plugin.            |
| winston           | Logging library                                       |

### `devDependencies`

| Package       | Description                                                           |
| ------------- | --------------------------------------------------------------------- |
| chai          | Testing utility library that makes it easier to write tests           |
| concurrently  | Utility that manages multiple concurrent tasks. Used with npm scripts |
| eslint        | Linter for JavaScript and TypeScript files                            |
| jest          | Testing library for JavaScript.                                       |
| mongoose-seed | Populate and clear MongoDB documents with Mongoose validation         |
| nodemon       | Utility that automatically restarts node process when it crashes      |
| supertest     | HTTP assertion library.                                               |

## Author

Anurag "AnuRock" Bhandari  
ab@anuragbhandari.com

## License

Copyleft 2020. Licensed under the [MIT](LICENSE) License.
