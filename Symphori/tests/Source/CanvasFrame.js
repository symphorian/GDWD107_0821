var CanvasFrame = function(width, height, zindex) {
	PARAMS.initializeValidation();
	width = PARAMS.validateParam(PARAMS.INTEGER, width);
	height = PARAMS.validateParam(PARAMS.INTEGER, height);
	zindex = PARAMS.validateParam(PARAMS.INTEGER, zindex);

	LOG.write("CanvasFrame constructor called", LOG.VERBOSE);
	this.canvas = document.createElement("canvas");
	this.canvas.setAttribute("style", "position: absolute; left: 0px; top: 0px; z-index:" + zindex)
	/*this.canvas.setAttribute("position", "absolute");
	this.canvas.setAttribute("left", "0px");
	this.canvas.setAttribute("top", "0px");*/
	this.canvas.setAttribute("width", width);
	this.canvas.setAttribute("height", height);
	this.canvas.setAttribute("z-index", zindex);
	this.context = this.canvas.getContext("2d");

	this.masterBlock = new ActorBlock();
	this.masterBlock.width = width;
	this.masterBlock.height = height;
	this.masterBlock.x = width/2;
	this.masterBlock.y = height/2;
	this.masterBlock.identity = "MasterBlock" + zindex;

	this.shouldClearCanvas = false;
}

CanvasFrame.prototype.adoptBlockChild = function(block) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);

	this.masterBlock.adoptChild(block);
}

CanvasFrame.prototype.addBehavior = function(behavior, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	behavior = PARAMS.validateParam(PARAMS.FUNCTION, behavior);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addBehavior(behavior, vars, propagateToChildren);
}

CanvasFrame.prototype.addMouseOverReaction = function(reaction, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addMouseOverReaction(reaction, vars, propagateToChildren);
}

CanvasFrame.prototype.addMouseClickReaction = function(reaction, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addMouseClickReaction(reaction, vars, propagateToChildren);
}

CanvasFrame.prototype.addMouseDownReaction = function(reaction, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addMouseDownReaction(reaction, vars, propagateToChildren);
}

CanvasFrame.prototype.addMouseUpReaction = function(reaction, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addMouseUpReaction(reaction, vars, propagateToChildren);
}

CanvasFrame.prototype.addAnyKeyDownReaction = function(reaction, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addAnyKeyDownReaction(reaction, vars, propagateToChildren);
}

CanvasFrame.prototype.addAnyKeyUpReaction = function(reaction, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addAnyKeyUpReaction(reaction, vars, propagateToChildren);
}

CanvasFrame.prototype.addKeyDownReaction = function(keyCode, reaction, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addKeyDownReaction(keyCode, reaction, vars, propagateToChildren);
}

CanvasFrame.prototype.addKeyUpReaction = function(keyCode, reaction, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addKeyUpReaction(keyCode, reaction, vars, propagateToChildren);
}

CanvasFrame.prototype.addKeyCombinationReaction = function(keyCodes, reaction, vars, propagateToChildren) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.ARRAYOFINTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);
	propagateToChildren = PARAMS.validateParam(PARAMS.BOOLEAN, propagateToChildren, false);

	this.masterBlock.addKeyCombinationReaction(keyCodes, reaction, vars, propagateToChildren);
}

CanvasFrame.prototype.resize = function(width, height, zindex) {
	PARAMS.initializeValidation();
	width = PARAMS.validateParam(PARAMS.INTEGER, width);
	height = PARAMS.validateParam(PARAMS.INTEGER, height);
	zindex = PARAMS.validateParam(PARAMS.INTEGER, zindex);

	if (width != this.masterBlock.width || height != this.masterBlock.height) {

		this.canvas.setAttribute("width", width);
		this.canvas.setAttribute("height", height);
		this.canvas.setAttribute("style", "position: absolute; left: 0px; top: 0px; z-index:" + zindex)
		
		this.context = this.canvas.getContext("2d");
		this.masterBlock.width = width;
		this.masterBlock.height = height;

		this.shouldClearCanvas = true;
		//this.masterBlock.draw(this.context);
	}
}

CanvasFrame.prototype.clearCanvas = function() {
	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
}

CanvasFrame.prototype.refresh = function() {
	if (this.shouldClearCanvas) {
		this.clearCanvas();
		this.shouldClearCanvas = false;
	}
	this.masterBlock.undraw(this.context);
	this.masterBlock.update(this.context);
	this.masterBlock.draw(this.context);
}