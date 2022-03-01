var CanvasManager = function() {
	LOG.write("CanvasManager constructor function called", LOG.VERBOSE);
	var that = this;
	this.width = 0;
	this.height = 0;

	this.identityNumber = 0;

	this.startUpFunction = null;

	this.fov = 75; // field of view in degrees

	this.frameRate = 30;

	this.canvasFrameStack = new Array();
	//this.workingCanvasFrame = new CanvasFrame(this.width, this.height);

	this.mouseMoveEvent = new MouseEvent("MouseMoveEvent");
	this.mouseClickEvent = new MouseEvent("MouseClickEvent");
	this.mouseDownEvent = new MouseEvent("MouseDownEvent");
	this.mouseUpEvent = new MouseEvent("MouseUpEvent");

	this.keyboardEvent = new KeyboardEvent("KeyboardEvent");

	/*
	this.isFixedWidth = false;
	this.isFixedHeight = false;

	if (isFixedWidth != null) {
		this.isFixedWidth = isFixedWidth;
	}
	if (isFixedHeight != null) {
		this.isFixedHeight = isFixedHeight;
	}

	if (width != null) {
		this.width = width;
	}
	if (height != null) {
		this.height = height;
	}
	*/

	window.onload = function() {
		LOG.write("Window loaded and ready for action. Window width: " + window.innerWidth + " Window height: " + window.innerHeight, LOG.VERBOSE);
		
		//that.gallery = document.createElement("div");
		//that.gallery.setAttribute("style", "position: relative");


		that.width = window.innerWidth;
		that.height = window.innerHeight;
		that.workingCanvasFrame = new CanvasFrame(that.width, that.height, -1);
		var canvasFrame = new CanvasFrame(that.width, that.height, 0);
		that.canvasFrameStack.push(canvasFrame);

		//document.body.appendChild(that.gallery);
		//that.gallery.appendChild(canvasFrame.canvas);
		document.body.appendChild(canvasFrame.canvas);

		if (that.startUpFunction != null) {
			that.startUpFunction();
		}
	}

	window.onresize = function() {
		LOG.write("Window resize detected. width: " + window.innerWidth + " height: " + window.innerHeight, LOG.VERBOSE);
		var shouldResizeCanvases = false;
		if (!that.isFixedWidth) {
			that.width = window.innerWidth;
			shouldResizeCanvases = true;
		}
		if (!that.isFixedHeight) {
			that.height = window.innerHeight;
			shouldResizeCanvases = true;
		}

		if (shouldResizeCanvases) {
			for (var i = 0; i < that.canvasFrameStack.length; i++) {
				document.body.removeChild(that.canvasFrameStack[i].canvas);
				that.canvasFrameStack[i].resize(that.width, that.height, i);
				document.body.appendChild(that.canvasFrameStack[i].canvas);
				that.canvasFrameStack[i].masterBlock.x = that.width/2;
				that.canvasFrameStack[i].masterBlock.y = that.height/2;
			}
		}
	}

	window.onmousemove = function(e) {
		LOG.write("Mouse move detected. moveX:" + e.pageX + " moveY:" + e.pageY, LOG.VERBOSE);
		that.mouseMoveEvent.consumeEvent(Math.round(e.pageX), Math.round(e.pageY));
	}

	window.onclick = function(e) {
		LOG.write("Mouse click detected. clickX:" + e.pageX + " clickY:" + e.pageY, LOG.VERBOSE);
		that.mouseClickEvent.fireEvent(Math.round(e.pageX), Math.round(e.pageY));
	}

	window.onmousedown = function(e) {
		LOG.write("Mouse down detected. downX:" + e.pageX + " downY:" + e.pageY, LOG.VERBOSE);
		that.mouseDownEvent.fireEvent(Math.round(e.pageX), Math.round(e.pageY));
	}

	window.onmouseup = function(e) {
		LOG.write("Mouse up detected. upX:" + e.pageX + " upY:" + e.pageY, LOG.VERBOSE);
		that.mouseUpEvent.fireEvent(Math.round(e.pageX), Math.round(e.pageY));
	}

	window.onkeypress = function(e) {
		LOG.write("Key press detected. keycode:" + e.keyCode + " key:" + KEYCODES.getStringFromKeyCode(e.keyCode), LOG.VERBOSE);
		that.keyboardEvent.fireEvent(e.keyCode, that.keyboardEvent.KEYPRESSEVENT);
	}

	window.onkeydown = function(e) {
		LOG.write("Key down detected. keycode:" + e.keyCode + " key:" + KEYCODES.getStringFromKeyCode(e.keyCode), LOG.VERBOSE);
		that.keyboardEvent.fireEvent(e.keyCode, that.keyboardEvent.KEYDOWNEVENT);

		if (e.keyCode == KEYCODES.BACKSPACE) {
			that.keyboardEvent.fireEvent(e.keyCode, that.keyboardEvent.KEYPRESSEVENT);
			return false;
		}
	}

	window.onkeyup = function(e) {
		LOG.write("Key up detected. keycode:" + e.keyCode + " key:" + KEYCODES.getStringFromKeyCode(e.keyCode), LOG.VERBOSE);
		that.keyboardEvent.fireEvent(e.keyCode, that.keyboardEvent.KEYUPEVENT);

		if (e.keyCode == KEYCODES.BACKSPACE) {
			return false;
		}
	}

	this.assetManager = new AssetManager();
};

