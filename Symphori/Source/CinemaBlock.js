// Public Constructor function
// Input parameter(s):  movie name string, array of image aliases, movie name string, array of image aliases, ...
// Returns: CinemaBlock object instantiated with movies of the images matching the supplied input parameters
// Example: var b = new CinemaBlock("BirdLeft",["Bird1","Bird2"], "BirdRight", ["Bird1R","Bird2R""]);
var CinemaBlock = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING, PARAMS.ARRAYOFSTRING], arguments);

	LOG.write("CinemaBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	this.movieFrameAliases = new Object();

	for (var i = 0; i < arguments.length; i += 2) {
		this.movieFrameAliases[arguments[i]] = arguments[i+1];
	}

	this.movieFrameData = new Object();
	this.movieFrames = new Object();

	this.movieFilters = new Object();
	this.movieWindowMasks = new Object();
	this.movieWallMasks = new Object();

	this.movieFiltersUpdate = new Object();
	this.movieMasksUpdate = new Object();


	this.isPlaying = true;
	if (arguments[0] == undefined) {
		this.currentMovie = "";
	}
	else {
		this.currentMovie = arguments[0];
	}
	
	this.currentFrameIndex = -1;

	this.maskMode = "none";
}

CinemaBlock.prototype = new ActorBlock();
CinemaBlock.prototype.learn(PlayerTraits);
CinemaBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
CinemaBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.currentMovie = this.currentMovie;
	memory.currentFrameIndex = this.currentFrameIndex;

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
CinemaBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.currentMovie = memory.currentMovie;
	this.currentFrameIndex = memory.currentFrameIndex;
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
CinemaBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.currentMovie == this.currentMovie && memory.currentFrameIndex == this.currentFrameIndex);
	}
}

// Private function
// Input parameters: string of the movieName to play
// Returns: nothing
// Description: sets the current movie to play, and resets the frame index
CinemaBlock.prototype.play = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);

	var validMovieName = false;
	for (var existingMovieName in this.movieFrameAliases) {
		if (existingMovieName == movieName) {
			validMovieName = true;
		}
	}
	for (var existingMovieName in this.movieFrameData) {
		if (existingMovieName == movieName) {
			validMovieName = true;
		}
	}

	if (validMovieName) {
		this.currentMovie = movieName;
		this.currentFrameIndex = -1;
	}
	else {
		LOG.write("CinemaBlock with identity " + this.identity + " has no Movie named '" + movieName + "' to play. Defaulting to '" + this.currentMovie + "'.", LOG.WARN);
		this.currentFrameIndex = -1;
	}
	
}

CinemaBlock.prototype.pause = function() {
	this.isPlaying = false;
}

CinemaBlock.prototype.unpause = function() {
	this.isPlaying = true;
}

CinemaBlock.prototype.playPause = function() {
	this.isPlaying = !this.isPlaying;
}

CinemaBlock.prototype.stop = function() {
	this.play();
	this.pause();
}

// Public function
// Input parameters: the new size for the shattered blocks (integer)
// Returns: nothing
// Description: shatters the current block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
CinemaBlock.prototype.shatter = function(newBlockSize) {
	PARAMS.initializeValidation();
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);

	var maxWidth = 0;
	var maxHeight = 0;

	for (var movieName in this.movieFrameAliases) {
		for (var k = 0; k < this.movieFrameAliases[movieName].length; k++) {
			var frame = this.getFrame(movieName,k);

			if (frame.width > maxWidth) { maxWidth = frame.width; }
			if (frame.height > maxHeight) { maxHeight = frame.height; }
		}
	}

	ShatterTraits.prototype.shatter.call(this,newBlockSize,maxWidth,maxHeight);
}

