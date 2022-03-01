// Public Constructor function
// Input parameter(s):  track alias string, track alias string, ...
// Returns: StereoBlock object instantiated with the AudioTracks matching the supplied input parameters
// Example: var sb = new StereoBlock("StageClear", "BossStageClear");
var StereoBlock = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	LOG.write("SoundBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	this.tracks = new Array();

	for (var i = 0; i < arguments.length; i++) {
		var track = CANVASMANAGER.getAudioAsset(arguments[i]);
		if (track != null) {
			this.tracks.push(track);
		}
	}

	this.currentTrackIndex = 0;
	this.volume = 100;
	this.looping = false;
}

StereoBlock.prototype = new ActorBlock();
StereoBlock.prototype.learn(PlayerTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
StereoBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.currentTrackIndex = this.currentTrackIndex;

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
StereoBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.currentTrackIndex = memory.currentTrackIndex;
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
StereoBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.currentTrackIndex == this.currentTrackIndex);
	}
}

// Public function
// Input parameter(s): track alias string
// Returns: AudioTrack
// Description: returns the specified AudioTrack, if it is loaded
StereoBlock.prototype.getTrack = function(trackName) {
	PARAMS.initializeValidation();
	trackName = PARAMS.validateParam(PARAMS.STRING, trackName);

	for (var i = 0; i < this.tracks.length; i++) {
		if (this.tracks[i].getName() == trackName) {
			return this.tracks[i];
		}
	}
	return null;
}

// Public function
// Input parameter(s): track alias string
// Returns: AudioTrack
// Description: returns the index of specified AudioTrack in the track list, if it is loaded
StereoBlock.prototype.getTrackIndex = function(trackName) {
	PARAMS.initializeValidation();
	trackName = PARAMS.validateParam(PARAMS.STRING, trackName);

	for (var i = 0; i < this.tracks.length; i++) {
		if (this.tracks[i].getName() == trackName) {
			return i;
		}
	}
	return -1;
}

// Public function
// Input parameter(s): track alias string
// Returns: nothing
// Description: stops the currently playing track 
// and starts playing the specified AudioTrack from the beginning, if it is loaded
StereoBlock.prototype.play = function(trackName) {
	PARAMS.initializeValidation();
	trackName = PARAMS.validateParam(PARAMS.STRING, trackName);

	if (trackName != null) {
		var newTrackIndex = this.getTrackIndex(trackName);
		if (newTrackIndex >= 0 && newTrackIndex != this.currentTrackIndex) {
			this.stop();
			this.currentTrackIndex = newTrackIndex;
		}
	}

	this.tracks[this.currentTrackIndex].play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the current track
StereoBlock.prototype.pause = function() {
	this.tracks[this.currentTrackIndex].pause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the current track
StereoBlock.prototype.unpause = function() {
	this.tracks[this.currentTrackIndex].unpause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the current track
StereoBlock.prototype.playPause = function() {
	this.tracks[this.currentTrackIndex].playPause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: halts progression of the current track and returns to the beginning of the track
StereoBlock.prototype.stop = function() {
	this.tracks[this.currentTrackIndex].play();
	this.tracks[this.currentTrackIndex].pause();
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the current track will play at
StereoBlock.prototype.getVolume = function() {
	return this.volume;
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the current track will play at
StereoBlock.prototype.setVolume = function(percent) {
	PARAMS.initializeValidation();
	percent = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, percent);

	this.volume = percent;
	for (var i = 0; i < this.tracks.length; i++) {
		this.tracks[i].setVolume(this.volume);
	}
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the current track should loop
StereoBlock.prototype.setLooping = function(shouldLoop) {
	PARAMS.initializeValidation();
	shouldLoop = PARAMS.validateParam(PARAMS.BOOLEAN, shouldLoop);

	this.looping = shouldLoop;
	for (var i = 0; i < this.tracks.length; i++) {
		this.tracks[i].setLooping(this.looping);
	}
}