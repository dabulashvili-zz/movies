## Set up project environment

#### To run app locally set up mongoDB

`docker run --name some-mongo -p 27017:27017 mongo`

#### Also run npm commands

`npm i`

`sudo npm i -g npx`

#### And run app

`npm start`

#### Or with nodemon for development mode

`npm run dev`

## Project configs

There is configuration [file](config/default.js).

You can specify _port_, _mongoUri_ and _omdbKey_.

Also available as environment variables: *PORT*, *NODE_URI* and *OMDB_KEY*

## Run tests

`npm test`

Tests need mongodb to be run.