// Public function
// Input parameters: none
// Returns: boolean
// Description: returns whether or not the current frame is the last frame in the current movie
CinemaBlock.prototype.isLastMovieFrame = function() {
	if (this.currentFrameIndex >= 0 && 
		((this.movieFrames[this.currentMovie] != null && this.currentFrameIndex + 1 == this.movieFrames[this.currentMovie].length) ||
			(this.movieFrameAliases[this.currentMovie] != null && this.currentFrameIndex + 1 == this.movieFrameAliases[this.currentMovie].length))) {
		return true;
	}
	else {
		return false;
	}
}

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the image of the current frame, 
// either through the actual image saved in the frames property
// or the image asset matched by the alias associated with the frame, 
// or returns null if no image can be found
CinemaBlock.prototype.getCurrentFrame = function() {
	if (this.currentFrameIndex >= 0 && 
		((this.movieFrames[this.currentMovie] != null && this.currentFrameIndex < this.movieFrames[this.currentMovie].length) ||
			(this.movieFrameAliases[this.currentMovie] != null && this.currentFrameIndex < this.movieFrameAliases[this.currentMovie].length))) {

		if (this.movieFrames[this.currentMovie] != null && this.movieFrames[this.currentMovie][this.currentFrameIndex] != null) {
			return this.movieFrames[this.currentMovie][this.currentFrameIndex];
		}
		else {
			return CANVASMANAGER.getSingleImageAsset(this.movieFrameAliases[this.currentMovie][this.currentFrameIndex]);
		}
	}
	else {
		return null;
	}
}

// Public function
// Input parameters: movieName string, integer index of the desired frame
// Returns: image or null
// Description: returns the image of the specified frame,
// either through the actual image saved in the movieFrames property
// or the image asset matched by the alias associated with the frame, 
// or returns null if no image can be found
CinemaBlock.prototype.getFrame = function(movieName,frameIndex) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);
	frameIndex = PARAMS.validateParam(PARAMS.INTEGER, frameIndex);

	if (frameIndex >= 0 &&
		((this.movieFrames[movieName] != null && frameIndex < this.movieFrames[movieName].length) ||
			(this.movieFrameAliases[movieName] != null && frameIndex < this.movieFrameAliases[movieName].length))) {
		if (this.movieFrames[movieName] != null && this.movieFrames[movieName][frameIndex] != null) {
			return this.movieFrames[movieName][frameIndex];
		}
		else {
			return CANVASMANAGER.getSingleImageAsset(this.movieFrameAliases[movieName][frameIndex]);
		}
	}
	else {
		return null;
	}
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's image after applying necessary transformations
CinemaBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	if (this.currentMovie != null && (this.movieFrameAliases[this.currentMovie].length > 0 || this.movieFrames[this.currentMovie].length > 0)) {
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
			LOG.write("error in CinemaBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
			LOG.writeBlock(this, LOG.ERROR);
			LOG.writeObject(err, LOG.ERROR);
			debugger;
		}
	}
}

// Private function
// Input parameters: canvas context where updates may occur
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles frame updates and filter/mask application
CinemaBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	if (this.isMarkedForDestruction) return;

	if (this.isPlaying) {
		this.currentFrameIndex++;

		if ((this.movieFrameAliases[this.currentMovie] != null && this.movieFrameAliases[this.currentMovie].length > 0 && this.currentFrameIndex >= this.movieFrameAliases[this.currentMovie].length) ||
			 (this.movieFrameData[this.currentMovie] != null && this.movieFrameData[this.currentMovie].length > 0 && this.currentFrameIndex >= this.movieFrameData[this.currentMovie].length)) {
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
CinemaBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	if (this.currentMovie != null && (this.movieFrameAliases[this.currentMovie].length > 0 || this.movieFrames[this.currentMovie].length > 0)) {
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
			LOG.write("error in CinemaBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
			LOG.writeBlock(this, LOG.ERROR);
			LOG.writeObject(err, LOG.ERROR);
			debugger;
		}
	}
}

// Public function
// Input parameters: movieName string, red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0)
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color for the specified movie
// if filters already exist, applies the color to the existing filters for the specified movie
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addColorFilterToMovie = function(movieName,red,green,blue,alpha) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);
	red = PARAMS.validateParam(PARAMS.INTEGER, red);
	green = PARAMS.validateParam(PARAMS.INTEGER, green);
	blue = PARAMS.validateParam(PARAMS.INTEGER, blue);
	alpha = PARAMS.validateParam(PARAMS.NUMBER, alpha, 1);

	var movieLength;
	if (this.movieFrames[movieName] != null && this.movieFrames[movieName].length > 0) {
		movieLength = this.movieFrames[movieName].length;
	}
	else {
		movieLength = this.movieFrameAliases[movieName].length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(movieName, i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.movieFilters[movieName] != null && this.movieFilters[movieName][i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieFilters[movieName][i],0,0);
		}
		CANVASMANAGER.workingCanvasFrame.context.save();
		CANVASMANAGER.workingCanvasFrame.context.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
		CANVASMANAGER.workingCanvasFrame.context.fillRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.restore();

		if (this.movieFilters[movieName] == null) {
			this.movieFilters[movieName] = new Array();
		}
		if (this.movieFilters[movieName][i] == null) {
			this.movieFilters[movieName][i] = new Image();
		}
		this.movieFilters[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.movieFiltersUpdate[movieName] = true;
}

// Public function
// Input parameters: red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0), movieName string, movieName string, ...
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color for the specified movies
// if filters already exist, applies the color to the existing filters for the specified movies
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addColorFilterToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.NUMBER, PARAMS.REST, PARAMS.STRING],
		arguments,
		[0,0,0,1.0,""]);

	var red = arguments[0];
	var green = arguments[1];
	var blue = arguments[2];
	var alpha = arguments[3];
	for (var i = 4; i < arguments.length; i++) {
		this.addColorFilterToMovie(arguments[i],red,green,blue,alpha)
	}
}