CanvasManager.prototype.getIdentityNumber = function() {
	return this.identityNumber++;
}

CanvasManager.prototype.setStartUpFunction = function(func) {
	PARAMS.initializeValidation();
	func = PARAMS.validateParam(PARAMS.FUNCTION, func);

	this.startUpFunction = func;
}

CanvasManager.prototype.addCanvasFrame = function(canvasFrame) {
	PARAMS.initializeValidation();
	canvasFrame = PARAMS.validateParam(PARAMS.CANVASFRAME, canvasFrame);

	var index = this.canvasFrameStack.indexOf(canvasFrame);
	
	if (index > -1) {
		this.canvasFrameStack[index] = undefined;
		//this.canvasFrameStack.splice(index, 1);
		//this.gallery.removeChild(canvasFrame.canvas);
		document.body.removeChild(canvasFrame.canvas);
	}

	this.canvasFrameStack.push(canvasFrame);

	//this.gallery.appendChild(canvasFrame.canvas);
	document.body.appendChild(canvasFrame.canvas);
}

CanvasManager.prototype.insertCanvasFrame = function(canvasFrame, insertionIndex) {
	PARAMS.initializeValidation();
	canvasFrame = PARAMS.validateParam(PARAMS.CANVASFRAME, canvasFrame);

	var index = this.canvasFrameStack.indexOf(canvasFrame);
	
	if (index > -1) {
		this.canvasFrameStack[index] = undefined;
		// this.canvasFrameStack.splice(index, 1);
		// this.gallery.removeChild(canvasFrame.canvas);
		document.body.removeChild(canvasFrame.canvas);
	}

	this.canvasFrameStack[insertionIndex] = canvasFrame;

	//this.gallery.appendChild(canvasFrame.canvas);
	document.body.appendChild(canvasFrame.canvas);
}

CanvasManager.prototype.addNewCanvasFrame = function() {
	var canvasFrame = new CanvasFrame(this.width, this.height, this.canvasFrameStack.length);
	this.canvasFrameStack.push(canvasFrame);
	document.body.appendChild(canvasFrame.canvas);
}

CanvasManager.prototype.adoptBlockChild = function(block, canvasFrameIndex) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.BLOCK, block);
	canvasFrameIndex = PARAMS.validateParam(PARAMS.INTEGER, canvasFrameIndex);

	// if (canvasFrameIndex == null) {
	// 	canvasFrameIndex = 0;
	// }

	if (!this.canvasFrameStack[canvasFrameIndex]) {
		var canvasFrame = new CanvasFrame(this.width, this.height, canvasFrameIndex);
		this.insertCanvasFrame(canvasFrame,canvasFrameIndex);

	}

	this.canvasFrameStack[canvasFrameIndex].adoptBlockChild(block);
}

