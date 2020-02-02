/**
  * Points Of Interest Map Object (Angular Version - No JQuery)
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       02/01/2017
  **/

/* Sets Up MapTile Layer And Sets Up Event Handlers
 * @return null
 */
function Map (dialogClose, dialogDiv, dialogSubmitBtn) {

    //Map Object
    this.map = L.map("LefletMap");

    //Set Map Up
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "Boi" }).addTo(this.map);

    //Set Up Dialog Box and Set Callback Function To DialogComplete
    this.dialog = new Dialog(null, dialogClose, dialogDiv, dialogSubmitBtn, this.DialogComplete.bind(this));

    //Add Click Event Handler
    this.map.on('click', this.mapClick.bind(this));
};

/* Sets Up MapTile Layer And Sets Up Event Handlers
 * @return null
 */
Map.prototype.mapClick = function (e){
    //Store Event Supplied Lat Lon on DOM in Hidden Inputs
    document.querySelector('.lat').value = e.latlng.lat;
    document.querySelector('.lon').value = e.latlng.lng;

    this.dialog.openDialog();
};

/* Sets Up MapTile Layer And Sets Up Event Handlers
 * @return null
 */
Map.prototype.DialogComplete = function (){

    //Get values from DOM
    var name = document.querySelector('.add_name').value;
    var type = document.querySelector('.add_type').value;
    var country = document.querySelector('.add_country').value;
    var region = document.querySelector('.add_region').value;
    var lat = document.querySelector('.lat').value;
    var lon = document.querySelector('.lon').value;
    var description = document.querySelector('.add_description').value;

    var username = document.querySelector('.username').value;
    var pass = document.querySelector('.password').value;
    
    var letters = /^[A-Za-z0-9\s]+$/;
  	
    //Validation
    if (name.length > 0 && name.match(letters)) {
        if (type.length > 0 && type.match(letters)) {
            if (country.length > 0 && country.match(letters)) {
                if (region.length > 0 && region.match(letters)) {
                    if (description.length > 0 && description.match(letters)) {
                        if (lat < 90 && lat > -90 && lon < 90 && lon > -90) {
                              this.addPointOfInterest(name, type, country, region, lat, lon, description, username, pass);
                        } else {
                             alert('unexpected lat lon error');
                        }
                    } else {
                        alert('No Description or not suitable');
                    }
                } else {
                    alert('No Region or not suitable');
                }
            } else {
                alert('No Country or not suitable');
            }
        } else {
            alert('No Type or not suitable');
        }
      } else {
          alert('No Name');
      }
};

/* Sets Up MapTile Layer And Sets Up Event Handlers
 * @return null
 */
Map.prototype.addPointOfInterest = function (name, type, country, region, lat, lon, description, username, pass) {

    var ajax = new XMLHttpRequest();

    //Add Marker If Data is Added
    ajax.addEventListener("load", this.addNewPointOfInterestCallBack.bind(this, lat, lon, name, description));

    var data = {name: name, type: type, country: country, region: region, lat: lat, lon: lon, description: description};

    var json = JSON.stringify(data);

    //Open & Send HTTP Request
    ajax.open("POST", "http://localhost:8011/");

    //Set Auth Header For Service To Read
    ajax.setRequestHeader("Authorization","Basic " + btoa(username+":"+pass));
    ajax.setRequestHeader('Content-Type', 'application/json');

   ajax.send(json);
};

/* Sets Up MapTile Layer And Sets Up Event Handlers
 * @return null
 */
Map.prototype.addNewPointOfInterestCallBack = function (lat, lon, name, description, e) {

    if (e.target.status == 200) {

        alert("Poi added");
        this.dialog.closeDialog();
        this.addMarker(lat, lon, name, description);

    } else if (e.target.status == 400) {
        alert('Sorry Data Not Suitable For Entry.');
    } else if (e.target.status == 401) {
        alert('Sorry Your Point Of Interest Username or Password Was Incorrect.');
    }
};

/* Sets Map View To Provided Lat Lon
 * @return null
 */
Map.prototype.setMapView = function (lat, lon) {
    //Set View Of Global Map
    this.map.setView( new L.LatLng(lat, lon), 14 );
};

/* Adds Marker To Map Using Lat Lon Provided
 * @return null
 */
Map.prototype.addMarker = function (lat, lon, name, description) {
    //Add Marker to Global Map
    L.marker(new L.LatLng(lat, lon)).addTo(this.map).bindPopup("Name: " + name + " Description: "+ description);;
};
