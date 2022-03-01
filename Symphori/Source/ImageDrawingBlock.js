// Public Constructor function
// Input parameter(s):  
// Returns: ImageDrawingBlock object 
// Description: utilizes the native canvas drawing functions to draw...whatever you want
// User is responsible for undrawing what they have drawn
// Example: var myDB = new ImageDrawingBlock()
var ImageDrawingBlock = function(width,height) {
	PARAMS.initializeValidation();
	width = PARAMS.validateParam(PARAMS.INTEGER, width);
	height = PARAMS.validateParam(PARAMS.INTEGER, height);

	LOG.write("DrawingBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	this.width = width;
	this.height = height;

	this.drawingCommands = new Array();

	this.canvasImage = new Image();
}

ImageDrawingBlock.prototype = new ActorBlock();
ImageDrawingBlock.prototype.learn(CanvasTraits);
ImageDrawingBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
ImageDrawingBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	if (memory.drawingCommands == undefined) {
		memory.drawingCommands = new Array();
	}
	else {
		memory.drawingCommands.splice(0,memory.drawingCommands.length);
	}
	for (var i = 0; i < this.drawingCommands.length; i++) {
		if (memory.drawingCommands[i] == undefined) {
			memory.drawingCommands[i] = new Object();
		}
		memory.drawingCommands[i].command = this.drawingCommands[i].command;

		if (this.drawingCommands[i].parameters != undefined) {
			if (memory.drawingCommands[i].parameters == undefined) {
				memory.drawingCommands[i].parameters = new Array();
			}
			else {
				memory.drawingCommands[i].parameters.splice(0,memory.drawingCommands[i].parameters.length);
			}
			for (var j = 0; j < this.drawingCommands[i].parameters.length; j++) {
				memory.drawingCommands[i].parameters[j] = this.drawingCommands[i].parameters[j];
			}
		}
		
	}

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
ImageDrawingBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.drawingCommands = memory.drawingCommands;
}

// Private function
// Input parameters: boolean, whether or not changes in the parent class' properties are checked
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
ImageDrawingBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
	PARAMS.initializeValidation();
	excludeParentProperties = PARAMS.validateParam(PARAMS.BOOLEAN, excludeParentProperties);

	var memory = this.getLatestMemory();
	var hasDifferentDrawingCommands = false;

	if (memory != null) {
		if (memory.drawingCommands != this.drawingCommands) {
			hasDifferentDrawingCommands = true;
		}
		for (var dc = 0; dc < memory.drawingCommands.length; dc++) {
			if (this.drawingCommands[dc] == undefined) {
				hasDifferentDrawingCommands = true;
				break;
			}
			else if (this.drawingCommands[dc].command != memory.drawingCommands[dc].command) {
				hasDifferentDrawingCommands = true;
				break;
			}
			else if (this.drawingCommands[dc].parameters != null && memory.drawingCommands[dc].parameters != null && 
					 	this.drawingCommands[dc].parameters.length != memory.drawingCommands[dc].parameters.length) {
				hasDifferentDrawingCommands = true;
				break;
			}
			else if (this.drawingCommands[dc].parameters != null && memory.drawingCommands[dc].parameters != null) {
				for (var i = 0; i < this.drawingCommands[dc].parameters.length; i++) {
					if (this.drawingCommands[dc].parameters[i] != memory.drawingCommands[dc].parameters[i]) {
						hasDifferentDrawingCommands = true;
						break;
					}
				}
			}
		}
	}
	else {
		hasDifferentDrawingCommands = true;
	}

	if (memory == null) {
		return true;
	}
	else if (excludeParentProperties) {
		return hasDifferentDrawingCommands;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || hasDifferentDrawingCommands;
	}
}

// // Public function
// // Input parameters: the new size for the shattered blocks (integer)
// // Returns: nothing
// // Description: shatters the current block's frames into an an array of new child blocks, 
// // each with a small part of the original image/animation
// ImageDrawingBlock.prototype.shatter = function(newBlockSize) {
// 	PARAMS.initializeValidation();
// 	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);
	
// 	if (!this.shattered) {
// 		var blockClusterPositions = new Array();

// 		var blockIndex = 0;
// 		for (var i = 0; i < this.width; i += newBlockSize) {
// 			for (var j = 0; j < this.height; j += newBlockSize) {
// 				if (blockClusterPositions[blockIndex] == undefined) {
// 					blockClusterPositions[blockIndex] = {"x":Math.floor(i - this.width/2 + newBlockSize/2), "y":Math.floor(j - this.height/2 + newBlockSize/2)};
// 				}
				
// 				blockIndex++;
// 			}
// 		}

// 		for (var i = 0; i < blockClusterPositions.length; i++) {
// 			var newBlock = new FragmentBlock(this,newBlockSize,newBlockSize,blockClusterPositions[i].x,blockClusterPositions[i].y,0);

// 			newBlock.setMemoryCapacity(this.memoryCapacity);
			
