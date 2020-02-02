<?php

/**
  * PHP REST API (Points of Interest Review EndPoint)
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date 			28/12/2016
  **/

//Require DB Constants + URL Constant
require_once('init.php');

//Require Point of Interest DAO (Data Access Object)
require_once('Classes/PointOfInterest.php');

//Require Point of Interest Review DAO (Data Access Object)
require_once('Classes/PointOfInterestReview.php');

//Require Generic Functions File
require_once('functions.php');

//Connect To Database
try {
	$conn = new PDO( HOST_NAME . ";" . HOST_DBNAME .";" ,HOST_USERNAME, HOST_PWD ); 
} catch( PDOException $e ){ echo $e->getMessage(); }

//Switch Based on HTTP Request Method
switch ($_SERVER["REQUEST_METHOD"]) {

	case "GET":
		header("HTTP/1.1 405 Method Not Allowed");
		echo("Get Requests are not supported");
	break;

	case "POST":

		//IF Basic Auth is being used
		if( isset($_SERVER["PHP_AUTH_USER"]) && isset($_SERVER["PHP_AUTH_PW"]) ) {

			//Sent From HTTP request using basic auth
			$username = $_SERVER["PHP_AUTH_USER"];
			$password = $_SERVER["PHP_AUTH_PW"];
			
		} else if(isset($_POST['username']) && isset($_POST['password'])) {
			//Sent From HTTP request using basic auth
			$username = $_POST['username'];
			$password = $_POST['password'];
		}

		if ($username && $password) {
			
			try {
				//Select The User Matching the Sent Authentication Details
				$statement = $conn->prepare("SELECT * FROM `poi_users` WHERE `username` = :username AND `password` = :password LIMIT 1");
				$statement->execute( array(":username" => $username , ":password" => $password));
				$user = $statement->fetch();
			} catch(PDOException $e) {
				echo $e->getMessage();
			}
			
			if ($user) {

				//Test & Sanatize Post Values
				$poiId 	= (int) isPresent($_POST['id'])	? escapeValue($_POST['id']) 	 : false;
				$review = isPresent($_POST['review']) 	? escapeValue($_POST['review']): false;

				$pointOfInterest = new PointOfInterest($conn, $poiId);

				//Checks Point of interest id is numeric and a related poi is found
				if( is_numeric($poiId) && $review && $pointOfInterest ){

					//Trys To Add The Review
					if ( PointOfInterestReview::addPointOfInterestReview($conn, $poiId, $review) ) {
						echo "OK";
					} else {
						header("HTTP/1.1 400 Bad Request");
						echo "Bad Params";
					}

				} else {
					header("HTTP/1.1 400 Bad Request");
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

	case "PUT":
		header("HTTP/1.1 405 Method Not Allowed");
		echo("Put Requests are not supported");
	break;

	case "DELETE":
		header("HTTP/1.1 405 Method Not Allowed");
		echo("Delete Requests are not supported");
	break;

	default:
		header("HTTP/1.1 405 Method Not Allowed");
}

?>