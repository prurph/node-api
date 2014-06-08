// node looks for this since it was defined as "main" in package.json

// BASE SETUP ==================================================================
// call required packages
var express    = require('express')
  , app        = express()
  , bodyParser = require('body-parser')
  , mongoose   = require('mongoose')
  , Bear       = require('./app/models/bear');

mongoose.connect('mongodb://localhost:27017/nodeapi', {native_parser:true});

// configure app to use bodyParser() to get data from a POST
app.use(bodyParser());
var port = process.env.PORT || 8080; // define port to use

// API ROUTES ==================================================================
// routes will be defined using an instance of the express router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

// test router
router.get('/', function(req, res) {
  res.json({ message: 'Hooray! Welcome to my API!'});
});

// routes that end in /bears
router.route('/bears')
  .post(function(req, res) {
    var bear = new Bear();
    bear.name = req.body.name;

    bear.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Bear created!' });
    });
  })
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);
      res.json(bears);
    });
  });

// routes that end in /bears/:bear_id
router.route('/bears/:bear_id')
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });
  })
  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);

      bear.name = req.body.name;
      bear.save(function(err, bear) {
        if (err)
          res.send(err);
        res.json({ message: 'Successfully updated!' });
      });
    });
  })
  .delete(function(req, res) {
    Bear.remove({
      _id : req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err);
      res.json({ message: 'Successfuly deleted!' });
    });
  });


// REGISTER ROUTES -------------------------------------------------------------
// all routes prefixed with /api
app.use('/api', router);

// START SERVER ================================================================
app.listen(port);
console.log('Port ' + port + ' is the place to be!');
