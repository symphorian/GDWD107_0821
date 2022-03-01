var PlayerBlock = function() {
	LOG.write("PlayerBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);
}

PlayerBlock.prototype = new ActorBlock();

PlayerBlock.prototype.play = function() {

}

PlayerBlock.prototype.pause = function() {

}

PlayerBlock.prototype.unpause = function() {

}

PlayerBlock.prototype.playPause = function() {

}

PlayerBlock.prototype.stop = function() {

}

PlayerBlock.prototype.getVolume = function() {

}

PlayerBlock.prototype.setVolume = function() {

}

PlayerBlock.prototype.destroy = function() {
	ActorBlock.prototype.destroy.call(this);
}

