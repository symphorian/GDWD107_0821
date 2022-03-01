// Public Constructor function
// Input parameter(s):  image alias string, image alias string, ...
// Returns: VideoBlock object instantiated with the images matching the supplied input parameters
// Example: var myVB = new VideoBlock("img1", "img2", "img3", "img4");
var VideoBlock = function(videoAlias, width, height) {
	PARAMS.initializeValidation();
	videoAlias = PARAMS.validateParam(PARAMS.STRING, videoAlias, null);
	width = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, width);
	height = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, height);

	LOG.write("VideoBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	var video = null;

	this._getVideo = function() { return video; };
	this._setVideo = function(val) { video = val; };

	if (videoAlias != null) {
		this.video = CANVASMANAGER.getVideoAsset(videoAlias);
	}
	this.width = width;
	this.height = height;

	this.currentTime = this.video ? 0 : this.video.getCurrentTime();
}

VideoBlock.prototype = new ActorBlock();
VideoBlock.prototype.learn(PlayerTraits);
VideoBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.sleep
VideoBlock.prototype.sleep = function() {
	ActorBlock.prototype.sleep.call(this);

	this.video.pause();
}

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.wake
VideoBlock.prototype.wake = function() {
	ActorBlock.prototype.wake.call(this);

	this.video.unpause();
}

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
VideoBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.currentTime = this.video == undefined ? 0 : this.video.getCurrentTime();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
VideoBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.currentTime = memory.currentTime;
	this.video.setCurrentTime(this.currentTime);
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
VideoBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.currentTime == this.currentTime);
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: plays the loaded video from the beginning
VideoBlock.prototype.play = function() {
	if (this.awake) {
		this.video.play();
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the loaded video
VideoBlock.prototype.pause = function() {
	if (this.awake) {
		this.video.pause();
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the loaded video
VideoBlock.prototype.unpause = function() {
	if (this.awake) {
		this.video.unpause();
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the loaded video
VideoBlock.prototype.playPause = function() {
	if (this.awake) {
		this.video.playPause();
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: halts progression of the loaded video and returns to the beginning of the video
VideoBlock.prototype.stop = function() {
	if (this.awake) {
		this.video.play();
		this.video.pause();
	}
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the loaded video will play at
VideoBlock.prototype.getVolume = function() {
	return this.video.getVolume();
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the loaded video will play at
VideoBlock.prototype.setVolume = function(percent) {
	PARAMS.initializeValidation();
	percent = PARAMS.validateParam(PARAMS.NUMBER, percent);

	if (this.awake) {
		this.video.setVolume(percent);
	}
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the loaded video should loop
VideoBlock.prototype.setLooping = function(shouldLoop) {
	PARAMS.initializeValidation();
	shouldLoop = PARAMS.validateParam(PARAMS.BOOLEAN, shouldLoop);

	if (this.awake) {
		this.video.setLooping(shouldLoop);
	}
}

// Public function
// Input parameters: the new size for the shattered blocks (integer)
// Returns: nothing
// Description: shatters the current block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
VideoBlock.prototype.shatter = function(newBlockSize) {
	PARAMS.initializeValidation();
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);
	
	if (!this.shattered) {
		var blockClusterPositions = new Array();

		var blockIndex = 0;
		for (var i = 0; i < this.width; i += newBlockSize) {
			for (var j = 0; j < this.height; j += newBlockSize) {
				if (blockClusterPositions[blockIndex] == undefined) {
					blockClusterPositions[blockIndex] = {"x":Math.floor(i - this.width/2 + newBlockSize/2), "y":Math.floor(j - this.height/2 + newBlockSize/2)};
				}
				
				blockIndex++;
			}
		}

		for (var i = 0; i < blockClusterPositions.length; i++) {
			var newBlock = new FragmentBlock(this, newBlockSize, newBlockSize, blockClusterPositions[i].x, blockClusterPositions[i].y, 0);

			newBlock.setMemoryCapacity(this.memoryCapacity);
			
			this.adoptChild(newBlock);
		}

		this.shattered = true;
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes child blocks resulting from shatter
VideoBlock.prototype.unshatter = function() {
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i] instanceof FragmentBlock) {
			this.children[i].destroy();
			this.children.splice(i,1);
			i--;
		}
	}
	this.shattered = false;
}

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the image of text of the current frame, 
// or returns null if no text image can be found
VideoBlock.prototype.getCurrentFrame = function() {
	if (this.video && this.video.video) {
		return this.video.video;
	}
	else {
		return null;
	}
}

VideoBlock.prototype.getHorizontalVideoScaling = function() {
	return this._getWidth() / this.video.video.videoWidth;
}

VideoBlock.prototype.getVerticalVideoScaling = function() {
	return this._getHeight() / this.video.video.videoHeight;
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's image after applying necessary transformations
VideoBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			if (!this._getShattered() && this._getVideo()) {
				dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in VideoBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles frame updates and filter/mask application
VideoBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	if (this.isMarkedForDestruction) return;

	this._setVideo(this.video);
	this._setShattered(this.shattered);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current frame image after applying necessary transformations
VideoBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);
	
	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			// switch(this.maskMode) {
			// 	case "window":
			// 		dest.globalCompositeOperation = "destination-in";
			// 	break;

			// 	case "wall":
			// 		dest.globalCompositeOperation = "destination-out";
			// 	break;
			// }
			
			if (!this._getShattered() && this._getVideo()) {
				dest.drawImage(this._getVideo().video,-this._getWidth()/2,-this._getHeight()/2,this._getWidth(),this._getHeight());
			}

			if (this.showDebugDisplay) {
				dest.save();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this._getHeight()/2);
				dest.stroke();
				dest.fillStyle = "Red";
				dest.fillRect(-4,-4,8,8);
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				dest.rect(-this._getWidth()/2,-this._getHeight()/2,this._getWidth(),this._getHeight());
				dest.stroke();
				dest.restore();
			}

			this.children.sort(function(a,b) { return b.z - a.z });
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(dest);
			}
			
			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in MovieBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

VideoBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.video.destroy();
		this._getVideo().destroy();
		this._setVideo(undefined);

		this.currentTime = undefined;
		this.shattered = undefined;
		this._setShattered(undefined);
	}

	ActorBlock.prototype.destroy.call(this);
}