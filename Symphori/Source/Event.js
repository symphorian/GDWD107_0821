var Event = function() {
	this.subscribedFunctions = new Array();
}

Event.prototype.fireEvent = function() {
	for (var i = 0; i < this.subscribedFunctions.length; i++) {
		this.subscribedFunctions[i](this);
	}
}

Event.prototype.subscribe = function(func) {
	PARAMS.initializeValidation();
	func = PARAMS.validateParam(PARAMS.FUNCTION, func);

	if (this.subscribedFunctions.indexOf(func) == -1) {
		this.subscribedFunctions.push(func);
	}
	LOG.write("# of subscriptions:" + this.subscribedFunctions.length, LOG.VERBOSE);
}

Event.prototype.unsubscribe = function(func) {
	PARAMS.initializeValidation();
	func = PARAMS.validateParam(PARAMS.FUNCTION, func);
	
	var index = this.subscribedFunctions.indexOf(func);
	if (index > -1) {
		this.subscribedFunctions.splice(index, 1);
	}
}

Event.prototype.unsubscribeAll = function() {
	this.subscribedFunctions.splice(0, this.subscribedFunctions.length);
}

