// Public Constructor function
// Input parameter(s):  text (string), font name (string)(default:Verdana), 
//                      font size (integer)(default:12), font color (string/hex)(default:#000/Black), 
//                      text alignment (string:left, center, or right)
// Returns: ImageTextBlock object instantiated with the supplied text and font properties
// Description: utilizes the native canvas textFill function to draw text, and then saves the rasterized text as an image
// Example: var myITB = new ImageTextBlock("Hello world!", "Verdana", 12, "Blue", "left");
var ImageTextBlock = function(textParam, fontParam, sizeParam, colorParam, alignmentParam) {
	PARAMS.initializeValidation();
	textParam = PARAMS.validateParam(PARAMS.STRING, textParam);
	fontParam = PARAMS.validateParam(PARAMS.STRING, fontParam, "Arial, Helvetica, sans-serif");
	sizeParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, sizeParam, 12);
	colorParam = PARAMS.validateParam(PARAMS.STRING, colorParam, "#000");
	alignmentParam = PARAMS.validateParam(PARAMS.STRING, alignmentParam, "center");

	LOG.write("ImageTextBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	var text = "";
	var font = "";
	var size = 0;
	var color = 0;
	var alignment = "";

	this._getText = function() { return text; };
	this._getFont = function() { return font; };
	this._getSize = function() { return size; };
	this._getColor = function() { return color; };
	this._getAlignment = function() { return alignment; };

	this._setText = function(val) { text = val; };
	this._setFont = function(val) { font = val; };
	this._setSize = function(val) { size = val; };
	this._setColor = function(val) { color = val; };
	this._setAlignment = function(val) { 
		switch(val) {
			case "left":
			case "right":
			case "center":
				alignment = val;
		}
	};

	this.text = textParam;
	this.font = fontParam;
	this.size = sizeParam;
	this.color = colorParam;
	
	this.alignment = "center";
	switch (alignmentParam) {
		case "left":
		case "right":
		case "center":
			this.alignment = alignmentParam;
			break;
	}

	//this.textImageData = null;
	this.textImage = new Image();

	this.maskMode = "none";

	this.createTextData();
}

ImageTextBlock.prototype = new ActorBlock();
ImageTextBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
ImageTextBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.text = this._getText();
	memory.font = this._getFont();
	memory.size = this._getSize();
	memory.color = this._getColor();
	memory.alignment = this._getAlignment();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
ImageTextBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.text = memory.text;
	this.font = memory.font;
	this.size = memory.size;
	this.color = memory.color;
	this.alignment = memory.alignment;
}

