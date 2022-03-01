// Public Constructor function
// Input parameter(s):  text (string), font name (string)(default:Verdana), 
//                      font size (integer)(default:12), font color (string/hex)(default:#000/Black), 
//                      text alignment (string:left, center, or right)
// Returns: TextBlock object instantiated with the supplied text and font properties
// Description: utilizes the native canvas textFill function to draw text
// Example: var myTB = new TextBlock("Hello world!", "Verdana", 12, "Blue", "left");
var TextBlock = function(textParam, fontParam, sizeParam, colorParam, alignmentParam) {
	PARAMS.initializeValidation();
	textParam = PARAMS.validateParam(PARAMS.STRING, textParam);
	fontParam = PARAMS.validateParam(PARAMS.STRING, fontParam, "Arial, Helvetica, sans-serif");
	sizeParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, sizeParam, 12);
	colorParam = PARAMS.validateParam(PARAMS.STRING, colorParam, "#000");
	alignmentParam = PARAMS.validateParam(PARAMS.STRING, alignmentParam, "center");

	LOG.write("TextBlock constructor called", LOG.VERBOSE);
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

	this.ascent = 0;
	this.descent = 0;
	
	this.maskMode = "none";
}

TextBlock.prototype = new ActorBlock();

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
TextBlock.prototype.recordMemory = function() {
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
TextBlock.prototype.changeMemoryIntoReality = function(memory) {
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
TextBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
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
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouse event is within the boundaries of an object
// Description: converts coordinates of the mouse event (global coordinates) into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
TextBlock.prototype.isMouseEventWithinBlock = function(e) {
	PARAMS.initializeValidation();
	e = PARAMS.validateParam(PARAMS.MOUSEEVENT, e);

	MATRIX.clearTransformations();

	this.addInverseTransformationsToMatrix(MATRIX);

	var xyResult = MATRIX.applyTransformation(e.x,e.y);

	LOG.writeObject(xyResult);

	switch (this._getAlignment()) {
		case "center":
			if (xyResult.x > -this.width/2 && xyResult.x < this.width/2 &&
				xyResult.y > -this.ascent && xyResult.y < this.height - this.ascent) {
				return true;
			}
			else {
				return false;
			}
			break;

		case "left":
			if (xyResult.x > 0 && xyResult.x < this.width &&
				xyResult.y > -this.ascent && xyResult.y < this.height - this.ascent) {
				return true;
			}
			else {
				return false;
			}
			break;

		case "right":
			if (xyResult.x > -this.width && xyResult.x < 0 &&
				xyResult.y > -this.ascent && xyResult.y < this.height - this.ascent) {
				return true;
			}
			else {
				return false;
			}
			break;
	}
}

// // Public function
// // Input parameters: string
// // Returns: nothing
// // Description: sets the text property of the TextBlock object
// TextBlock.prototype.setText = function(newText) {
// 	PARAMS.initializeValidation();
// 	newText = PARAMS.validateParam(PARAMS.STRING, newText);

// 	this.text = newText;
// }

// // Public function
// // Input parameters: string (left, center, right)
// // Returns: nothing
// // Description: sets the alignment property of the TextBlock object
// TextBlock.prototype.setAlignment = function(newAlignment) {
// 	PARAMS.initializeValidation();
// 	newAlignment = PARAMS.validateParam(PARAMS.STRING, newAlignment);

// 	switch (newAlignment) {
// 		case "left":
// 		case "right":
// 		case "center":
// 			this.alignment = newAlignment;
// 			break;
// 	}
// }

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's text after applying necessary transformations
TextBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			switch (this._getAlignment()) {
				case "center":
					originX = this._getWidth()/2;
					originY = 0;
					break;

				case "left":
					originX = 0;
					originY = 0;
					break;

				case "right":
					originX = this._getWidth();
					originY = 0;
					break;
			}

			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());				

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);
			
			dest.clearRect(-originX - 12, -originY - this.ascent - 10, this._getWidth() + 14, this._getHeight() + 24);

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
		LOG.write("error in TextBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
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
TextBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	this._setText(this.text);
	this._setFont(this.font);
	this._setSize(this.size);
	this._setColor(this.color);
	this._setAlignment(this.alignment); 

	if (this.hasChangedFromLatestMemory(true)) {
		CANVASMANAGER.workingCanvasFrame.context.save();
		CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
		CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
		CANVASMANAGER.workingCanvasFrame.context.fillText(this.text, 0, 0);
		this.width = CANVASMANAGER.workingCanvasFrame.context.measureText(this.text).width;
		CANVASMANAGER.workingCanvasFrame.context.restore();

		var metric = TEXTHELPER.measureTextHeight(this.text,this.font,this.size);
		this.height = metric.height;
		this.ascent = metric.ascent;
		this.descent = metric.descent;
	}

	if (this.width == 0) { this.width = 1; }
	if (this.height ==0) { this.height = 1; }

	this._setWidth(this.width);
	this._setHeight(this.height);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current text after applying necessary transformations
TextBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);
	
	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			switch (this._getAlignment()) {
				case "center":
					originX = this._getWidth()/2;
					originY = 0;
					break;

				case "left":
					originX = 0;
					originY = 0;
					break;

				case "right":
					originX = this._getWidth();
					originY = 0;
					break;
			}

			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			// for some reason, hidden ascenders and descenders are revealed 
			// when rotation != 0 degrees (depending on zoom)
			dest.rotate((this._getRotation()+0.019)*Math.PI/180);  
			
			//dest.drawImage(this.textImage,-originX,-originY);

			switch(this.maskMode) {
				case "window":
					dest.globalCompositeOperation = "destination-in";
				break;

				case "wall":
					dest.globalCompositeOperation = "destination-out";
				break;
			}

			dest.font = this._getSize() + "px " + this._getFont();
			dest.fillStyle = this._getColor();
			dest.fillText(this._getText(), -originX, -originY);

			if (this.showDebugDisplay) {
				dest.save();
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				dest.rect(-originX, -originY - this.ascent, this._getWidth(), this._getHeight());
				dest.stroke();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this.ascent);
				dest.stroke();
				dest.fillStyle = "Red";
				dest.fillRect(-2,-2,4,4);
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
		LOG.write("error in TextBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

TextBlock.prototype.destroy = function() {
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

		this.ascent = undefined;
		this.descent = undefined;

		this.maskMode = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}