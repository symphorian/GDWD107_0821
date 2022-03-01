var Block = function () {
	this.identity = null;

	var x = 0;
	var y = 0;
	var z = 0;

	var width = 0;
	var height = 0;

	var scaleX = 1;
	var scaleY = 1;

	var rotation = 0;

	var visible = true;

	this._getX = function() { return x; };
	this._getY = function() { return y; };
	this._getZ = function() { return z; };

	this._getWidth = function() { return width; };
	this._getHeight = function() { return height; };

	this._getScaleX = function() { return scaleX; };
	this._getScaleY = function() { return scaleY; };

	this._getRotation = function() { return rotation; };

	this._getVisible = function() { return visible; };

	this._setX = function(val) { x = val; };
	this._setY = function(val) { y = val; };
	this._setZ = function(val) { z = val; };

	this._setWidth = function(val) { width = val; };
	this._setHeight = function(val) { height = val; };

	this._setScaleX = function(val) { scaleX = val; };
	this._setScaleY = function(val) { scaleY = val; };

	this._setRotation = function(val) { rotation = val; };

	this._setVisible = function(val) { visible = val; };

	this.x = x;
	this.y = y;
	this.z = z;

	this.width = width;
	this.height = height;

	this.scaleX = scaleX;
	this.scaleY = scaleY;

	this.rotation = rotation;

	this.visible = visible;

	this.parent = null;
	this.children = new Array();

	this.showDebugDisplay = false;

	this.initialized = false;

	this.isMarkedForDestruction = false;

	if (this.traits) {
		for (var i = 0; i < this.traits.length; i++) {
			COMMON.extendInternalProperties(new this.traits[i](), this);
		}
	}
};

Block.prototype.learn = function(traits) {
	PARAMS.initializeValidation();
	traits = PARAMS.validateParam(PARAMS.TRAITS, traits);

	COMMON.extend(new traits(), this);
	if (!this.traits) {
		this.traits = [];
	}
	this.traits.push(traits);
}

Block.prototype.globalX = function() {
	if (this.parent == null) {
		return 0;
	}
	else {
		return this.parent.globalX()+this.x;
	}
}

Block.prototype.globalY = function() {
	if (this.parent == null) {
		return 0;
	}
	else {
		return this.parent.globalY()+this.y;
	}
}

Block.prototype.globalZ = function() {
	if (this.parent == null) {
		return 0;
	}
	else {
		return this.parent.globalZ()+this.z;
	}
}

Block.prototype.globalScaleX = function() {
	if (this.parent == null) {
		return 0;
	}
	else {
		return this.parent.globalScaleX()+this.scaleX;
	}
}

Block.prototype.globalScaleY = function() {
	if (this.parent == null) {
		return 0;
	}
	else {
		return this.parent.globalScaleY()+this.scaleY;
	}
}

Block.prototype.adoptChild = function(childBlock) {
	if (childBlock.parent != null) {
		childBlock.parent.orphanChild(childBlock);
	}
	this.children.push(childBlock);
	childBlock.parent = this;

	if (childBlock.identity == null) {
		childBlock.identity = "Block" + CANVASMANAGER.getIdentityNumber();
		LOG.write("Child " + childBlock.identity + " adopted by " + this.identity, LOG.VERBOSE);
	}
}

Block.prototype.orphanChild = function(childBlock) {
	var orphanIndex = this.children.indexOf(childBlock);

	if (orphanIndex >= 0) {
		this.children.splice(orphanIndex,1);
	}

}

Block.prototype.toggleDebugDisplay = function(propagateToChildren) {
	this.showDebugDisplay = !this.showDebugDisplay;
	if (propagateToChildren != undefined && propagateToChildren) {
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].showDebugDisplay = this.showDebugDisplay;
		}
	}
}

Block.prototype.getZRatio = function() {
	var zscale = 2*Math.tan(CANVASMANAGER.fov*(Math.PI/180)/2)
	var zratio = 1
	if ((this._getZ() + zscale) != 0) {
		zratio = 1 / ((this._getZ() + zscale) / zscale);
	} 
	return zratio;
}

Block.prototype.undraw = function(dest) {
	if (this._getVisible()) {
		var zratio = this.getZRatio();

		drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
		drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

		dest.save();
		dest.translate(drawx + this._getWidth()/2 - 1,drawy+this._getHeight()/2 - 1);
		dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
		dest.rotate(this._getRotation()*Math.PI/180);

		//dest.clearRect(-this.width/2, -this.height/2, this.width + 2/(zratio*this.scaleX), this.height + 2/(zratio*this.scaleY));

		for (var i = 0; i < this.children.length; i++) {
			this.children[i].undraw(dest);
		}

		dest.restore();
	}
};

Block.prototype.update = function() {
	this._setX(this.x);
	this._setY(this.y);
	this._setZ(this.z);

	this._setWidth(this.width);
	this._setHeight(this.height);

	this._setScaleX(this.scaleX);
	this._setScaleY(this.scaleY);

	this._setRotation(this.rotation);

	this._setVisible(this.visible);

	if (this.isMarkedForDestruction) {
		this.destroy();
	}
}

Block.prototype.draw = function(dest) {
	if (this._getVisible()) {
		var zratio = this.getZRatio();

		drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
		drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

		dest.save();
		dest.translate(drawx + this._getWidth()/2 - 1,drawy+this._getHeight()/2 - 1);
		dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
		dest.rotate(this._getRotation()*Math.PI/180);

		this.children.sort(function(a,b) { return b.z - a.z });
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].draw(dest);
		}
		
		dest.restore();
	}
};

Block.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.identity = undefined;

		this._setX(undefined);
		this._setY(undefined);
		this._setZ(undefined);

		this._setWidth(undefined);
		this._setHeight(undefined);

		this._setScaleX(undefined);
		this._setScaleY(undefined);

		this._setRotation(undefined);

		this._setVisible(undefined);

		this.x = undefined;
		this.y = undefined;
		this.z = undefined;

		this.width = undefined;
		this.height = undefined;

		this.scaleX = undefined;
		this.scaleY = undefined;

		this.rotation = undefined;

		this.visible = undefined;

		for (var i = 0; i < this.children.length; i++) {
			this.children[i].destroy();
		}
		this.children.splice(0,this.children.length);
		//this.children = undefined;

		this.showDebugDisplay = undefined;

		this.parent.orphanChild(this);

		this.parent = undefined;
	}
	else {
		this.isMarkedForDestruction = true;
	}
}