// Public function
// Input parameters: red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0), movieName string, r, g, b, a, movieName, ...
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color for the specified movies
// if filters already exist, applies the color to the existing filters for the specified movies
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addColorFiltersToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.NUMBER, PARAMS.STRING],
		arguments,
		[0,0,0,1.0,""]);

	for (var i = 0; i < arguments.length; i += 5) {
		this.addColorFilterToMovie(arguments[i],arguments[i+1],arguments[i+2],arguments[i+3],arguments[i+4])
	}
}

// Public function
// Input parameters: red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0)
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color for all movies
// if filters already exist, applies the color to the existing filters for all movies
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addColorFilter = function(red,green,blue,alpha) {
	PARAMS.initializeValidation();
	red = PARAMS.validateParam(PARAMS.INTEGER, red);
	green = PARAMS.validateParam(PARAMS.INTEGER, green);
	blue = PARAMS.validateParam(PARAMS.INTEGER, blue);
	alpha = PARAMS.validateParam(PARAMS.NUMBER, alpha, 1);

	for (var movieName in this.movieFrameAliases) {
		this.addColorFilterToMovie(movieName,red,green,blue,alpha);
	}
}

// Public function
// Input parameters: movieName string, filter image alias, filter image alias, ...
// Returns: nothing
// Description: if no filters exist, creates new filters for the supplied movieName from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters for the supplied movieName
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addImageFilterToMovie = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.STRING, PARAMS.REST, PARAMS.STRING], arguments);

	var movieName = arguments[0];
	var filters = new Array();
	for (var i = 1; i < arguments.length; i++) {
		filters[i-1] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	}
	var movieLength;
	if (this.movieFrames[movieName] != null && this.movieFrames[movieName].length > 0) {
		movieLength = this.movieFrames[movieName].length;
	}
	else {
		movieLength = this.movieFrameAliases[movieName].length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(movieName, i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.movieFilters[movieName] != null && this.movieFilters[movieName][i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieFilters[movieName][i],0,0);
		}
		if (filters.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(filters[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(filters[i],0,0);
		}

		if (this.movieFilters[movieName] == null) {
			this.movieFilters[movieName] = new Array();
		}
		if (this.movieFilters[movieName][i] == null) {
			this.movieFilters[movieName][i] = new Image();
		}
		this.movieFilters[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.movieFiltersUpdate[movieName] = true;
}

// Public function
// Input parameters: array of filter image aliases, movieName string, movieName string, ...
// Returns: nothing
// Description: if no filters exist, creates new filters for the supplied movieNames from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters for the supplied movieNames
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addImageFilterToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.ARRAYOFSTRING, PARAMS.REST, PARAMS.STRING], arguments);

	var filterAliases = arguments[0];
	var filterArgs = new Array();
	filterArgs[0] = "";
	filterArgs = filterArgs.concat(filterAliases);
	for (var i = 1; i < arguments.length; i++) {
		filterArgs[0] = arguments[i];
		this.addImageFilterToMovie.apply(this,filterArgs);
	}
}

