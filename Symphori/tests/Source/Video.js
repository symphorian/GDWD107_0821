// Public Constructor function
// Input parameter(s):  none
// Returns: Video object
// Description: Creates an object that creates and controls an html video object
var Video = function() {
	LOG.write("Video constructor called", LOG.VERBOSE);
	this.video = document.createElement("video");
	this.name = "";
	this.onload = null;
	this.onloadEventListenerAdded = false;
}

// Public function
// Input parameter(s): none
// Returns: string
// Description: returns the alias given to the video object
Video.prototype.getName = function() {
	return this.name;
}

// Public function
// Input parameter(s): string
// Returns: none
// Description: sets the alias associated to the video object
Video.prototype.setName = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	this.name = alias;
	this.video.name = alias;
}

// Public function
// Input parameter(s): filename string, type string
// Returns: none
// Description: adds source elements to the video object 
// (multiple sources/type help compatibility across browsers)
Video.prototype.addSource = function(filename, type) {
	PARAMS.initializeValidation();
	filename = PARAMS.validateParam(PARAMS.STRING, filename);
	type = PARAMS.validateParam(PARAMS.STRING, type);

	if (!this.onloadEventListenerAdded) {
		this.video.addEventListener("canplaythrough", this.onload);
		this.onloadEventListenerAdded = true;
	}

	var source = document.createElement("source");
	source.src = filename;
	source.type = type;

	this.video.appendChild(source);
}

/*
// Public function
// Input parameter(s): filename string
// Returns: none
// Description: sets the alias associated to the video object
Video.prototype.load = function(filename) {
	this.video.addEventListener("canplaythrough", this.onload);
	this.video.src = filename;
	this.video.load();
}
*/

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: plays the video from the beginning
Video.prototype.play = function() {
	this.video.currentTime = 0;
	this.video.play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the video
Video.prototype.pause = function() {
	this.video.pause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the video
Video.prototype.unpause = function() {
	this.video.play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the video
Video.prototype.playPause = function() {
	if (this.video.paused) {
		this.video.play();
	}
	else {
		this.video.pause();
	}
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the video will play at
Video.prototype.getVolume = function() {
	return this.video.volume*100;
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the video will play at
Video.prototype.setVolume = function(percent) {
	PARAMS.initializeValidation();
	percent = PARAMS.validateParam(PARAMS.NUMBER, percent);

	var decimal = 0;
	if (percent >= 100) {
		decimal = 1;
	}
	else if (percent <= 0) {
		decimal = 0;
	}
	else {
		decimal = percent / 100.0;
	}

	this.video.volume = decimal;
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the video should loop
Video.prototype.setLooping = function(shouldLoop) {
	PARAMS.initializeValidation();
	shouldLoop = PARAMS.validateParam(PARAMS.BOOLEAN, shouldLoop);

	this.video.loop = shouldLoop;
}

// Public function
// Input parameter(s): none
// Returns: decimal?
// Description: returns the current time of the video
Video.prototype.getCurrentTime = function() {
	return this.video.currentTime;
}

// Public function
// Input parameter(s): decimal?
// Returns: nothing
// Description: sets the current time of the video
Video.prototype.setCurrentTime = function(seekTime) {
	PARAMS.initializeValidation();
	seekTime = PARAMS.validateParam(PARAMS.NUMBER, seekTime);
	
	this.video.pause();
	this.video.currentTime = seekTime;
}

Video.prototype.destroy = function() {
	if (this.video) { 
		this.video.pause();
		if (this.onloadEventListenerAdded) {
			this.video.removeEventListener("canplaythrough", this.onload);
		}
		delete(this.video);
		this.video = undefined;
	}

	this.name = undefined;
	this.onload = undefined;
	this.onloadEventListenerAdded = undefined;
}