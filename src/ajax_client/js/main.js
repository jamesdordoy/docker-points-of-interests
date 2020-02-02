
"use_strict";

/* ----------- INIT SCRIPT STARTS HERE ----------- */
window.onload = function(){
	//IF Navigator Geolocation HTML5 API is Avilable on Client Broswer
	if(navigator.geolocation){
		//Try Aquire Users Coordinates
		navigator.geolocation.getCurrentPosition(function (pos) {
			//Create New Points Of Interest App
			var myApp = new PointsOfInterestApp();

			//Create Map
			var map = new Map('LefletMap');

			//Set View To Current Location
			map.setMapView(pos.coords.latitude, pos.coords.longitude);
			
			/* --------------- SEARCH BY TYPE --------------- */
			//Set Event Listener On Type Search Button
			document.querySelector('.typeBtn').addEventListener('click', function (e) {

				//Prevent Form Submission
				e.preventDefault();

				//Get Type Value
				var type = document.querySelector('.typeTxt').value;

				if (type.length > 0) {

					//Search By Type And Use Callback To Format Response (Data Only Passed If Response 200)
					myApp.searchByType(type, function (data, httpResponseCode) {

						if(data && httpResponseCode == 200){

							//Assign Blank HTML Variable
							var html = "";

							//For Each Item In The Data Array
							for (var i = 0; i < data.length; i++) {
								html += "<li><p>Name: " + data[i]["name"] + "</p><p>Type: " + data[i]["type"] + "</p><p>Country: " + data[i]["country"] + "</p><p>Region: " + data[i]["region"] + "</p><p>Lat: " + data[i]["lat"] + "</p><p>Lon: " + data[i]["lon"] + "</p><i class='fa fa-map-marker fa-5x' aria-hidden='true'></i></li>" 
							}

							//Add HTML to page
							document.querySelector('.typeResponse').innerHTML = html;
						}
					},
					//Failed Callback
					function (httpResponseCode) {
						if (httpResponseCode == 404) {
							alert("Sorry, No Points of Interest Found.");
						} else if (httpResponseCode == 400) {
							alert("Bad Query String.");
						}
					});

				} else
					alert('Please Enter A Valid Search Type');
			}); /* --------------- END OF SEARCH BY TYPE --------------- */
					
			/* --------------- SEARCH BY REGION --------------- */
			//Set Event Listener On Region Search Button
			document.querySelector('.regionBtn').addEventListener('click', function(e) {

				e.preventDefault();

				//Get Type Value
				var region = document.querySelector('.regionTxt').value;

				if (region.length > 0) {

					//Search By Type And Use Callback To Format Response (Data Only Passed If Response 200)
					myApp.searchByRegion(region, function (data, httpResponseCode) {

						if (data && httpResponseCode == 200) {

							for (var i = 0; i < data.length; i++) {
								map.addMarker(data[i]["lat"], data[i]["lon"], data[i]["name"], data[i]["description"]);
							}

							document.querySelector(".side-nav").classList.remove("nav-open");
							document.querySelector(".content").style.opacity = 1;
						}
					},
					//Failed Callback
					function (httpResponseCode){
						if (httpResponseCode == 404) {
							alert("Sorry, No Points of Interest Found.");
						} else if (httpResponseCode == 400) {
							alert("Bad Query String.");
						}
					});
				}else
					alert('Please Enter A Region');
			}); /* --------------- END OF SEARCH BY REGION --------------- */
					
			/* --------------- ADD POINT OF INTEREST --------------- */
			//Handle Map Click Event using Callback Function
			map.setClickEvent(function(lat, lon) {

				//Add Lat/Lon values to JQuery Form
				document.querySelector('.add_lat').value = lat;
				document.querySelector('.add_lon').value = lon;

				//Onclick open AddPoi JQuery Dialog
				var dialog = new AddPoiDialog(function(name, type, region, country, lat, lon, description, username, pass) {

					//Only Allow Letters, Numbers & Spaces
					var letters = /^[A-Za-z0-9\s]+$/;

					//Check Values Are Not Blank & Ensure They Match Regex Condition
					if (name.length > 0 && name.match(letters)) {
						if (type.length > 0 && type.match(letters)) {
							if (country.length > 0 && country.match(letters)) {
								if (region.length > 0 && region.match(letters)) {
									if (description.length > 0 && description.match(letters)) {

										myApp.addPointOfInterest(
											name,
											type,
											region,
											country,
											lat,
											lon,
											description,
											username,
											pass,
											function (lat, lon, name, description){
												alert('Data Added');
												map.addMarker(lat, lon, name, description);
											},
											function (httpResponseCode) {
												if (httpResponseCode == 400) {
													alert("Failed To add data - Not Provided");
												} else if(httpResponseCode == 401) {
													alert("Sorry, Your Username or Password Was Incorrect. Try Again.");
												} else if (httpResponseCode == 403) {
													alert("Please Enter Your Username and Password.");
												}
											}
										);

										map.show();
										dialog.close();

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
							alert('Please Enter a Type');
						}
					} else {
						alert('Please Enter a Name');
					}
				},
				//Cancel Callback
				function () {
					map.show();
					dialog.close();
				});

				map.hide();
				dialog.open();
			}); /* --------------- END OF ADD POINT OF INTEREST --------------- */

			/*  bonus feature - Allows Client To Display A Poi Using A URL Param */
			var id = myApp.getURLParameter("id");

			if (id != null) {

				console.log('id set');

				myApp.searchById(id, function (data, httpResponseCode) {
					for(var i = 0; i < data.length; i++){
						map.addMarker(data[i]["lat"], data[i]["lon"], data[i]["name"], data[i]["description"]);
					}

					console.log('id passed');
				},function (httpResponseCode) {
					alert(httpResponseCode);
				});
			}

			/* --------------- end of click handlers --------------- */
		},
		//Failed GEO LOCATION
		function (error) {
			if (error.code == error.PERMISSION_DENIED)
				alert("Our Map Requires Your Location To Initialize");
			else
				alert("Unexpected Error " + error.code);
		});

	}else
		alert('GeoLocation Not Supported - Map Cannot Be Loaded (Please Update Your Broswer)');
	/* ------ End Of Main Script ------*/

	//Simple Click Event Handler To Deal With Sidebar Menu
	document.querySelector(".nav-toggle").addEventListener("click", function () {

		//IF NAV OPEN (Toggle Class On Slide In Nav As Appropriate)
		if ( document.querySelector(".side-nav").classList.contains("nav-open") ) {
			document.querySelector(".side-nav").classList.remove("nav-open");
			document.querySelector(".content").style.opacity = 1;
		} else {
			document.querySelector(".side-nav").classList.add("nav-open");
			document.querySelector(".content").style.opacity = .3;
		}
	});
};