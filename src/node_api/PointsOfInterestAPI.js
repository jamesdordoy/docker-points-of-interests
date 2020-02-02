//Require MongoDB Client Wrapper
var MongoWrapper = require( './mongoUtil' );

//Export Following Functions
module.exports = {
    //Search Data by Type Function
    //@Return Callback(data)
    searchByType : function(type, callback){
        MongoWrapper.connectToServer('pointsofinterest', function(err){
            if(!err){
                MongoWrapper.getData({type: type}, function(err, results){
                    if(results){
                        return callback(results);
                    }
                });
            } else
                console.log("ERROR: " + err);
            }
        );
    },
    //Search Data by Type Function
    //@Return Callback(data)
    searchByRegion : function(region, callback){
        MongoWrapper.connectToServer('pointsofinterest', function(err){
            if(!err){
                MongoWrapper.getData({region: region}, function(err, results) {
                    if (results) {
                        return callback(results);
                    }
                });
            } else
                console.log("ERROR: " + err);
        });
     },
     //Search Data by Type Function
     //@Return Callback(data)
     searchByTypeAndRegion : function(type, region, callback){
            MongoWrapper.connectToServer('pointsofinterest', function(err){
                if(!err){
                    MongoWrapper.getData({type: type, region: region}, function(err, results){
                        if(results){
                            return callback(results);
                        }
                    });
                } else
                    console.log("ERROR: " + err);
            });
     },
     //Search Data by Type Function
     //@Return Callback(data)
     searchById : function(id){
        MongoWrapper.connectToServer('pointsofinterest', function(err){
            if(!err){
                MongoWrapper.getData({_id: id}, function(err, results){
                    if(results){
                        return true;
                    }else{
                        return false;
                    }
                });
            } else
                return false;
          }); 
     },
     //Add A New Point Of Interest
     //@Return Callback(err/true)
     addPointOfInterest : function(name, type, country, region, lat, lon, description, callback){
        MongoWrapper.connectToServer('pointsofinterest', function(err){

        if (!err) { 
            //Prepare Data
            MongoWrapper.addData({name: name, type: type, country: country, region: region, lat: lat, lon: lon, description: description}, function () {
                if (!err) {
                    return callback(true);
                } else{
                    return callback(err);
                }
            });
        } else
            console.log("ERROR: " + err);
        });
     },
     //Add A New Point Of Interest Review
     //@Return Callback(err/true)
     addPointOfInterestReview : function(review, poiId, callback){

        MongoWrapper.connectToServer('poireviews', function(err){

            if(!err){
                //Prepare Data
                MongoWrapper.addData({review: review, poiid: poiId}, function(err){
                    if (!err) {
                        return callback(true);
                    } else {
                        return callback(err);
                    }
                });
            } else
                console.log("ERROR: " + err);
        });
     },
     //Check a User exists
     //@Return Callback(err/true)
     checkUserExists : function (username, password, callback) {
        MongoWrapper.connectToServer('poiusers', function (err) {
            if (!err) {
                //Prepare Data
                MongoWrapper.getData(
                    {
                        username: username,
                        password: password
                    },
                    function(err, results){

                        if(results.length > 0){
                            return callback(true);
                        }else{
                            return callback(false);
                        }
                    }
                );
            } else
                console.log("ERROR: " + err);
        });
    }
};


				