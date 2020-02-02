/**
  * Points Of Interest Application Object
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       20/12/2016
  **/

/* Constructor
 * @return null
 */
function PointsOfInterestApp(){}

/* Search Points of Interest REST API by type
 * @param String type of point of interest to search for
 * @param function successCallback for returned results
 * @param function failedCallback for failed HTTP request
 * @return successCallback(request data, HTTP Response Status)
 */
PointsOfInterestApp.prototype.searchByType = function (type, successCallback, failedCallback) {

    //Set up new HTTP Request
    var httpRequest = new XMLHttpRequest();

	//Set Up Event Listener For Callbacks
    httpRequest.addEventListener("load", function(e){
        if(e.target.status === 200){
            var data = JSON.parse(e.target.responseText);
            successCallback(data, e.target.status);
        }else{
            failedCallback(e.target.status);
        }
    });

	//Open HTTP Request appending the Type Value
    httpRequest.open('GET', 'http://localhost:8081/php_api/PointOfInterest.php?type=' + type);
	
	//Send It
    httpRequest.send();
};

/* Search Points of Interest REST API by type
 * @param String type of point of interest to search for
 * @param function successCallback for returned results
 * @param function failedCallback for failed HTTP request
 * @return successCallback(request data, HTTP Response Status)
 */
PointsOfInterestApp.prototype.searchByRegion = function (region, successCallback, failedCallback) {

    //Set up new HTTP Request
    var httpRequest = new XMLHttpRequest();
	
	//Set Up Event Listener For Callbacks
    httpRequest.addEventListener("load", function (e) {
        if(e.target.status === 200){
            var data = JSON.parse(e.target.responseText);
            successCallback(data, e.target.status);
        }else{
            failedCallback(e.target.status);
        }
    });
	
	//Open HTTP Request appending the Region Value
    httpRequest.open('GET', 'http://localhost:8081/php_api/PointOfInterest.php?region=' + region);
    httpRequest.send();
};

/* Search Points of Interest REST API by type
 * @param String name of POI
 * @param String type of POI
 * @param String region of POI
 * @param String country of POI
 * @param Float lat of POI
 * @param Float lon of POI
 * @param String description of POI
 * @param function successCallback for returned results
 * @param function failedCallback for failed HTTP request
 * @return successCallback(request data, HTTP Response Status)
 */
PointsOfInterestApp.prototype.addPointOfInterest = function (name, type, region, country, lat, lon, description, user, pass, successCallback, failedCallback) {

    //Create Form Data Object & Append POI Values
    var data = new FormData();
    data.append("name", name);
    data.append("type", type);
    data.append("country", country);
    data.append("region", region);
    data.append("lat", lat);
    data.append("lon", lon);
    data.append("description", description);

    var httpRequest = new XMLHttpRequest();
	
    //Add Marker If Data is Added
    httpRequest.addEventListener("load", function (e) {
        if(e.target.status === 200){
            successCallback(lat, lon, name, description);
        }else{
            failedCallback(e.target.status);
        }
    });

    //Open & Send HTTP Request
    httpRequest.open("POST", "http://localhost:8081/php_api/PointOfInterest.php");
	
	//Set Auth Header For Service To Read
	httpRequest.setRequestHeader("Authorization","Basic " + btoa(user+":"+pass));
    httpRequest.send(data);
};


//Extra Methods Used For View On Map For External Sites
//Inspired by - https://css-tricks.com/snippets/javascript/get-url-variables/
PointsOfInterestApp.prototype.getURLParameter = function (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

PointsOfInterestApp.prototype.searchById = function (id, successCallback, failedCallback) {

    //Set up new HTTP Request
    var httpRequest = new XMLHttpRequest();

    httpRequest.addEventListener("load", function (e) {
        if(e.target.status === 200){
            var data = JSON.parse(e.target.responseText);
            successCallback(data, e.target.status);
        }else{
            failedCallback(e.target.status);
        }
    });

    httpRequest.open('GET', 'http://localhost:8081/php_api/PointOfInterest.php?id=' + id);
    httpRequest.send();
};

//EO POINTS OF INTEREST APPLICATION OBJECT