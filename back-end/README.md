## Backend API

This is a Node.js backend API using express.js that is dockerized for easier setup and deployment.

### Prerequisites
- Make sure [Docker is installed](https://www.docker.com/get-started/)

### Starting the server
Build and start the dev backend server with `docker compose build backend` and `docker compose up backend`

The server will be available at http://localhost:8000

### Development
The server should automatically restart on code changes in development mode.

The containers can be stopped with `docker compose down` or `ctr+C`

### Loading initial prompts
There are 50 initial prompts in JSON form under back-end/src

You can load these into a sqlite3 database for dev purposes

> Why are we loading them into a database in dev if we could just parse the JSON?
Well I'm glad you asked. In production, we plan to use supabase/firebase which is a database to store out prompts. While the code that interacts with sqlite3 will have to change, for the most part it will be the same.

**How to load them in**
make sure you have the latest npm packages installed.

In the back-end/src directory run: `npx ts-node seed.ts`

**How to see them**
For testing, I started the dev server with `docker compose up backend` and went to `http://localhost:8000/api/prompts/random` in my browser. I was able to see a random prompt there.

Was not able to test the front-end.

### What do you want me to say

![Alt Text](https://media.giphy.com/media/McDsz11ZslqTP8022F/giphy.gif?cid=ecf05e47sz7wl72qnl51h5gqxucm5bisdztfx6p3rjw3chcn&ep=v1_gifs_search&rid=giphy.gif&ct=g)