// Private function
// Input parameters: boolean, whether or not changes in the parent class' properties are checked
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
ImageTextBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
	PARAMS.initializeValidation();
	excludeParentProperties = PARAMS.validateParam(PARAMS.BOOLEAN, excludeParentProperties);

	var memory = this.getLatestMemory();
	if (memory == null) {
		return true;
	}
	else if (excludeParentProperties) {
		return !(memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.alignment == this.alignment && memory.color == this.color);
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.alignment == this.alignment && memory.color == this.color);
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: creates imageData and image objects from the text and font properties
ImageTextBlock.prototype.createTextData = function() {
	LOG.write("creating text data");
	//LOG.write(this.identity + " child of " + this.parent.identity);

	CANVASMANAGER.workingCanvasFrame.context.save();

	CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
	CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
	CANVASMANAGER.workingCanvasFrame.context.textBaseline = 'top';
    CANVASMANAGER.workingCanvasFrame.context.textAlign = 'left';

    // m is an additional buffer in case the font isn't set up properly
    // causing parts of the font to be cut off
    var m = CANVASMANAGER.workingCanvasFrame.context.measureText("M").width;

	this.width = CANVASMANAGER.workingCanvasFrame.context.measureText(this.text).width + m;
	if (this.width == 0) { this.width = 1; }
	var textMetric = TEXTHELPER.measureTextHeight(this.text,this.font,this.size);
	this.height = textMetric.height + 1 + m;

	CANVASMANAGER.workingCanvasFrame.resize(this.width,this.height,-1);

	// since resizing reinitializes the canvas context, we need to reset our text properties
	CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
	CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
	CANVASMANAGER.workingCanvasFrame.context.textBaseline = 'top';
    CANVASMANAGER.workingCanvasFrame.context.textAlign = 'left';

	CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,this.width,this.height);

	CANVASMANAGER.workingCanvasFrame.context.save();
	// for some reason, hidden ascenders and descenders are revealed 
	// when rotation != 0 degrees (depending on zoom)
	CANVASMANAGER.workingCanvasFrame.context.translate(m/2,m/2);
	CANVASMANAGER.workingCanvasFrame.context.rotate(0.1*Math.PI/180);
	

	if (this.text.length > 0) {
		CANVASMANAGER.workingCanvasFrame.context.fillText(this.text, 0, 0);
	}
	else {
		CANVASMANAGER.workingCanvasFrame.context.fillText(" ", 0, 0);
	}

	CANVASMANAGER.workingCanvasFrame.context.restore();
	CANVASMANAGER.workingCanvasFrame.context.restore();

	this.textImage.src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();

}

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the image of text of the current frame, 
// or returns null if no text image can be found
ImageTextBlock.prototype.getCurrentFrame = function() {
	if (this.text && this.textImage) {
		return this.textImage;
	}
	else {
		return null;
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouse event is within the boundaries of an object
// Description: converts coordinates of the mouse event (global coordinates) into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
ImageTextBlock.prototype.isMouseEventWithinBlock = function(e) {
	PARAMS.initializeValidation();
	e = PARAMS.validateParam(PARAMS.MOUSEEVENT, e);

	MATRIX.clearTransformations();

	this.addInverseTransformationsToMatrix(MATRIX);

	var xyResult = MATRIX.applyTransformation(e.x,e.y);

	LOG.writeObject(xyResult);

	// switch (this.alignment) {
	// 	case "center":
			if (xyResult.x > -this.width/2 && xyResult.x < this.width/2 &&
				xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
				return true;
			}
			else {
				return false;
			}
		// 	break;

		// case "left":
		// 	if (xyResult.x > 0 && xyResult.x < this.width &&
		// 		xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
		// 		return true;
		// 	}
		// 	else {
		// 		return false;
		// 	}
		// 	break;

		// case "right":
		// 	if (xyResult.x > -this.width && xyResult.x < 0 &&
		// 		xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
		// 		return true;
		// 	}
		// 	else {
		// 		return false;
		// 	}
		// 	break;
	// }
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's text after applying necessary transformations
ImageTextBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			// switch (this.lastAlignment) {
			// 	case "center":
					originX = this._getWidth()/2;
					originY = this._getHeight()/2;
			// 		break;

			// 	case "left":
			// 		originX = 0;
			// 		originY = this.height/2;
			// 		break;

			// 	case "right":
			// 		originX = this.width;
			// 		originY = this.height/2;
			// 		break;
			// }

			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());				

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			if (!this._getShattered()) {
				dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
			}

			if (this.showDebugDisplay) {
				dest.clearRect(-5,-5,10,10);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in ImageTextBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
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
ImageTextBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	this._setText(this.text);
	this._setFont(this.font);
	this._setSize(this.size);
	this._setColor(this.color);
	this._setAlignment(this.alignment);

	if (this.hasChangedFromLatestMemory(true)) {
		this.createTextData();
	}

	this._setWidth(this.width);
	this._setHeight(this.height);

	this._setShattered(this.shattered);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current text after applying necessary transformations
ImageTextBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			// switch (this.alignment) {
			// 	case "center":
					originX = this._getWidth()/2;
					originY = this._getHeight()/2;
			// 		break;

			// 	case "left":
			// 		originX = 0;
			// 		originY = this.height/2;
			// 		break;

			// 	case "right":
			// 		originX = this.width;
			// 		originY = this.height/2;
			// 		break;
			// }

			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
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
				dest.rect(-originX,-originY,this._getWidth(),this._getHeight());
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
		dest.restore();
		LOG.write("error in ImageTextBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

ImageTextBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {

		this.text = undefined;
		this.font = undefined;
		this.size = undefined;
		this.color = undefined;

		this._setText(undefined);
		this._setFont(undefined);
		this._setSize(undefined);
		this._setColor(undefined);
		this._setAlignment(undefined);

		this.shattered = undefined;
		this._setShattered(undefined);

		delete(this.textImage);
		this.textImage = undefined;

		this.ascent = undefined;
		this.descent = undefined;

		this.maskMode = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}