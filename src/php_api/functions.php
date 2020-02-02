<?php

/**
  * Main Functions File
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       20/12/2016
  **/

//Simple Function To Check Value Is Set & Not Empty
function isPresent($val) {
	if (isset($val) && !empty($val)) {
		return true;
	} else {
		return false;
	}
}

//Check if string remove spaces
function isText($val) {
	if (is_string(str_replace(' ', '', $val))) {
  		return true;
	} else {
		return false;
	}
}

//Checks Value is AplhaNumeric
function isTextNumber($val) {
	if (ctype_alnum($val)) {
		return true;
	}else{
		return false;
	}
}

//Checks Value Is Numeric
function isNumber($val) {
	if (is_numeric($val)) {
		return true;
	} else {
		return false;
	}
}

//Checks Value Is A Float
function isFloat($val) {
	if (is_float($val)) {
		return true;
	} else {
		return false;
	}
}

//Checks Value Is A Coordiant
function isCoord($val) {
	if ($val >= -90 && $val <= 90) {
		return true;
	}else{
		return false;
	}
}

//Escape Harmpful Input Values
function escapeValue($val) {
	return htmlentities($val, ENT_QUOTES, 'UTF-8');
}
