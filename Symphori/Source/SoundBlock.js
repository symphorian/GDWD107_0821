// Public Constructor function
// Input parameter(s):  track alias string
// Returns: SoundBlock object instantiated with the AudioTrack matching the supplied input parameter
// Example: var sb = new SoundBlock("StageClear");
var SoundBlock = function(trackAlias) {
	PARAMS.initializeValidation();
	trackAlias = PARAMS.validateParam(PARAMS.STRING, trackAlias);

	LOG.write("SoundBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	this.track = CANVASMANAGER.getAudioAsset(trackAlias);
}

SoundBlock.prototype = new ActorBlock();
SoundBlock.prototype.learn(PlayerTraits);

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: plays the loaded track from the beginning
SoundBlock.prototype.play = function() {
	this.track.play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the loaded track
SoundBlock.prototype.pause = function() {
	this.track.pause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the loaded track
SoundBlock.prototype.unpause = function() {
	this.track.unpause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the loaded track
SoundBlock.prototype.playPause = function() {
	this.track.playPause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: halts progression of the loaded track and returns to the beginning of the track
SoundBlock.prototype.stop = function() {
	this.track.play();
	this.track.pause();
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the loaded track will play at
SoundBlock.prototype.getVolume = function() {
	return this.track.getVolume();
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the loaded track will play at
SoundBlock.prototype.setVolume = function(percent) {
	PARAMS.initializeValidation();
	percent = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, percent);

	this.track.setVolume(percent);
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the loaded track should loop
SoundBlock.prototype.setLooping = function(shouldLoop) {
	PARAMS.initializeValidation();
	shouldLoop = PARAMS.validateParam(PARAMS.BOOLEAN, shouldLoop);

	this.track.setLooping(shouldLoop);
}