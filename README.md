# Events-Platform

https://abdurahmanmohamud.github.io/Events-Platform/

Event Platform is a web application that allows users to:

Sign up for events.

View event details, including title, description, date, and location.

Add events to their Google Calendar directly from the platform.

The project consists of:

Frontend built with React, Axios, and TailwindCSS for styling.

Backend powered by Node.js and Express, using PostgreSQL for the database.

Google Calendar API integration to add events to a user’s Google Calendar upon signup.

The app is deployed with the frontend hosted on GitHub Pages and the backend on Render.

### Admin test account:
> email: admin0325@example.com <br>
> username: admin243

### user test account:
> email: alice@example.com <br>
> username: alice123

## Setup

#### Clone the repository:

> Click the green `Code` button and copy the URL <br>

#### In your local machine's terminal, run:

> git clone https://github.com/AbdurahmanMohamud/Events-Platform.git <br>

#### Once it has downloaded, run:

> cd /Events-Platform <br>
> code . <br>
> cd backend <br>

#### To begin, create two `.env` files in the backend folder:

> `.env.test` <br>

> `.env.development`

#### In `.env.test`, write:

> PGDATABASE=events_test

#### In .env.development, write:

> PGDATABASE=events <br>

##### Double-check that these `.env` files are included in your `.gitignore`

#### Install npm & Node.js by following this link:

[Install npm and Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Leave the backend folder by running the following in your terminal:

>cd ..

#### Install the dependencies by running the following in your terminal:

> npm i

#### Initialise the databases by running:

> npm run setup-db <br>

#### Seed the databases by running:

> npm run seed <br>

#### Run the tests by running:

> npm test <br>

#### Initialise the server on port 9090 by running:

> npm run start <br>

#### Enter the frontend folder by running the following in your terminal:

> cd frontend <br>

#### Install the dependencies by running the following in your terminal again:

> npm i <br>

#### Go to EventDetails.jsx which is in the pages folder in the frontend folder and add your own google client id the client id variable on line 6

#### Now run this in a new terminal:

> npm run dev

#### Click on the link that should look like:

>http://localhost:5173/

#### ctrl c ends the app in the terminal

