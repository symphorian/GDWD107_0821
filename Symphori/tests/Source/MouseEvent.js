var MouseEvent = function(eventName) {
	PARAMS.initializeValidation();
	eventName = PARAMS.validateParam(PARAMS.STRING, eventName);
	
	BlockEvent.call(this,eventName);

	this.x = 0;
	this.y = 0;
};

MouseEvent.prototype = new BlockEvent();

MouseEvent.prototype.consumeEvent = function(x,y) {
	PARAMS.initializeValidation();
	x = PARAMS.validateParam(PARAMS.INTEGER, x);
	y = PARAMS.validateParam(PARAMS.INTEGER, y);

	this.x = x;
	this.y = y;
}

MouseEvent.prototype.fireEvent = function(x,y) {
	PARAMS.initializeValidation();
	x = PARAMS.validateParam(PARAMS.INTEGER, x, null);
	y = PARAMS.validateParam(PARAMS.INTEGER, y, null);

	if (x != null) { this.x = x; }
	if (y != null) { this.y = y; }

	this.subscribedBlocks.sort(function(a,b) { return a.globalZ() - b.globalZ(); });
	for (var i = 0; i < this.subscribedBlocks.length; i++) {
		if (this.subscribedBlocks[i][this.reactFunctionName](this)) {
			return;
		}
	}
	for (var i = 0; i < this.subscribedBlocks.length; i++) {
		if (this.subscribedBlocks[i][this.reactFunctionName](this)) {
			return;
		}
	}
}