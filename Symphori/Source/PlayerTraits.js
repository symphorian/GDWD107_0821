var PlayerTraits = function() {
	// LOG.write("PlayerBlock constructor called", LOG.VERBOSE);
	// ActorBlock.call(this);
}

PlayerTraits.prototype = new Traits();

//PlayerBlock.prototype = new ActorBlock();

PlayerTraits.prototype.play = function() {
	throw new Error("Block has learned PlayerTraits, but hasn't implemented the 'play' function.");
}

PlayerTraits.prototype.pause = function() {
	throw new Error("Block has learned PlayerTraits, but hasn't implemented the 'pause' function.");
}

PlayerTraits.prototype.unpause = function() {
	throw new Error("Block has learned PlayerTraits, but hasn't implemented the 'unpause' function.");
}

PlayerTraits.prototype.playPause = function() {
	throw new Error("Block has learned PlayerTraits, but hasn't implemented the 'playPause' function.");
}

PlayerTraits.prototype.stop = function() {
	throw new Error("Block has learned PlayerTraits, but hasn't implemented the 'stop' function.");
}

PlayerTraits.prototype.getVolume = function() {
	throw new Error("Block has learned PlayerTraits, but hasn't implemented the 'getVolume' function.");
}

PlayerTraits.prototype.setVolume = function() {
	throw new Error("Block has learned PlayerTraits, but hasn't implemented the 'setVolume' function.");
}

// PlayerTraits.prototype.destroy = function() {
// 	ActorBlock.prototype.destroy.call(this);
// }

