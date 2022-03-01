var Request = function() {}

Request.prototype.callPHPFileAsync = function(phpFileName,sendValue,onReadyStateChangeCallback) {
	var request;

	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	}
	else {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}

	request.onreadystatechange = function() {
		onReadyStateChangeCallback(request);
	}

	request.open("POST", phpFileName, true);
	request.send(sendValue);
}

Request.prototype.callPHPFileAsyncForFormPost = function(phpFileName,sendValue,onReadyStateChangeCallback) {
	var request;

	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	}
	else {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}

	request.onreadystatechange = function() {
		onReadyStateChangeCallback(request);
	}

	request.open("POST", phpFileName, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send(sendValue);
}

Request.prototype.callPHPFileSync = function(phpFileName,sendValue,onReadyStateChangeCallback) {
	var request;

	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	}
	else {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}

	request.onreadystatechange = function() {
		onReadyStateChangeCallback(request);
	}

	request.open("POST", phpFileName, false);
	request.send(sendValue);
}

Request.prototype.callPHPFileSyncForFormPost = function(phpFileName,sendValue,onReadyStateChangeCallback) {
	var request;

	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	}
	else {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}

	request.onreadystatechange = function() {
		onReadyStateChangeCallback(request);
	}

	request.open("POST", phpFileName, false);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send(sendValue);
}

var REQUEST = new Request();