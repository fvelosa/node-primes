# Installing the app

1. Install node.js downloading the binaries from the node.js website
2. Run `npm install`
3. To run tests install mocha using: `npm install -g mocha`

# Using the app

`gulp` or `gulp server`: start the node.js server with nodemon, so the app restarts when files change

`gulp unit-tests`: run unit tests

`gulp watch:unit-tests`: watch unit tests for code changes

`gulp integration-tests`: to run the integration tests. First start the server using `gulp server` command

`gulp watch:integration-tests`: watch integration tests for code changes

# Using the API

The root of the app has a simple html home page where the user can access simple results viewing json responses

Request:

`http://localhost:3000/primes/3`

Response:

{"initial":3,"total":2,"primes":[2,3],"algorithm":"sequential"}

# Algoritms

You can choose the algoritm in the query params using `algorithm` parameter with one of the following values

* `algorithm=sequential`
* `algorithm=atkin`
* `algorithm=eratosthenes`

Sample: `http://localhost:3000/primes/3?algorithm=atkin`

# Comments

* The scafolding of the application was done using express-generator* 
* This version does not use treaths or webworkers, it is a blocking API, big numbers will stop the system
* To high values the system fails due to memory problems
* The start and restar of the app is done using nodemon, in a production environment parameters should use the ENV variables
* The algorithms have been changed to address the requirements of this exercise but are not very efficient in the way they filter result sets
* Tests are superficial and a production application would need much more edge scenarios that could never crash de server