// Public function
// Input parameters: array of movieName strings, array of filter image aliases, array of movieName strings, array of filter image aliases, ...
// Returns: nothing
// Description: if no filters exist, creates new filters for the supplied movieNames from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters for the supplied movieNames
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addImageFiltersToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.ARRAYOFSTRING, PARAMS.ARRAYOFSTRING], arguments);

	for (var i = 0; i < arguments.length; i += 2) {
		var movieName = arguments[i];
		var filterAliases = arguments[i+1];
		filterArgs = new Array();
		filterArgs[0] = movieName;
		filterArgs = filterArgs.concat(filterAliases);
		this.addImageFilterToMovie.apply(this,filterArgs);
	}
}

// Public function
// Input parameters: filter image alias, filter image alias, ...
// Returns: nothing
// Description: if no filters exist, creates new filters for all movies from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters for all movies
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addImageFilter = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var movieName in this.movieFrameAliases) {
		var filterAliases = [].slice.call(arguments,0);
		var filterArgs = new Array();
		filterArgs[0] = movieName;
		filterArgs = filterArgs.concat(filterAliases);
		this.addImageFilterToMovie.apply(this,filterArgs);
	}
}

// Public function
// Input parameters: movieName, mask image alias, mask image alias, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the specified movie
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s) for the specified movie
// if window masks already exist, applies the image(s) to the existing window masks for the specified movie
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
CinemaBlock.prototype.addWindowMaskToMovie = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.STRING, PARAMS.REST, PARAMS.STRING], arguments);

	var movieName = arguments[0];
	var masks = new Array();
	for (var i = 1; i < arguments.length; i++) {
		masks[i-1] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	}

	var movieLength;
	if (this.movieFrames[movieName] != null && this.movieFrames[movieName].length > 0) {
		movieLength = this.movieFrames[movieName].length;
	}
	else {
		movieLength = this.movieFrameAliases[movieName].length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(movieName, i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.movieWindowMasks[movieName] != null && this.movieWindowMasks[movieName][i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieWindowMasks[movieName][i],0,0);
		}
		if (masks.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[i],0,0);
		}

		if (this.movieWindowMasks[movieName] == null) {
			this.movieWindowMasks[movieName] = new Array();
		}
		if (this.movieWindowMasks[movieName][i] == null) {
			this.movieWindowMasks[movieName][i] = new Image();
		}
		this.movieWindowMasks[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.movieMasksUpdate[movieName] = true;
}

// Public function
// Input parameters: array of mask image aliases, movieName string, movieName string, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the specified movie(s)
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s) for the specified movies
// if window masks already exist, applies the image(s) to the existing window masks for the specified movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
CinemaBlock.prototype.addWindowMaskToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.ARRAYOFSTRING, PARAMS.REST, PARAMS.STRING], arguments);

	var maskAliases = arguments[0];
	var maskArgs = new Array();
	maskArgs[0] = "";
	maskArgs = maskArgs.concat(maskAliases);
	for (var i = 1; i < arguments.length; i++) {
		maskArgs[0] = arguments[i];
		this.addWindowMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: movieName string, array of mask image aliases, movieName string, array of mask image aliases, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the specified movie(s)
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s) for the specified movies
// if window masks already exist, applies the image(s) to the existing window masks for the specified movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
CinemaBlock.prototype.addWindowMasksToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING, PARAMS.ARRAYOFSTRING], arguments);

	for (var i = 0; i < arguments.length; i += 2) {
		var movieName = arguments[i];
		var maskAliases = arguments[i+1];
		maskArgs = new Array();
		maskArgs[0] = movieName;
		maskArgs = maskArgs.concat(maskAliases);
		this.addWindowMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: mask image alias, mask image alias, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s) for all the object's movies
// if window masks already exist, applies the image(s) to the existing window masks for all the object's movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
CinemaBlock.prototype.addWindowMask = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var movieName in this.movieFrameAliases) {
		var maskArgs = new Array();
		var maskAliases = [].slice.call(arguments,0);
		maskArgs[0] = movieName;
		maskArgs = maskArgs.concat(maskAliases);
		this.addWindowMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: movieName string, mask image alias, mask image alias, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s) for the specified movie
