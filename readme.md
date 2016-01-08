# node-primes

Multi-threaded REST API for generating prime numbers on nodejs/express

## Features

- REST API service built on node/express
- Uses Kue for managing jobs
- Uses cluster for parallel processing
- Uses intelligent caching for serving numbers already calculated
- Ability to choose between 3 different algorithms

## Installing the app

1. Install node.js downloading the binnaries from the node.js website
2. Run `npm install`
3. Install redis to support Kue
3. To run tests install mocha using: `npm install -g mocha`

## Using the app

Launch the redis server using `redis-server`

`gulp` or `gulp server`: start the node.js server with nodemon, so the app restarts when files change

`gulp unit-tests`: run unit tests

`gulp watch:unit-tests`: watch unit tests for code changes

`gulp integration-tests`: to run the integration tests. First start the server using `gulp server` command

`gulp watch:integration-tests`: watch integration tests for code changes

## Using the API

Request:

`http://localhost:3000/primes/3`

Response:

1. If the range is in cache:

   HTTP status: `200`
   
   HTTP body: 
   
   `{"initial":3,"total":2,"primes":[2,3]}`

2. If the range is not in cache:

   HTTP code: `202`

   The client has use polling to check when the range is already calculated

## Algoritms

You can choose the algoritm in the query params using `algorithm` parameter with one of the following values

* `algorithm=sequential`
* `algorithm=atkin`
* `algorithm=eratosthenes`

Sample: `http://localhost:3000/primes/3?algorithm=atkin`

## Comments

* The scafolding of the application was done using express-generator
* The root of the app has a simple html home page where the user can access simple results viewing json responses
* The original algorithms have been changed to address the requirements of this exercise but are not very efficient in the way they filter result sets
* Tests are superficial and a production application would need much more edge scenarios that could never crash de server

## Bugs and limitations

* The application is not managing the cleanup of failed or suspended jobs, so the redis database grows indefinitly
* The process should have improved memory management, for high values the system fails
* For high sets the system should have pagination, otherwise responses are too big
* Error management does not cover all the app scenarios
* The tests scripts should have a coverage tests
* Threath management does not restart crashed threads
* Every new task should be divided in smaller tasks and executed in several threads
* Integration tests fail when the gulp watch restarts the server, in the future they shoul detect if the server is ready to accept requests or start the server
* Integration tests assume values are in cache, they should be rewriten for cached and non-cached values