//Require the MongoDB Client
const MongoClient = require('mongodb-client');

//DB Variable
var _db;

//Export The Following Methods
module.exports = {

  //Connection Function
  connectToServer: function (dbname, callback) {
    MongoClient.connect( "mongodb://localhost:27017/test", function( err, db ) {

      _db = db.collection(dbname);
      return callback( err );
    });
  },

  //Return The DB
  getDb: function() {
    return _db;
  },

  //Wrapper Function To Get Data And Return The Data And Possible Errors To The Client
  getData: function (params, callback) {
    _db.find(params).toArray( function(err, results){
      return callback(err, results)
    });
  },

  //Wrapper Function For Adding Data
  addData: function (params, callback){
    _db.insert(params, function(err, results) {
      return callback(err)
    });
  }};

