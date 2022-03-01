// Public Constructor function
// Input parameter(s):  max width, in pixels (integer), text (string, can include newline characters), 
//						font name (string)(default:Verdana), font size (integer)(default:12), 
//						font color (string/hex)(default:#000/Black), text alignment (string:left, center, or right)
// Returns: ParagraphBlock object instantiated with the supplied text and font properties
// Description: utilizes the native canvas textFill function to draw text
// Example: var myPB = new ParagraphBlock(250, "Hello world!\nYou can include new line characters", "Verdana", 12, "Blue", "left");
var ParagraphBlock = function(widthParam, textParam, fontParam, sizeParam, colorParam, alignmentParam, lineSpacingParam) {
	PARAMS.initializeValidation();
	widthParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, widthParam);
	textParam = PARAMS.validateParam(PARAMS.STRING, textParam);
	fontParam = PARAMS.validateParam(PARAMS.STRING, fontParam, "Arial, Helvetica, sans-serif");
	sizeParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, sizeParam, 12);
	colorParam = PARAMS.validateParam(PARAMS.STRING, colorParam, "#000");
	alignmentParam = PARAMS.validateParam(PARAMS.STRING, alignmentParam, "center");
	lineSpacingParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, lineSpacingParam);

	LOG.write("ParagraphBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	var text = "";
	var font = "";
	var size = 0;
	var color = 0;
	var lineSpacing = 0;
	var lineHeight = 0;
	var alignment = "";

	this._getText = function() { return text; };
	this._getFont = function() { return font; };
	this._getSize = function() { return size; };
	this._getColor = function() { return color; };
	this._getLineSpacing = function() { return lineSpacing; };
	this._getLineHeight = function() { return lineHeight; };
	this._getAlignment = function() { return alignment; };

	this._setText = function(val) { text = val; };
	this._setFont = function(val) { font = val; };
	this._setSize = function(val) { size = val; };
	this._setColor = function(val) { color = val; };
	this._setLineSpacing = function(val) { lineSpacing = val; };
	this._setLineHeight = function(val) { lineHeight = val; };
	this._setAlignment = function(val) { 
		switch(val) {
			case "left":
			case "right":
			case "center":
				alignment = val; 
		}
	};

	this.width = widthParam;
	this.lineHeight = 0;
	this.height = 0;

	this.text = textParam;
	this.textFragments = new Array(this.text);

	this.font = fontParam;
	this.size = sizeParam;
	this.color = colorParam;
	this.lineSpacing = lineSpacingParam;

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

ParagraphBlock.prototype = new ActorBlock();

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
ParagraphBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.width = this._getWidth();
	memory.text = this._getText();
	memory.font = this._getFont();
	memory.size = this._getSize();
	memory.color = this._getColor();
	memory.lineSpacing = this._getLineSpacing();
	memory.alignment = this._getAlignment();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
ParagraphBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.width = memory.width;
	this.text = memory.text;
	this.font = memory.font;
	this.size = memory.size;
	this.color = memory.color;
	this.lineSpacing = memory.lineSpacing;
	this.alignment = memory.alignment;
}

