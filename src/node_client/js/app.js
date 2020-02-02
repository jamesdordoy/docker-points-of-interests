/**
  * Points Of Interest Map Object (Angular Version - No JQuery)
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       02/01/2017
  **/

//Main APP Object (Uses Angular Router & Main POI Controller)
var myApp = angular.module('myApp', ['ngRoute', 'PointOfInterestController']);

//Config Router
myApp.config(['$routeProvider', function ($routeProvider) {

    //On Base URL Otherwise Redirect to Base URL
    $routeProvider.
    when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainController'
    }).otherwise({
        redirectTo: '/'
    });
}]);

//On App Start Create And Store New Map
myApp.run(function ($rootScope) {

    //IF Navigator Geolocation HTML5 API is Avilable on Client Broswer
    if (navigator.geolocation) {

        //Get Dialog Elements For Add Poi Dialog
        var close = document.querySelector('.close');
        var div = document.querySelector('.dialog');
        var submitBtn = document.querySelector('.go');

        //Create New Map And Store In RootScope
        var map = new Map(close, div, submitBtn);
        $rootScope.map = map;

        //Try Aquire Users Coordinates
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                map.setMapView(pos.coords.latitude, pos.coords.longitude);
            },
            function(error){
                if (error.code == error.PERMISSION_DENIED)
                    alert("Our Map Requires Your Location To Initialize");
                else
                    alert("Unexpected Error " + error.code);
            }
        );
    }else
        alert('GeoLocation Not Supported - Map Cannot Be Loaded');
});