/**
  * Points Of Interest Map Object
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       20/12/2016
  **/

/**
  * Constructor
  * Sets Up MapTile Layer & Stores Map
  */
function Map (mapId) {

	/**
     * @var Object Leaflet Map
     */
	this.map = new L.Map(mapId);

	//Set up Leaflet MapTile Layer 
	L.tileLayer(
		'//api.mapbox.com/styles/v1/jamesdordoy/civ5lq6ly002y2is5zosv5hw3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFtZXNkb3Jkb3kiLCJhIjoiY2lyejFjMTVsMDAyYTJvcGRicGF4OWljcSJ9.dFvFiBAk8SEjFL_wWYCs1w', 
		{
			maxZoom: 18,
			attribution: 'Points Of Interest',
			id: 'mapbox.streets'
		}
	).addTo(this.map);

  	/**
     * @var string ID of Map
     */
	this.mapId = mapId;
}

/* Set Up Click Handler Using A Callback
 * @param function Callback for on Click Event
 * @return callback(mapclick.latituide, mapclick.longitude)
 */
Map.prototype.setClickEvent = function (clickFunction) {
	this.map.on('click', function(e){
		clickFunction(e.latlng.lat, e.latlng.lng);
	});
};

/* Show the map using CSS
 * @return null
 */
Map.prototype.show = function () {
	document.getElementById(this.mapId).style.display = 'block';
};

/* Hide the map using CSS
 * @return null
 */
Map.prototype.hide = function () {
	document.getElementById(this.mapId).style.display = 'none';
};

/* Sets Map To Provided Latitude & Longitude
 * @return null
 */
Map.prototype.setMapView = function (lat, lon) {
	this.map.setView( new L.LatLng(lat, lon), 14 );
};

/* Adds a marker to the map an sets up review button click handler (also centres map at poi)
 * @return null
 */
Map.prototype.addMarker = function (lat, lon, name, description, id) {
	L.marker( new L.LatLng(lat, lon)).addTo(this.map).bindPopup("Name: " + name + " Description: " + description);
	this.setMapView(lat, lon);
};