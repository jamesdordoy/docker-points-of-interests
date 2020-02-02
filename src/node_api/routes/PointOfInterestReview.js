//Require Express Object
var express = require('express');

//Require Router Object
var router  = express.Router();

//Require POIAPP Data Wrapper
var PoiApp = require( '../PointsOfInterestAPI' );

//Add Point of Interest Review
router.post('/PointOfInterestReview', function(req, res) {

    var auth = req.headers['authorization'];

	if (req.body && auth) {

        // http://stackoverflow.com/questions/23616371/basic-http-authentication-with-node-and-express-4
        // Using ES6 With Node To Authenicate Users
        // Stack Overflow - Qwerty (Nov 24, 2015)
        // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
        var tmp = auth.split(' ');
        var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
        var plain_auth = buf.toString();        // read it back out as a string
        // At this point plain_auth = "username:password"
        var creds = plain_auth.split(':');      // split on a ':'
        var username = creds[0];
        var password = creds[1];

        PoiApp.checkUserExists(username, password, function(validUser) {

            if(validUser){

                //Get Values From Request Header (format either JSON/ form-encoded)
                //let syntax used from ECMA 6 to avoid global conflictions
                let review = req.body.review;
                let id = req.body.id;

                //Validation Variables (REGEX)
                let letters = /^[A-Za-z0-9\s]+$/;

                //Check review isnt empty & only contains letters, numbers and spaces
                if (review.length > 0 && review.match(letters)) {

                    //Check ID isNumeric
                    if(!isNaN(parseFloat(id)) && isFinite(id)) {
                        if(PoiApp.searchById(id)){
                            //Try add record to mongodb, callback for when request finished
                            PoiApp.addPointOfInterestReview(review, id, function(inputted){
                                //If Data has been inputted
                                if(inputted == true){
                                    //CORS Header
                                    res.set('Access-control-allow-origin', '*');
                                    res.send('Review Added: ' + review);
                                    console.log('Data POSTED');
                                } else
                                    res.status(400).send('Error with input');
                            });
                        } else //Not a POI
                            res.status(400).send('ID Not A Point Of Interest');
                    } else //ID Not Numeric
                        res.status(400).send('ID Not Suitable');
                } else //Required text params are not text
                    res.status(400).send('Review Not Suitable');
            } else
                res.status(401).send("Not Found");
        });
    }else //No Params Sent in request
        res.status(400).send('Params not provided');
});

module.exports = router;
