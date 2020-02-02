//Require Express Object
var express = require('express');

//Require Router Object
var router  = express.Router();

//Require POIAPP Data Wrapper
var PoiApp = require( '../PointsOfInterestAPI' );

//Add Point of Interest
router.post('/PointOfInterest', function(req, res, next){

	var auth = req.headers['authorization'];

	if(req.body && auth){

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

		PoiApp.checkUserExists(username, password, function(validUser){

			if(validUser){

				//Get Values From Request Header (format either JSON/ form-encoded)
				//let syntax used from ECMA 6 to avoid global conflictions
				let name = req.body.name;
				let type = req.body.type;
				let country = req.body.country;
				let region = req.body.region;
				let lat = req.body.lat;
				let lon = req.body.lon;
				let description = req.body.description;

				//Check value types
				if(typeof name === 'string' && typeof type === 'string' && typeof country === 'string' && typeof region === 'str') {

					//Ensure lat, lon suitable for entry
					if( lat > -90 && lat < 90 && lon > -90 && lon < 90){

						//Try add record to mongodb, callback for when request finished
						PoiApp.addPointOfInterest(name, type, country, region, lat, lon, description, function(inputted) {

							//If Data has been inputted
							if (inputted == true) {

								res.json('{"data" : "' + name + '", "errors" : ""}');

								console.log(username + ' POSTED');

							} else {
								res.status(400).send('Error with input');
							}
						});	
					} else //Lat Lon not between suitable values
						res.status(400).send('Lat Lon Not Suitable');
				} else //Required text params are not text
					res.status(400).send('Params not suitable (must be text)');
			} else // Not A User
				res.status(401).send("Not Found");
		});
	} else
		res.status(400).send('Params not provided');
});

//Get Points of Interest
router.get('/PointOfInterest', function(req, res, next){

	//Search By Type & Region
	if(req.query.region != undefined && req.query.type != undefined){

		let type = req.query.type;
		let region = req.query.region;

		PoiApp.searchByTypeAndRegion(type, region, function(results){
			//If Results are not undefined and are not blank
			if (typeof results !== 'undefined' && results.length > 0){
				//Write JSON
				res.json(results);

				console.log('Type Search For: ' + type + ' Region Search For: '+ region);
			} else
				res.status(404).send('Not found');
		});

	//Search By Region
	} else if (req.query.region != undefined) {

		let region = req.query.region;

		PoiApp.searchByRegion(region, function(results){
			if (typeof results !== 'undefined' && results.length > 0){
				res.json(results);
				console.log('Region Search For: ' + region);
			} else
				res.status(404).send('Not found');
		});
		//Search By Type
	} else if(req.query.type != undefined) {

		let type = req.query.type;
		PoiApp.searchByType(type, function(results){
			//If Results
			if (typeof results !== 'undefined' && results.length > 0){
				res.json(results);
				console.log('Type Search For: ' + type);
			} else
				res.status(404).send('Not found');
		});
  	//Else No Params Or Unexpected Params
	} else {
		res.status(400).send('Unexpected Parameters or None');
	}
});

//Export Router To Main APP
module.exports = router;

