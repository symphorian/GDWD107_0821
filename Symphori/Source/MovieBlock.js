// Public Constructor function
// Input parameter(s):  image alias string, image alias string, ...
// Returns: MovieBlock object instantiated with the images matching the supplied input parameters
// Example: var myMB = new MovieBlock("img1", "img2", "img3", "img4");
var MovieBlock = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	LOG.write("MovieBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	this.frameAliases = new Array();

	for (var i = 0; i < arguments.length; i++) {
		this.frameAliases[i] = arguments[i];
	}

	this.frames = new Array();

	this.filters = new Array();
	this.windowMasks = new Array();
	this.wallMasks = new Array();

	this.filtersUpdate = false;
	this.masksUpdate = false;

	this.isPlaying = true;
	this.currentFrameIndex = -1;

	this.maskMode = "none";
}

MovieBlock.prototype = new ActorBlock();
MovieBlock.prototype.learn(PlayerTraits);
MovieBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
MovieBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.currentFrameIndex = this.currentFrameIndex;

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
MovieBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.currentFrameIndex = memory.currentFrameIndex;
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
MovieBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.currentFrameIndex == this.currentFrameIndex);
	}
}

// Public function
// Input parameters: the new size for the shattered blocks (integer)
// Returns: nothing
// Description: shatters the current block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
MovieBlock.prototype.shatter = function(newBlockSize) {
	PARAMS.initializeValidation(); 
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);

	var maxWidth = 0;
	var maxHeight = 0;

	var length = this.frameAliases.length;

	for (var k = 0; k < length; k++) {
		var frame = this.getFrame(k);

		if (frame.width > maxWidth) { maxWidth = frame.width; }
		if (frame.height > maxHeight) { maxHeight = frame.height; }
	}

	ShatterTraits.prototype.shatter.call(this, newBlockSize, maxWidth, maxHeight);
}

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the image of the current frame, 
// either through the actual image saved in the frames property
// or the image asset matched by the alias associated with the frame, 
// or returns null if no image can be found
MovieBlock.prototype.getCurrentFrame = function() {
	if (this.currentFrameIndex >= 0 && (this.currentFrameIndex < this.frames.length || this.currentFrameIndex < this.frameAliases.length)) {
		if (this.frames[this.currentFrameIndex] != null) {
			return this.frames[this.currentFrameIndex];
		}
		else {
			return CANVASMANAGER.getSingleImageAsset(this.frameAliases[this.currentFrameIndex]);
		}
	}
	else {
		return null;
	}
}

// Public function
// Input parameters: integer index of the desired frame
// Returns: image or null
// Description: returns the image of the specified frame,
// either through the actual image saved in the frames property
// or the image asset matched by the alias associated with the frame, 
// or returns null if no image can be found
MovieBlock.prototype.getFrame = function(frameIndex) {
	PARAMS.initializeValidation();
	frameIndex = PARAMS.validateParam(PARAMS.INTEGER, frameIndex);

	if (frameIndex >= 0 && (frameIndex < this.frames.length || frameIndex < this.frameAliases.length)) {
		if (this.frames[frameIndex] != null) {
			return this.frames[frameIndex];
		}
		else {
			return CANVASMANAGER.getSingleImageAsset(this.frameAliases[frameIndex]);
		}
	}
	else {
		return null;
	}
}

MovieBlock.prototype.play = function() {
	this.isPlaying = true;
	this.currentFrameIndex = -1;
}

MovieBlock.prototype.pause = function() {
	this.isPlaying = false;
}

MovieBlock.prototype.unpause = function() {
	this.isPlaying = true;
}

MovieBlock.prototype.playPause = function() {
	this.isPlaying = !this.isPlaying;
}

