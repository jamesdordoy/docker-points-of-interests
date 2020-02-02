/**
  * JQuery UI Dialog Object
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       04/01/2017
  **/

/**
* Constructor
* @param function Button OK CallBack
* @param function Button Cancel/close CallBack
*/
function AddPoiDialog (successCallback, cancelCallback) {

    //Store JQuery Dialog And Assign Callbacks
	this.dialog = $('.addPoi').dialog({
    modal:true,
    autoOpen:false,
    height: 580,
    width: 370,
    resizable: false,
    dialogClass: 'addpoi',
    show: {
        effect: "blind",
        duration: 1000
    },
    hide: {
        effect: "explode",
        duration: 1000
    },
    buttons: { 
        Ok: function(){
            //Parse Values From DOM To Next Method
        	successCallback($(".add_name").val(), $(".add_type").val(), $(".add_country").val(), $(".add_region").val(), $(".add_lat").val(), $(".add_lon").val(), $(".add_description").val(), $(".username").val(), $(".password").val());
        },
        Cancel: function(){
        	cancelCallback();
        }
    },
    close: function(){
    	cancelCallback();
    }
	});
}

/**
* Open Dialog Method
* @return void
*/
AddPoiDialog.prototype.open = function () {
	if(this.dialog.dialog('isOpen') === false)
		this.dialog.dialog('open');
};

/**
* Close Dialog Method
* @return void
*/
AddPoiDialog.prototype.close = function () {
	if(this.dialog.dialog('isOpen') === true)
		this.dialog.dialog('close');
};