// 			this.adoptChild(newBlock);
// 		}

// 		this.shattered = true;
// 	}
// }

// // Public function
// // Input parameters: none
// // Returns: nothing
// // Description: removes child blocks resulting from shatter
// ImageDrawingBlock.prototype.unshatter = function() {
// 	for (var i = 0; i < this.children.length; i++) {
// 		if (this.children[i] instanceof FragmentBlock) {
// 			this.children[i].destroy();
// 			this.children.splice(i,1);
// 			i--;
// 		}
// 	}
// 	this.shattered = false;
// }

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the canvas image of the current frame, 
// or returns null if no canvas image can be found
ImageDrawingBlock.prototype.getCurrentFrame = function() {
	if (this.drawingCommands.length > 0 && this.canvasImage) {
		return this.canvasImage;
	}
	else {
		return null;
	}
}

ImageDrawingBlock.prototype.addDrawingCommand = function(command, parameters) {
	PARAMS.initializeValidation();
	command = PARAMS.validateParam(PARAMS.STRING,command);
	parameters = PARAMS.validateParam(PARAMS.ARRAY,parameters);

	if (command.length > 0) {
		var drawingCommand = new Object();
		drawingCommand.command = command;
		drawingCommand.parameters = parameters;

		this.drawingCommands.push(drawingCommand);
	}
}

ImageDrawingBlock.prototype.addDrawingCommands = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING, PARAMS.ARRAYOFOBJECT],
							 arguments);

	for (var i = 0; i < arguments.length; i += 2) {
		var command = arguments[i];
		var parameters = arguments[i+1];

		if (command.length > 0) {
			var drawingCommand = new Object();
			drawingCommand.command = command;
			drawingCommand.parameters = parameters;

			this.drawingCommands.push(drawingCommand);
		}
	}
}

ImageDrawingBlock.prototype.setDrawingCommands = function(drawingCommands) {
	PARAMS.initializeValidation();
	drawingCommands = PARAMS.validateParam(PARAMS.ARRAYOFOBJECT,drawingCommands);

	this.clearDrawingCommands();
	for (var i = 0; i < drawingCommands.length; i ++) {
		this.drawingCommands.push(drawingCommands[i]);
	}
}

ImageDrawingBlock.prototype.getDrawingCommands = function() {
	var drawingCommands = new Array();

	for (var i = 0; i < this.drawingCommands.length; i++) {
		if (drawingCommands[i] == undefined) {
			drawingCommands[i] = new Object();
		}
		drawingCommands[i].command = this.drawingCommands[i].command;

		if (this.drawingCommands[i].parameters != undefined) {
			if (drawingCommands[i].parameters == undefined) {
				drawingCommands[i].parameters = new Array();
			}
			for (var j = 0; j < this.drawingCommands[i].parameters.length; j++) {
				drawingCommands[i].parameters[j] = this.drawingCommands[i].parameters[j];
			}
		}
	}

	return drawingCommands;
}

ImageDrawingBlock.prototype.clearDrawingCommands = function() {
	this.drawingCommands.splice(0,this.drawingCommands.length);
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: creates imageData and image objects from the text and font properties
ImageDrawingBlock.prototype.createDrawingData = function() {
	if (this.drawingCommands.length > 0) {
		CANVASMANAGER.workingCanvasFrame.context.save();

		CANVASMANAGER.workingCanvasFrame.resize(this.width,this.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,this.width,this.height);
		this.parseCanvasCommands(CANVASMANAGER.workingCanvasFrame.context,this.drawingCommands);

		CANVASMANAGER.workingCanvasFrame.context.restore();

		//this.textImageData = CANVASMANAGER.workingCanvasFrame.context.getImageData(0,0,this.width,this.height);
		this.canvasImage.src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to perform the undraw operations specified by the user
ImageDrawingBlock.prototype.undraw = function(dest) {
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

			if (this.showDebugDisplay) {
				dest.clearRect(-3,-3,6,6);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in ImageDrawingBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: canvas context where updates may occur
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles text and font updates
ImageDrawingBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	if (this.isMarkedForDestruction) return;

	if (this.hasChangedFromLatestMemory(true)) {
		this.createDrawingData();
	}

	this._setShattered(this.shattered);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to perform the draw operations specified by the user
ImageDrawingBlock.prototype.draw = function(dest) {
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
			
			if (!this._getShattered()) {
				dest.drawImage(this.canvasImage,-this._getWidth()/2,-this._getHeight()/2);
			}

			if (this.showDebugDisplay) {
				dest.save();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this._getHeight()/2);
				dest.stroke();
				dest.closePath();
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
		LOG.write("error in ImageDrawingBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

ImageDrawingBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.drawingCommands.splice(0,this.drawingCommands.length);
		this.drawingCommands = undefined;

		this.shattered = undefined;
		this._setShattered(undefined);

		delete(this.canvasImage);
		this.canvasImage = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}