// node looks for this since it was defined as "main" in package.json

// BASE SETUP ==================================================================
// call required packages
var express    = require('express')
  , app        = express()
  , bodyParser = require('body-parser');

// configure app to use bodyParser() to get data from a POST
app.use(bodyParser());
var port = process.env.PORT || 8080; // define port to use

// API ROUTES ==================================================================
// routes will be defined using an instance of the express router
var router = express.Router();

// test router
router.get('/', function(req, res) {
  res.json({ message: 'Hooray! Welcome to my API!'});
});

// add additional routes here

// REGISTER ROUTES -------------------------------------------------------------
// all routes prefixed with /api
app.use('/api', router);

// START SERVER ================================================================
app.listen(port);
console.log('Port ' + port + ' is the place to be!');
