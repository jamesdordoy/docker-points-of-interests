
//Create Express App
var express = require('express');
var app     = express();

//Require body-parse Middleware
var bodyParser = require('body-parser');

//Middleware (Body Parser For POST Params)
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Middleware (Set CORS Header for edward) http://stackoverflow.com/questions/7067966/how-to-allow-cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "nginx");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Routers
app.use(require('./routes/PointOfInterest'));
app.use(require('./routes/PointOfInterestReview'));

//Create Server & Listen on Port 3000
var server = app.listen(8011, function() {
    console.log("App listening at http://localhost:" + server.address().port);
    console.log("Press ctrl C to terminate in CMD");
});