MovieBlock.prototype.stop = function() {
	this.play();
	this.pause();
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's image after applying necessary transformations
MovieBlock.prototype.undraw = function(dest) {
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

			if (!this._getShattered()) {
				dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in MovieBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
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
MovieBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	if (this.isMarkedForDestruction) return;

	if (this.isPlaying) {
		this.currentFrameIndex++;

		if ((this.frameAliases.length > 0 && this.currentFrameIndex >= this.frameAliases.length) ||
			 (this.frames.length > 0 && this.currentFrameIndex >= this.frames.length)) {
			 this.currentFrameIndex = 0;
		}
	}

	if (this.currentFrameIndex < 0) {
		this.currentFrameIndex = 0;
	}

	var currentFrame = this.getCurrentFrame();

	if (currentFrame != null) {
		this.width = currentFrame.width;
		this.height = currentFrame.height;
	}

	this._setWidth(this.width);
	this._setHeight(this.height);

	this._setShattered(this.shattered);

	this.applyFiltersAndMasks();
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current frame image after applying necessary transformations
MovieBlock.prototype.draw = function(dest) {
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

			switch(this.maskMode) {
				case "window":
					dest.globalCompositeOperation = "destination-in";
				break;

				case "wall":
					dest.globalCompositeOperation = "destination-out";
				break;
			}
			
			if (!this._getShattered()) {
				var currentFrame = this.getCurrentFrame();
				if (currentFrame != null) {	
					dest.drawImage(currentFrame,-this._getWidth()/2,-this._getHeight()/2);
				}
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

// Public function
// Input parameters: red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0)
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color
// if filters already exist, applies the color to the existing filters
// (the filter will be applied in the next update() after the filter images have rendered)
MovieBlock.prototype.addColorFilter = function(red,green,blue,alpha) {
	PARAMS.initializeValidation();
	red = PARAMS.validateParam(PARAMS.INTEGER, red);
	green = PARAMS.validateParam(PARAMS.INTEGER, green);
	blue = PARAMS.validateParam(PARAMS.INTEGER, blue);
	alpha = PARAMS.validateParam(PARAMS.NUMBER, alpha, 1);

	var movieLength;
	if (this.frames.length > 0) {
		movieLength = this.frames.length;
	}
	else {
		movieLength = this.frameAliases.length;
	}

	if (movieLength == 0) {
		if (this.width > 0 && this.height > 0) {
			CANVASMANAGER.workingCanvasFrame.resize(this.width,this.height,-1);
			CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,this.width,this.height);
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
			if (this.filters[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.filters[i],0,0);
			}
			CANVASMANAGER.workingCanvasFrame.context.save();
			CANVASMANAGER.workingCanvasFrame.context.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
			CANVASMANAGER.workingCanvasFrame.context.fillRect(0,0,this.width,this.height);
			CANVASMANAGER.workingCanvasFrame.context.restore();

			if (this.filters[i] == null) {
				this.filters[i] = new Image();
			}
			this.filters[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
		}
	}
	else {
		for (var i = 0; i < movieLength; i++) {
			var frame = this.getFrame(i);
			CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
			CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
			if (this.filters[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.filters[i],0,0);
			}
			CANVASMANAGER.workingCanvasFrame.context.save();
			CANVASMANAGER.workingCanvasFrame.context.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
			CANVASMANAGER.workingCanvasFrame.context.fillRect(0,0,frame.width,frame.height);
			CANVASMANAGER.workingCanvasFrame.context.restore();

			if (this.filters[i] == null) {
				this.filters[i] = new Image();
			}
			this.filters[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
		}
	}

	this.filtersUpdate = true;
}

// Public function
// Input parameters: filter image alias, filter image alias, ...
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters
// (the filter will be applied in the next update() after the filter images have rendered)
MovieBlock.prototype.addImageFilter = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	var filters = CANVASMANAGER.getImageAssets(arguments);

	// var filters = new Array();
	// for (var i = 0; i < arguments.length; i++) {
	// 	filters[i] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	// }

	var movieLength;
	if (this.frames.length > 0) {
		movieLength = this.frames.length;
	}
	else {
		movieLength = this.frameAliases.length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.filters[i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.filters[i],0,0);
		}
		if (filters.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(filters[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(filters[i],0,0);
		}

		if (this.filters[i] == null) {
			this.filters[i] = new Image();
		}
		this.filters[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.filtersUpdate = true;
}


// Public function
// Input parameters: mask image alias, mask image alias, ...
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s)
// if window masks already exist, applies the image(s) to the existing window masks
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
MovieBlock.prototype.addWindowMask = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);
	
	var masks = CANVASMANAGER.getImageAssets(arguments);

	// var masks = new Array();
	// for (var i = 0; i < arguments.length; i++) {
	// 	masks[i] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	// }

	var movieLength;
	if (this.frames.length > 0) {
		movieLength = this.frames.length;
	}
	else {
		movieLength = this.frameAliases.length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.windowMasks[i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.windowMasks[i],0,0);
		}
		if (masks.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[i],0,0);
		}

		if (this.windowMasks[i] == null) {
			this.windowMasks[i] = new Image();
		}
		this.windowMasks[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.masksUpdate = true;
}

// Public function
// Input parameters: mask image alias, mask image alias, ...
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s)
// if wall masks already exist, applies the image(s) to the existing window masks
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
MovieBlock.prototype.addWallMask = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	var masks = CANVASMANAGER.getImageAssets(arguments);
	// var masks = new Array();
	// for (var i = 0; i < arguments.length; i++) {
	// 	masks[i] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	// }

	var movieLength;
	if (this.frames.length > 0) {
		movieLength = this.frames.length;
	}
	else {
		movieLength = this.frameAliases.length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.wallMasks[i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.wallMasks[i],0,0);
		}
		if (masks.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[i],0,0);
		}

		if (this.wallMasks[i] == null) {
			this.wallMasks[i] = new Image();
		}
		this.wallMasks[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.masksUpdate = true;
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: function for internal use,
// when a filter or mask is added, this function is called in the next update()
// and apply the composite masks and filters to the object frames
MovieBlock.prototype.applyFiltersAndMasks = function() {
	if (this.masksUpdate || this.filtersUpdate) {
		var i = 0;
		while(this.getFrame(i) != null) {
			var frame = this.getFrame(i);
			CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
			CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
			if (this.windowMasks[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.windowMasks[i],0,0);
			}
			else {
				CANVASMANAGER.workingCanvasFrame.context.save();
				CANVASMANAGER.workingCanvasFrame.context.fillStyle = "rgba(0,0,0,1)";
				CANVASMANAGER.workingCanvasFrame.context.fillRect(0,0,frame.width,frame.height);
				CANVASMANAGER.workingCanvasFrame.context.restore();
			}
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-in";
			CANVASMANAGER.workingCanvasFrame.context.drawImage(frame,0,0);
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-atop";
			if (this.filters[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.filters[i],0,0);
			}
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "destination-out";
			if (this.wallMasks[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.wallMasks[i],0,0);
			}

			if (this.frames[i] == null) {
				this.frames[i] = new Image();
			}
			this.frames[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();

			i++;
		}
		this.masksUpdate = false;
		this.filtersUpdate = false;
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all cached frames for the object
MovieBlock.prototype.resetFrames = function() {
	for (var i = 0; i < this.frames.length; i++) {
		this.frames[i] = null;
	}
	this.frames.splice(0,this.frames.length);
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all filters for the object and triggers a reapplication of filters and masks
MovieBlock.prototype.resetFilters = function() {
	for (var i = 0; i < this.filters.length; i++) {
		this.filters[i] = null;
	}
	this.filters.splice(0,this.filters.length);

	this.resetFrames();

	this.filtersUpdate = true;
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all masks for the object and triggers a reapplication of filters and masks
MovieBlock.prototype.resetMasks = function() {
	for (var i = 0; i < this.windowMasks.length; i++) {
		this.windowMasks[i] = null;
	}
	this.windowMasks.splice(0,this.windowMasks.length);

	this.resetFrames();

	this.masksUpdate = true;
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all filters and masks for the object and triggers a reapplication of filters and masks
MovieBlock.prototype.resetFiltersAndMasks = function() {
	this.resetFilters();
	this.resetMasks();
}

MovieBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.frameAliases.length = 0;
		this.frameAliases = undefined;

		this.frames.length = 0;
		this.frames = undefined;

		this.filters.length = 0;
		this.filters = undefined;

		this.windowMasks.length = 0;
		this.windowMasks = undefined;

		this.wallMasks.length = 0;
		this.wallMasks = undefined;

		this.filtersUpdate = undefined;
		this.masksUpdate = undefined;

		this.isPlaying = undefined;
		this.currentFrameIndex = undefined;

		this.maskMode = undefined;

		this.shattered = undefined;
		this._setShattered(undefined);
	}

	ActorBlock.prototype.destroy.call(this);
}