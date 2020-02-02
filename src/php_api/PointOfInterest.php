<?php

/**
  * PHP REST API (Points of Interest EndPoint)
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date 			28/12/2016
  **/

//Require DB Constants + URL Constant
require_once('init.php');

//Require Point of Interest DAO (Data Access Object)
require_once('Classes/PointOfInterest.php');

//Simple Class To Convert GET Parameters into a useable SQL Query & Array using Prepared Statements
require_once('Classes/SimpleGetService.php');

//Require Generic Functions File
require_once('functions.php');

//Connect To Database
try {
	$conn = new PDO( HOST_NAME . ";port=3306;" . HOST_DBNAME .";" ,HOST_USERNAME, HOST_PWD ); 
} catch( PDOException $e ){ echo $e->getMessage(); }

//Switch Based on HTTP Request Method
switch ($_SERVER["REQUEST_METHOD"]) {

	//HTTP GET Request
	case "GET":

		//SIMPLE GET SERVICE (PDO Connection, Table Name)
		$service = new SimpleGetService($conn, "pointsofinterest");

		$preparedParams = [];

		//If Params Then Get Data By Params Else Just Get Data
		if ($_GET) {

			//Define Allowed GET Parameters
			$allowedGetParams = array('id', 'name', 'type', 'country', 'region', 'lat', 'lon', 'description');	

			//Created an Array of Prepared Parameters that can be used with an SQL statement
			$preparedParams = $service->prepareParams($_GET, $allowedGetParams);

			//If GET Super Global Is Suitable For Use
			if ($preparedParams) {
				//Generate a Suitable SQL Statement Based On Parameters
				$sql = $service->prepareSQL($preparedParams);
			}
			
		} else {
			//Generate a Suitable SQL Statement For No Params
			$sql = $service->prepareSQL();
		}

		//Get Results
		$results = $service->getData($sql, $preparedParams);

		//If Data has been found
		if ($results) {
			//HTTP Response Header = JSON
			header("Content-type: text/json");

			//Echo Results in JSON
			echo json_encode($results);
		} else {
			//No Data Found
			header("HTTP/1.1 404 Not Found");
		}

	break;
	//HTTP POST Request
	case "POST":
	
		//IF Basic Auth is being used
		if ( isset($_SERVER["PHP_AUTH_USER"]) && isset($_SERVER["PHP_AUTH_PW"]) ) {

			//Sent From HTTP request using basic auth
			$username = $_SERVER["PHP_AUTH_USER"];
			$password = $_SERVER["PHP_AUTH_PW"];
			
		} else if(isset($_POST['username']) && isset($_POST['password'])) {
			//Sent From a Form
			$username = $_POST['username'];
			$password = $_POST['password'];
		}
		
		if ($username && $password) {
			
			try{
				//Select The User Matching the Sent Authentication Details
				$statement = $conn->prepare("SELECT * FROM `poi_users` WHERE `username` = :username AND `password` = :password LIMIT 1");
				$statement->execute( array(":username" => $username , ":password" => $password));
				$user = $statement->fetch();
			}catch(PDOException $e){
				echo $e->getMessage();
			}
		
			//If A Points of Interest User Is Found
			if ($user) {

				//Get Param Values & Sanatize
				$name 				= isPresent($_POST['name'])		? escapeValue($_POST['name']) : false;
				$type 				= isPresent($_POST['type'])		? escapeValue($_POST['type']) : false;
				$country 			= isPresent($_POST['country'])	? escapeValue($_POST['country']) : false;
				$region 			= isPresent($_POST['region'])	? escapeValue($_POST['region']) : false;
				$lon 				= (float) isPresent($_POST['lon'])	? escapeValue($_POST['lon']) : false;
				$lat 				= (float) isPresent($_POST['lat'])	? escapeValue($_POST['lat']) : false;
				$description 		= isPresent($_POST['description']) ? escapeValue($_POST['description']) : false;
				
				//IF Values are all not false
				if ( $name && $type && $country && $region && isCoord($lon) && isCoord($lat) && $description ) {
					
					//If adding point of interest is successful (using DAO object)
					if ( PointOfInterest::addPointOfInterest($conn, $name, $type, $country, $region, $lon, $lat, $description) ) {
						//PHP Default Response Is 200 so no action required
					} else {
						//DB Could Not Add Data to Database
						header("HTTP/1.1 400 Bad Request");
						echo 'Failed to add data';
					}
					
				} else {
					//Invalid Parameters Sent To Post Service (Not Suitable For DB)
					header("HTTP/1.1 400 Bad Request");
					echo 'Parameters Provided Or Suitable';
				}
			} else {
				//No User Found	
				header("HTTP/1.1 403 Forbidden");
			}
			
		} else {
			//No User Creditials Sent
			header("HTTP/1.1 401 Unauthorized");
		}
	break;
	//Unsupported HTTP Methods
	case "PUT":
		header("HTTP/1.1 405 Method Not Allowed");
		echo("Put Requests are not supported");
	break;

	case "DELETE":
		header("HTTP/1.1 405 Method Not Allowed");
		echo("Delete Requests are not supported");
	break;

	default:
		header("HTTP/1.1 400 Bad Request");
}

?>