// if wall masks already exist, applies the image(s) to the existing window masks for the specified movie
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
CinemaBlock.prototype.addWallMaskToMovie = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.STRING, PARAMS.REST, PARAMS.STRING], arguments);

	var movieName = arguments[0];
	var masks = new Array();
	for (var i = 1; i < arguments.length; i++) {
		masks[i-1] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	}

	var movieLength;
	if (this.movieFrames[movieName] != null && this.movieFrames[movieName].length > 0) {
		movieLength = this.movieFrames[movieName].length;
	}
	else {
		movieLength = this.movieFrameAliases[movieName].length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(movieName, i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.movieWallMasks[movieName] != null && this.movieWallMasks[movieName][i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieWallMasks[movieName][i],0,0);
		}
		if (masks.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[i],0,0);
		}

		if (this.movieWallMasks[movieName] == null) {
			this.movieWallMasks[movieName] = new Array();
		}
		if (this.movieWallMasks[movieName][i] == null) {
			this.movieWallMasks[movieName][i] = new Image();
		}
		this.movieWallMasks[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.movieMasksUpdate[movieName] = true;
}

// Public function
// Input parameters: array of mask image aliases, movieName string, movieName string, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s) for the specified movies
// if wall masks already exist, applies the image(s) to the existing window masks for the specified movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
CinemaBlock.prototype.addWallMaskToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.ARRAYOFSTRING, PARAMS.REST, PARAMS.STRING], arguments);

	var maskAliases = arguments[0];
	var maskArgs = new Array();
	maskArgs[0] = "";
	maskArgs = maskArgs.concat(maskAliases);
	for (var i = 1; i < arguments.length; i++) {
		maskArgs[0] = arguments[i];
		this.addWallMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: movieName string, array of mask image aliases, movieName string, array of mask image aliases, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s) for the specified movies
// if wall masks already exist, applies the image(s) to the existing window masks for the specified movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
CinemaBlock.prototype.addWallMasksToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING, PARAMS.ARRAYOFSTRING], arguments);
	for (var i = 0; i < arguments.length; i += 2) {
		var movieName = arguments[i];
		var maskAliases = arguments[i+1];
		maskArgs = new Array();
		maskArgs[0] = movieName;
		maskArgs = maskArgs.concat(maskAliases);
		this.addWallMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: mask image alias, mask image alias, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s) for all the object's movies
// if wall masks already exist, applies the image(s) to the existing window masks for all the object's movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
CinemaBlock.prototype.addWallMask = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var movieName in this.movieFrameAliases) {
		var maskArgs = new Array();
		var maskAliases = [].slice.call(arguments,0);
		maskArgs[0] = movieName;
		maskArgs = maskArgs.concat(maskAliases);
		this.addWallMaskToMovie.apply(this,maskArgs);
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: function for internal use,
// when a filter or mask is added, this function is called in the next update()
// and apply the composite masks and filters to the object frames
CinemaBlock.prototype.applyFiltersAndMasks = function() {
	for (var movieName in this.movieFrameAliases) {
		if (this.movieMasksUpdate[movieName] || this.movieFiltersUpdate[movieName]) {
			var i = 0;
			while(this.getFrame(movieName, i) != null) {
				var frame = this.getFrame(movieName, i);
				CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
				CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
				CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
				if (this.movieWindowMasks[movieName] != null && this.movieWindowMasks[movieName][i] != null) {
					CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieWindowMasks[movieName][i],0,0);
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
				if (this.movieFilters[movieName] != null && this.movieFilters[movieName][i] != null) {
					CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieFilters[movieName][i],0,0);
				}
				CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "destination-out";
				if (this.movieWallMasks[movieName] != null && this.movieWallMasks[movieName][i] != null) {
					CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieWallMasks[movieName][i],0,0);
				}

				if (this.movieFrames[movieName] == null) {
					this.movieFrames[movieName] = new Array();
				}
				if (this.movieFrames[movieName][i] == null) {
					this.movieFrames[movieName][i] = new Image();
				}
				this.movieFrames[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();

				i++;
			}
			this.movieMasksUpdate[movieName] = false;
			this.movieFiltersUpdate[movieName] = false;
		}
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all cached frames for all movies in the object
CinemaBlock.prototype.resetFramesForMovie = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);

	if (this.movieFrames[movieName] != undefined) {
		for (var i = 0; i < this.movieFrames[movieName].length; i++) {
			this.movieFrames[movieName][i] = null;
		}
		this.movieFrames[movieName].splice(0,this.movieFrames[movieName].length);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all cached frames for all movies in the object
CinemaBlock.prototype.resetFramesForMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var i = 0; i < arguments.length; i++) {
		this.resetFramesForMovie(arguments[i]);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all cached frames for all movies in the object
CinemaBlock.prototype.resetFrames = function() {
	for (var movieName in this.movieFrames) {
		this.resetFramesForMovie(movieName);
	}
}

// Public function
// Input parameters: movieName string
// Returns: nothing
// Description: clears all filters for the specified movie and triggers a reapplication of filters and masks for that movie
CinemaBlock.prototype.resetFiltersForMovie = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);

	if (this.movieFilters[movieName] != undefined) {
		for (var i = 0; i < this.movieFilters[movieName].length; i++) {
			this.movieFilters[movieName][i] = null;
		}
		this.movieFilters[movieName].splice(0,this.movieFilters[movieName].length);

		this.resetFramesForMovie(movieName);

		this.movieFiltersUpdate[movieName] = true;
	}
}

