<?php
/**
  * CONSTANTS - INIT File
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date 			10/12/2016
  **/

	//Docker Container Connection
	define('HOST_NAME','mysql:host=192.168.240.3');
	define('HOST_USERNAME','homestead');
	define('HOST_PWD','secret');
	define('HOST_DBNAME','dbname=points_of_interest');

	//URL Constants - Looks like: /users/jdordoy/public_html/poi
	define('INCLUDE_PATH',dirname(__FILE__) . "/");
?>