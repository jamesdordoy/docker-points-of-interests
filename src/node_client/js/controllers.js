/**
  * AngularJS Main Controller File
  *	Only DOM Manipulation is handled by Angular
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       29/12/2016
  **/

//Custom Controller Used To Manage Page Logic
var PointOfInterestController = angular.module('PointOfInterestController',[]);

//Main Controller (SPA)
PointOfInterestController.controller('MainController', function MyController($scope, $http, $rootScope) {
	//Scope Method (Search API By Type)
	$scope.searchByType = function () {
		//Send HTTP GET Request
		$http.get('http://localhost:8081/php_api/PointOfInterest.php?type=' + $scope.ang_type)
		.success(function(data) {
			//Add Data to Scope So It Can Be Manipulated in DOM
			$scope.pois = data;
		}).error(function(data, status) {
			if (status == 404) {
				alert('No Points Of Interest Found.');
			}
		});
	};

	$scope.searchByRegion = function () {
		//Send HTTP GET Request
		$http.get('http://localhost:8081/php_api/PointOfInterest.php?region=' + $scope.ang_region)
		.success(function(data, status) {
			//Get Map Object From RootScope
			var map = $rootScope.map;

			if (data) {
				//For Each Data Item Returned
				for (var i = 0; i < data.length; i++) {
					//Add a Marker using the map object
					map.addMarker(data[i]["lat"], data[i]["lon"], data[i]["name"], data[i]["description"]);
					map.setMapView(data[i]["lat"], data[i]["lon"]);
				}
			}
		}).error(function (data, status) {
			if (status == 404) {
				alert('No Matching Region Found.');
			}
		});
	};
});