// Private function
// Input parameters: boolean, whether or not changes in the parent class' properties are checked
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
ParagraphBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
	PARAMS.initializeValidation();
	excludeParentProperties = PARAMS.validateParam(PARAMS.BOOLEAN, excludeParentProperties);

	var memory = this.getLatestMemory();
	if (memory == null) {
		return true;
	}
	else if (excludeParentProperties) {
		return !(memory.width == this.width && memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.lineSpacing == this.lineSpacing && memory.alignment == this.alignment && memory.color == this.color);
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.width == this.width && memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.lineSpacing == this.lineSpacing && memory.alignment == this.alignment && memory.color == this.color);
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouse event is within the boundaries of an object
// Description: converts coordinates of the mouse event (global coordinates) into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
ParagraphBlock.prototype.isMouseEventWithinBlock = function(e) {
	PARAMS.initializeValidation();
	e = PARAMS.validateParam(PARAMS.MOUSEEVENT, e);

	MATRIX.clearTransformations();

	this.addInverseTransformationsToMatrix(MATRIX);

	var xyResult = MATRIX.applyTransformation(e.x,e.y);

	LOG.writeObject(xyResult);

	switch (this.alignment) {
		case "center":
			if (xyResult.x > -this.width/2 && xyResult.x < this.width/2 &&
				xyResult.y > -this.lineHeight && xyResult.y < this.height - this.lineHeight) {
				return true;
			}
			else {
				return false;
			}
			break;

		case "left":
			if (xyResult.x > 0 && xyResult.x < this.width &&
				xyResult.y > -this.lineHeight && xyResult.y < this.height - this.lineHeight) {
				return true;
			}
			else {
				return false;
			}
			break;

		case "right":
			if (xyResult.x > -this.width && xyResult.x < 0 &&
				xyResult.y > -this.lineHeight && xyResult.y < this.height - this.lineHeight) {
				return true;
			}
			else {
				return false;
			}
			break;
	}
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's text after applying necessary transformations
ParagraphBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(zratio*this._getX());
			drawy = Math.round(zratio*this._getY());				

			dest.save();
			dest.translate(drawx,drawy);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			var originX = 0;
			var originY = 0;

			switch (this._getAlignment()) {
				case "center":
					originX = this._getWidth()/2;
					break;

				case "left":
					originX = 0;
					break;

				case "right":
					originX = this._getWidth();
					break;
			}
			
			dest.clearRect(-originX - 12, -originY - this._getLineHeight() - 1, this._getWidth() + 14, this._getHeight() + 24);

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
		LOG.write("error in ParagraphBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
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
ParagraphBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	if (this.isMarkedForDestruction) return;

	this._setText(this.text);
	this._setFont(this.font);
	this._setSize(this.size);
	this._setColor(this.color);
	this._setLineSpacing(this.lineSpacing);
	this._setAlignment(this.alignment);

	if (this.hasChangedFromLatestMemory(true)) {
		CANVASMANAGER.workingCanvasFrame.context.save();
		CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
		CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
		CANVASMANAGER.workingCanvasFrame.context.fillText(this.text, 0, 0);

		this.textFragments.length = 0;
		this.textFragments[0] = { text: "", width: 0 };
		var currentFragmentIndex = 0;

		var lines = this.text.split("\n");

		for (var l = 0; l < lines.length; l++) {
			var words = lines[l].split(" ");

			for (var i = 0; i < words.length; i++) {
				var newFragment = this.textFragments[currentFragmentIndex].text + words[i];
				var fragmentWidth = CANVASMANAGER.workingCanvasFrame.context.measureText(newFragment).width;

				if (fragmentWidth <= this.width) {
					this.textFragments[currentFragmentIndex].text = newFragment + " ";
					this.textFragments[currentFragmentIndex].width = fragmentWidth;
				}
				else if (newFragment.length == words[i].length) {
					var prevChunk = "";
					for (var j = 0; j < newFragment.length; j++) {
						var newChunk = this.textFragments[currentFragmentIndex].text + newFragment.charAt(j);
						var chunkWidth = CANVASMANAGER.workingCanvasFrame.context.measureText(newChunk).width;
						if (chunkWidth <= this.width) {
							this.textFragments[currentFragmentIndex].text += newFragment.charAt(j);
							this.textFragments[currentFragmentIndex].width = chunkWidth;
						}
						else if (newChunk.length == 1) {
							this.textFragments[currentFragmentIndex].text = newChunk;
							this.textFragments[currentFragmentIndex].width = chunkWidth;
							currentFragmentIndex++;
							this.textFragments[currentFragmentIndex] = { text: "", width: 0 };
						}
						else {
							currentFragmentIndex++;
							this.textFragments[currentFragmentIndex] = { text: "", width: 0 };
							j--;
						}
					}
					if (this.textFragments[currentFragmentIndex].text.length > 0) {
						this.textFragments[currentFragmentIndex].text += " ";
					} 
				}
				else {
					currentFragmentIndex++;
					this.textFragments[currentFragmentIndex] =  { text: "", width: 0 };
					i--;
				}
			}
			currentFragmentIndex++;
			this.textFragments[currentFragmentIndex] =  { text: "", width: 0 };
		}

		if (this.textFragments[currentFragmentIndex].text == "") {
			this.textFragments.pop();
		}

		CANVASMANAGER.workingCanvasFrame.context.restore();

		var metric = TEXTHELPER.measureTextHeight(this.textFragments[0].text,this.font,this.size);
		this.lineHeight = metric.height;
		this.ascent = metric.ascent;
		this.descent = metric.descent;

		if (this.lineHeight == 0) { this.lineHeight = 1; }	

		this._setLineHeight(this.lineHeight);

		// m is an additional buffer in case the font isn't set up properly
		// causing parts of the font to be cut off
		var m = CANVASMANAGER.workingCanvasFrame.context.measureText("M").width;
		this.height = this.textFragments.length * this.lineHeight + (this.textFragments.length - 1) * this.lineSpacing + m;
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
ParagraphBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);
	
	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(zratio*this._getX());
			drawy = Math.round(zratio*this._getY());

			dest.save();
			dest.translate(drawx,drawy);
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

			var originX = 0;
			var originY = 0;

			for (var i = 0; i < this.textFragments.length; i++) {

				switch (this._getAlignment()) {
					case "center":
						originX = this.textFragments[i].width/2;
						break;

					case "left":
						originX = 0;
						break;

					case "right":
						originX = this.textFragments[i].width;
						break;
				}

				dest.fillText(this.textFragments[i].text, -originX, originY);
				originY += this._getLineHeight() + this._getLineSpacing();
			}

			if (this.showDebugDisplay) {
				dest.save();
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				var ox = 0;
				switch(this._getAlignment()) {
					case "center":
						ox = this._getWidth()/2;
						break;

					case "left":
						ox = 0;
						break;

					case "right":
						ox = this._getWidth();
						break;
				}
				dest.rect(-ox, -this._getLineHeight(), this._getWidth(), this._getHeight());
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
		LOG.write("error in ParagraphBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

ParagraphBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {

		this.text = undefined;
		this.font = undefined;
		this.size = undefined;
		this.color = undefined;
		this.lineHeight = undefined;
		this.lineSpacing = undefined;

		this.textFragments.splice(0,this.textFragments.length);
		this.textFragments = undefined;

		this._setText(undefined);
		this._setFont(undefined);
		this._setSize(undefined);
		this._setColor(undefined);
		this._setAlignment(undefined);
		this._setLineHeight(undefined);
		this._setLineSpacing(undefined);

		this.ascent = undefined;
		this.descent = undefined;

		this.maskMode = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}