/**
  * Points Of Interest Map Object (Angular Version - No JQuery)
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       02/01/2017
  **/

function Dialog (openBtn, closeBtn, div, go, callback) {

	if(openBtn != null){
		this.openBtn = openBtn;
		this.openBtn.addEventListener('click', this.openDialog.bind(this));
	}
	if(closeBtn != null){
		this.closeBtn = closeBtn;
		this.closeBtn.addEventListener('click', this.closeDialog.bind(this));
	}

	this.dialog = div;
	this.submit = go;

	this.submit.addEventListener('click', callback.bind(this));
}

Dialog.prototype.openDialog = function() {
	this.dialog.style.display = 'block';
};

Dialog.prototype.closeDialog = function() {
	this.dialog.style.display = 'none';
	document.getElementsByName("myForm")[0].reset();
};