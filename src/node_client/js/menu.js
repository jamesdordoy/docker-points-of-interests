/**
  * Points Of Interest Menu Functions
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       02/01/2017
  **/

window.onload = function(){

	//Simple Click Event Handler To Deal With Sidebar Menu
	document.querySelector(".nav-toggle").addEventListener("click", function(){

		//IF NAV OPEN (Toggle Class On Slide In Nav As Appropriate)
		if ( document.querySelector(".side-nav").classList.contains("nav-open") ) {

			document.querySelector(".side-nav").classList.remove("nav-open");
	  		document.querySelector(".content").style.opacity = 1;

		} else {
			document.querySelector(".side-nav").classList.add("nav-open");
	  		document.querySelector(".content").style.opacity = .3;
		}
	});
}