CanvasManager.prototype.refreshAll = function() {
	this.mouseMoveEvent.fireEvent();
	for (var i = 0; i < this.canvasFrameStack.length; i++) {
		this.canvasFrameStack[i].refresh();
	}
}

CanvasManager.prototype.start = function(frameRate) {
	PARAMS.initializeValidation();
	frameRate = PARAMS.validateParam(PARAMS.INTEGER, frameRate);

	var that = this;

	if (frameRate != null) {
		this.frameRate = frameRate;
	}

	setInterval(function() {window.requestAnimationFrame(function() { that.refreshAll(); })},1000/this.frameRate);
}

CanvasManager.prototype.showVerboseMessages = function() {
	LOG.setLogThreshold(LOG.VERBOSE);
}

CanvasManager.prototype.showInfoMessages = function() {
	LOG.setLogThreshold(LOG.INFO);
}

CanvasManager.prototype.showWarningMessages = function() {
	LOG.setLogThreshold(LOG.WARN);
}

CanvasManager.prototype.showErrorMessages = function() {
	LOG.setLogThreshold(LOG.ERROR);
}

CanvasManager.prototype.showFatalMessages = function() {
	LOG.setLogThreshold(LOG.FATAL);
}

CanvasManager.prototype.showNoMessages = function() {
	LOG.setLogThreshold(LOG.NONE);
}

/*
CanvasManager.prototype.loadImageAssetsXML = function(filename) {
	this.assetManager.loadImageAssetXML(filename);
}

CanvasManager.prototype.loadAudioAssetsXML = function(filename) {
	this.assetManager.loadAudioAssetXML(filename);
}
*/

CanvasManager.prototype.loadAssets = function(imageXMLfilename, audioXMLfilename, videoXMLfilename) {
	PARAMS.initializeValidation();
	imageXMLfilename = PARAMS.validateParam(PARAMS.STRING, imageXMLfilename, null);
	audioXMLfilename = PARAMS.validateParam(PARAMS.STRING, audioXMLfilename, null);
	videoXMLfilename = PARAMS.validateParam(PARAMS.STRING, videoXMLfilename, null);

	this.assetManager.loadAssets(imageXMLfilename, audioXMLfilename, videoXMLfilename);
}

CanvasManager.prototype.getSingleImageAsset = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	return this.assetManager.imageAssets[alias].img;
}

// pass in image aliases to be gotten
//CanvasManager.prototype.getImageAssets = function() {
//	var imageAssets = new Array();
//	for (var i = 0; i < arguments.length; i++) {
//		imageAssets.push(this.assetManager.imageAssets[arguments[i]].img);
//	}
//	return imageAssets;
//}

CanvasManager.prototype.getImageAssets = function(aliases) {
	PARAMS.initializeValidation();
	aliases = PARAMS.validateParam(PARAMS.ARRAYOFSTRING, aliases);

	var imageAssets = new Array();
	for (var i = 0; i < aliases.length; i++) {
		imageAssets.push(this.assetManager.imageAssets[aliases[i]].img);
	}
	return imageAssets;
}

CanvasManager.prototype.getSingleImageAssetData = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	return this.assetManager.imageAssets[alias].imgdata;
}

// pass in image aliases to be gotten
//CanvasManager.prototype.getImageAssetData = function() {
//	var imageAssets = new Array();
//	for (var i = 0; i < arguments.length; i++) {
//		imageAssets.push(this.assetManager.imageAssets[arguments[i]].imgdata);
//	}
//	return imageAssets;
//}

CanvasManager.prototype.getImageAssetData = function(aliases) {
	PARAMS.initializeValidation();
	aliases = PARAMS.validateParam(PARAMS.ARRAYOFSTRING, aliases);

	var imageAssets = new Array();
	for (var i = 0; i < aliases.length; i++) {
		imageAssets.push(this.assetManager.imageAssets[aliases[i]].imgdata);
	}
	return imageAssets;
}

CanvasManager.prototype.getAudioAsset = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	return this.assetManager.audioAssets[alias].track;
}

CanvasManager.prototype.getVideoAsset = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	return this.assetManager.videoAssets[alias].video;
}

var CANVASMANAGER = new CanvasManager();