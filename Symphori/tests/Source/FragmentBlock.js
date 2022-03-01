// Public Constructor function
// Input parameter(s):  Block capable of being shattered, integer, integer, integer, integer, integer
// Returns: FragmentBlock object instantiated with the specified height and width at the specified home location
// in order to display the image from the provided source Block that implements the Shatterable interface
// Example: var myFB = new FragmentBlock(this,10,10, -100, -50, 0);
var FragmentBlock = function(sourceBlockParam, widthParam, heightParam, homeXParam, homeYParam, homeZParam) {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.BLOCK, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER], arguments);

	LOG.write("FragmentBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	this.sourceBlock = sourceBlockParam;

	var homeX = 0;
	var homeY = 0;
	var homeZ = 0;
	var shattered = false;

	this._getHomeX = function() { return homeX; };
	this._getHomeY = function() { return homeY; };
	this._getHomeZ = function() { return homeZ; };
	this._getShattered = function() { return shattered; };

	this._setHomeX = function(val) { homeX = val; };
	this._setHomeY = function(val) { homeY = val; };
	this._setHomeZ = function(val) { homeZ = val; };
	this._setShattered = function(val) { shattered = val; };

	this.width = widthParam;
	this.height = heightParam;

	this.x = homeXParam;
	this.y = homeYParam;
	this.z = homeZParam;

	this.homeX = homeXParam;
	this.homeY = homeYParam;
	this.homeZ = homeZParam;

	// this.maskMode = "none";

	this.shattered = false;
}

FragmentBlock.prototype = new ActorBlock();

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
FragmentBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.homeX = this._getHomeX();
	memory.homeY = this._getHomeY();
	memory.homeZ = this._getHomeZ();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
FragmentBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.homeX = memory.homeX;
	this.homeY = memory.homeY;
	this.homeZ = memory.homeZ;
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
FragmentBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.homeX == this.homeX && memory.homeY == this.homeY && memory.homeZ == this.homeZ);
	}
}

// Public function
// Input parameters: the new size for the shattered blocks (integer)
// Returns: nothing
// Description: shatters the current block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
FragmentBlock.prototype.shatter = function(newBlockSize) {
	PARAMS.initializeValidation(); 
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);

	if (newBlockSize > this.width || newBlockSize > this.height) {
		LOG.write("Tried to shatter FragmentBlock into blocks of size: " + newBlockSize + ", but FragmentBlock only has a width of " + this.width + ".", LOG.WARN);
		return;
	}
	
	if (!this.shattered) {
		var blockClusterPositions = new Array();
		var maxWidth = this.width;
		var maxHeight = this.height;

		for (var i = 0; i < maxWidth; i += newBlockSize) {
			for (var j = 0; j < maxHeight; j += newBlockSize) {
				blockClusterPositions.push({"x":Math.floor(i - maxWidth/2 + newBlockSize/2), "y":Math.floor(j - maxHeight/2 + newBlockSize/2)});
			}
		}

		for (var i = 0; i < blockClusterPositions.length; i++) {
			var newBlock = new FragmentBlock(this.sourceBlock, newBlockSize, newBlockSize, blockClusterPositions[i].x, blockClusterPositions[i].y, 0);
			newBlock.setMemoryCapacity(this.memoryCapacity);
			
			this.adoptChild(newBlock);
		}

		this.shattered = true;
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes child FragmentBlocks resulting from shatter
FragmentBlock.prototype.unshatter = function() {
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i] instanceof FragmentBlock) {
			this.children[i].destroy();
			this.children.splice(i,1);
			i--;
		}
	}
	this.shattered = false;
}

FragmentBlock.prototype.getCurrentFrameFromSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getCurrentFrameFromSourceBlock) {
			return this.sourceBlock.getCurrentFrameFromSourceBlock();
		}
		else {
			return this.sourceBlock.getCurrentFrame();
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
FragmentBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	if (this.sourceBlock) {
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
			LOG.write("error in FragmentBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
			LOG.writeBlock(this, LOG.ERROR);
			LOG.writeObject(err, LOG.ERROR);
			debugger;
		}
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles frame updates and filter/mask application
FragmentBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	this._setHomeX(this.homeX);
	this._setHomeY(this.homeY);
	this._setHomeZ(this.homeZ);

	this._setShattered(this.shattered);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current frame image after applying necessary transformations
FragmentBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	if (this.sourceBlock) {
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
				

				if (!this.shattered) {
					var currentFrame = this.getCurrentFrameFromSourceBlock();

					if (currentFrame != null) {
						dest.drawImage(currentFrame,
										(this.getWidthInSourceBlock()-this._getWidth()/2)/this.getHorizontalVideoScalingInSourceBlock(),
										(this.getHeightInSourceBlock()-this._getHeight()/2)/this.getVerticalVideoScalingInSourceBlock(),
										this._getWidth()/this.getHorizontalVideoScalingInSourceBlock(),
										this._getHeight()/this.getVerticalVideoScalingInSourceBlock(),
										-this._getWidth()/2,
										-this._getHeight()/2,
										this._getWidth(),
										this._getHeight());
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
			LOG.write("error in FragmentBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
			LOG.writeBlock(this, LOG.ERROR);
			LOG.writeObject(err, LOG.ERROR);
			debugger;
		}
	}
}

FragmentBlock.prototype.getWidthInSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getWidthInSourceBlock) {
			return this.sourceBlock.getWidthInSourceBlock() + this._getHomeX();
		}
		else {
			return this.sourceBlock._getWidth()/2 + this._getHomeX();
		}
	}
	else {
		return this._getWidth()/2;
	}
}

FragmentBlock.prototype.getHeightInSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getHeightInSourceBlock) {
			return this.sourceBlock.getHeightInSourceBlock() + this._getHomeY();
		}
		else {
			return this.sourceBlock._getHeight()/2 + this._getHomeY();
		}
		
	}
	else {
		return this._getHeight()/2;
	}
}

FragmentBlock.prototype.getHorizontalVideoScalingInSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getHorizontalVideoScalingInSourceBlock) {
			return this.sourceBlock.getHorizontalVideoScalingInSourceBlock();
		}
		else if (this.sourceBlock.getHorizontalVideoScaling) {
			return this.sourceBlock.getHorizontalVideoScaling();
		}
		else {
			return 1;
		}
	}
	else {
		return 1;
	}
}

FragmentBlock.prototype.getVerticalVideoScalingInSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getVerticalVideoScalingInSourceBlock) {
			return this.sourceBlock.getVerticalVideoScalingInSourceBlock();
		}
		else if (this.sourceBlock.getVerticalVideoScaling) {
			return this.sourceBlock.getVerticalVideoScaling();
		}
		else {
			return 1;
		}
	}
	else {
		return 1;
	}
}


FragmentBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {

		// this.maskMode = undefined;

		this.sourceBlock = undefined;

		this._setHomeX(undefined);
		this._setHomeY(undefined);
		this._setHomeZ(undefined);

		this.homeX = undefined;
		this.homeY = undefined;
		this.homeZ = undefined;

		this._setShattered(undefined);
		this.shattered = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}