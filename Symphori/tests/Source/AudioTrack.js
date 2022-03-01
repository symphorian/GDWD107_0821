// Public Constructor function
// Input parameter(s):  none
// Returns: AudioTrack object
// Description: Creates an object that creates and controls an html audio object
var AudioTrack = function() {
	LOG.write("AudioTrack constructor called", LOG.VERBOSE);
	this.audio = document.createElement("audio");
	this.name = "";
	this.onload = null;
}

// Public function
// Input parameter(s): none
// Returns: string
// Description: returns the alias given to the audio object
AudioTrack.prototype.getName = function() {
	return this.name;
}

// Public function
// Input parameter(s): string
// Returns: none
// Description: sets the alias associated to the audio object
AudioTrack.prototype.setName = function(alias) {
	this.name = alias;
	this.audio.name = alias;
}

// Public function
// Input parameter(s): filename string
// Returns: none
// Description: sets the alias associated to the audio object
AudioTrack.prototype.load = function(filename) {
	this.audio.addEventListener("canplaythrough", this.onload);
	this.audio.src = filename;
	this.audio.load();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: plays the track from the beginning
AudioTrack.prototype.play = function() {
	this.audio.currentTime = 0;
	this.audio.play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the track
AudioTrack.prototype.pause = function() {
	this.audio.pause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the track
AudioTrack.prototype.unpause = function() {
	this.audio.unpause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the track
AudioTrack.prototype.playPause = function() {
	if (this.audio.paused) {
		this.audio.play();
	}
	else {
		this.audio.pause();
	}
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the track will play at
AudioTrack.prototype.getVolume = function() {
	return this.audio.volume*100;
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the track will play at
AudioTrack.prototype.setVolume = function(percent) {
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

	this.audio.volume = decimal;
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the track should loop
AudioTrack.prototype.setLooping = function(shouldLoop) {
	this.audio.loop = shouldLoop;
}