// Public function
// Input parameters: movieName string, movieName string, ...
// Returns: nothing
// Description: clears all filters for the specified movies and triggers a reapplication of filters and masks for those movies
CinemaBlock.prototype.resetFiltersForMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var i = 0; i < arguments.length; i++) {
		this.resetFiltersForMovie(arguments[i]);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all filters for all movies and triggers a reapplication of filters and masks for all movies
CinemaBlock.prototype.resetFilters = function() {
	for (var movieName in this.movieFrameAliases) {
		this.resetFiltersForMovie(movieName);
	}
}

// Public function
// Input parameters: movieName string
// Returns: nothing
// Description: clears all masks for the specified movie and triggers a reapplication of filters and masks for that movie
CinemaBlock.prototype.resetMasksForMovie = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);

	if (this.movieWindowMasks[movieName] != undefined) {
		for (var i = 0; i < this.movieWindowMasks[movieName].length; i++) {
			this.movieWindowMasks[movieName][i] = null;
		}
		this.movieWindowMasks[movieName].splice(0,this.movieWindowMasks[movieName].length);

		this.resetFramesForMovie(movieName);

		this.movieMasksUpdate[movieName] = true;
	}
}

// Public function
// Input parameters: movieName string, movieName string, ...
// Returns: nothing
// Description: clears all masks for the specified movies and triggers a reapplication of filters and masks for those movies
CinemaBlock.prototype.resetMasksForMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var i = 0; i < arguments.length; i++) {
		this.resetMasksForMovie(arguments[i]);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all masks for all movies and triggers a reapplication of filters and masks for all movies
CinemaBlock.prototype.resetMasks = function() {
	for (var movieName in this.movieFrameAliases) {
		this.resetMasksForMovie(movieName);
	}
}

// Public function
// Input parameters: movieName string
// Returns: nothing
// Description: clears all filters and masks for the specified movie and triggers a reapplication of filters and masks for that movie
CinemaBlock.prototype.resetFiltersAndMasksForMovie = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);
	
	this.resetFiltersForMovie(movieName);
	this.resetMasksForMovie(movieName);
}

// Public function
// Input parameters: movieName string, movieName string, ...
// Returns: nothing
// Description: clears all filters and masks for the specified movies and triggers a reapplication of filters and masks for those movies
CinemaBlock.prototype.resetFiltersAndMasksForMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	this.resetFiltersForMovies.apply(this,[].slice.call(arguments,0));
	this.resetMasksForMovies.apply(this,[].slice.call(arguments,0));
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all filters and masks for all movies and triggers a reapplication of filters and masks for all movies
CinemaBlock.prototype.resetFiltersAndMasks = function() {
	this.resetFilters();
	this.resetMasks();
}

CinemaBlock.prototype.destroy = function() {
	this.movieFrameAliases = undefined;

	this.movieFrameData = undefined;
	this.movieFrames = undefined;

	this.movieFilters = undefined;
	this.movieWindowMasks = undefined;
	this.movieWallMasks = undefined;

	this.movieFiltersUpdate = undefined;
	this.movieMasksUpdate = undefined;

	this.isPlaying = undefined;
	this.currentMovie = undefined;
	
	this.currentFrameIndex = undefined;

	this.maskMode = undefined;

	this.shattered = undefined;
	this._setShattered(undefined);

	ActorBlock.prototype.destroy.call(this);
}