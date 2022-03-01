var ShatterTraits = function() {
	var shattered = false;
	var counter = 0;

	this._getShattered = function() { return shattered; };
	this._setShattered = function(val) { 
		shattered = val; 
		counter++;
	};

	this.shattered = shattered;
}

ShatterTraits.prototype = new Traits();

ShatterTraits.prototype.getCurrentFrame = function() {
	throw new Error("Block has learned ShatterTraits, but hasn't implemented the 'getCurrentFrame' function.");
}

// Public function
// Input parameters: the new size for the shattered blocks (integer), width of source image (integer), height of source image (integer)
// Returns: nothing
// Description: shatters the source block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
ShatterTraits.prototype.shatter = function(newBlockSize, maxWidth, maxHeight) {
	PARAMS.initializeValidation();
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);
	maxWidth = PARAMS.validateParam(PARAMS.INTEGER, maxWidth, this.width);
	maxHeight = PARAMS.validateParam(PARAMS.INTEGER, maxHeight, this.height);
	
	if (!this.shattered) {
		var blockClusterPositions = new Array();

		var blockIndex = 0;
		for (var i = 0; i < maxWidth; i += newBlockSize) {
			for (var j = 0; j < maxHeight; j += newBlockSize) {
				if (blockClusterPositions[blockIndex] == undefined) {
					blockClusterPositions[blockIndex] = {"x":Math.floor(i - maxWidth/2 + newBlockSize/2), "y":Math.floor(j - maxHeight/2 + newBlockSize/2)};
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
ShatterTraits.prototype.unshatter = function() {
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i] instanceof FragmentBlock) {
			this.children[i].destroy();
			this.children.splice(i,1);
			i--;
		}
	}
	this.shattered = false;
}