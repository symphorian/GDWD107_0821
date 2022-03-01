var BlockEvent = function(eventName) {
	PARAMS.initializeValidation();
	eventName = PARAMS.validateParam(PARAMS.STRING, eventName);

	this.subscribedBlocks = new Array();
	this.eventName = eventName;
	this.reactFunctionName = "reactTo" + eventName;
}

BlockEvent.prototype.fireEvent = function() {
	for (var i = 0; i < this.subscribedBlocks.length; i++) {
		this.subscribedBlocks[i][this.reactFunctionName](this);
	}
}

BlockEvent.prototype.subscribe = function(block) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);

	if (this.subscribedBlocks.indexOf(block) == -1) {
		this.subscribedBlocks.push(block);
	}
	LOG.write("# of subscriptions:" + this.subscribedBlocks.length, LOG.VERBOSE);
}

BlockEvent.prototype.unsubscribe = function(block) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);

	var index = this.subscribedBlocks.indexOf(block);
	if (index > -1) {
		this.subscribedBlocks.splice(index, 1);
	}
}

BlockEvent.prototype.unsubscribeAll = function() {
	this.subscribedBlocks.splice(0, this.subscribedBlocks.length);
}

