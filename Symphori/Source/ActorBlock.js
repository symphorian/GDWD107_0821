// Public Constructor function
// Input parameter(s):  none
// Returns: ActorBlock object
// Description: Inherited class for any block object that uses behaviors, constraints, reactions, and memories
var ActorBlock = function () {
	LOG.write("ActorBlock constructor called", LOG.VERBOSE);
	var that = this;
	Block.call(this);

	this.xvel = 0;
	this.yvel = 0;
	this.zvel = 0;

	this.xacc = 0;
	this.yacc = 0;
	this.zacc = 0;

	this.rotationVel = 0;
	this.rotationAcc = 0;

	this.behaviors = new Array();
	this.behaviorVars = new Object();

	this.constraints = new Array();
	this.constraintVars = new Object();

	this.isMouseOver = false;
	this.mouseMoveReactions = new Array();
	this.mouseOverReactions = new Array();
	this.mouseOutReactions = new Array();
	this.mouseClickReactions = new Array();
	this.mouseDownReactions = new Array();
	this.mouseUpReactions = new Array();

	this.keyPressReactions = new Object();
	this.keyDownReactions = new Object();
	this.keyUpReactions = new Object();

	this.reactionVars = new Object();

	// this.isSubscribedToMouseMove = false;
	// this.isSubscribedToMouseClick = false;
	// this.isSubscribedToMouseDown = false;
	// this.isSubscribedToMouseUp = false;

	// this.keysPressedSubscribedTo = new Array();
	// this.keysDownSubscribedTo = new Array();
	// this.keysUpSubscribedTo = new Array();

	this.awake = true;
	this.memoryCapacity = 1;
	this.oldestMemoryIndex = 0;
	this.currentMemoryIndex = 0;

	this.memories = new Array(new Memory());

	this.shattered = false;
	// this.shatteredParent = null;
}

ActorBlock.prototype = new Block();

// Public function
// Input parameters: none
// Returns: nothing
// Description: puts the object to sleep (stops behavior updates)
ActorBlock.prototype.sleep = function() {
	this.awake = false;
	this.currentMemoryIndex = this.oldestMemoryIndex - 1;

	if (this.currentMemoryIndex < 0) {
		this.currentMemoryIndex += this.memoryCapacity;
	}

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].sleep();
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: wakes up the object (restarts behavior updates)
ActorBlock.prototype.wake = function() {
	this.awake = true;

	var currentMemoryIndex = this.currentMemoryIndex + 1;
	if (currentMemoryIndex >= this.memoryCapacity) {
		currentMemoryIndex -= this.memoryCapacity;
	}
	while (currentMemoryIndex != this.oldestMemoryIndex) {
		this.forgetMemory(this.memories[currentMemoryIndex]);

		currentMemoryIndex++;
		if (currentMemoryIndex >= this.memoryCapacity) {
			currentMemoryIndex -= this.memoryCapacity;
		}
	}

	this.oldestMemoryIndex = this.currentMemoryIndex + 1;
	if (this.oldestMemoryIndex >= this.memoryCapacity) {
		this.oldestMemoryIndex -= this.memoryCapacity;
	}

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].wake();
	}
}


// Private function
// Input parameters: memory to forget
// Returns: nothing
// Description: replaces all memory properties with null values
ActorBlock.prototype.forgetMemory = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	memory.x = null;
	memory.y = null;
	memory.z = null;
	memory.xvel = null;
	memory.yvel = null;
	memory.zvel = null;
	memory.xacc = null;
	memory.yacc = null;
	memory.zacc = null;
	memory.rotation = null;
	memory.rotationVel = null;
	memory.rotationAcc = null;
}

// Private function
// Input parameters: memory to check
// Returns: boolean
// Description: checks if the memory object has been cleared of its properties
// (if x is null, then all the properties must be null as well)
ActorBlock.prototype.isMemoryForgotten = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	return memory.x == null;
}

// TODO(?): currentMemoryIndex is not what you think, fix how you use it

// Public function
// Input parameters: integer (the number of memories to retain)
// Returns: nothing
// Description: clears all current memories and sets the maximum memory capacity
ActorBlock.prototype.setMemoryCapacity = function(memCap) {
	PARAMS.initializeValidation();
	memCap = PARAMS.validateParam(PARAMS.INTEGER, memCap);

	if (memCap > 0) {
		//this.memories.splice(0,this.memories.length);
		this.memoryCapacity = memCap;
		this.oldestMemoryIndex = 0;

		for (var i = 0; i < this.memoryCapacity; i++) {
			if (this.memories[i] == null) {
				this.memories[i] = new Memory();
			}
			else {
				this.forgetMemory(this.memories[i]);
			}
		}
	}
}


// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: Records this object's rememberable properties into the next available space in memory
ActorBlock.prototype.recordMemory = function() {
	var memory = this.memories[this.oldestMemoryIndex];

	memory.x = this._getX();
	memory.y = this._getY();
	memory.z = this._getZ();
	memory.xvel = this.xvel;
	memory.yvel = this.yvel;
	memory.zvel = this.zvel;
	memory.xacc = this.xacc;
	memory.yacc = this.yacc;
	memory.zacc = this.zacc;
	memory.rotation = this._getRotation();
	memory.rotationVel = this.rotationVel;
	memory.rotationAcc = this.rotationAcc;

	return memory;
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: records the current state of the block object into a memory, advances the oldest memory index
ActorBlock.prototype.updateMemory = function() {
	if (this.initialized) {
		this.recordMemory();
		this.oldestMemoryIndex++;
		if (this.oldestMemoryIndex >= this.memoryCapacity) {
			this.oldestMemoryIndex = 0;
		}
	}
	else {
		this.initialized = true;
	}
}

// Private function
// Input parameters: the memory with the properties to imprint onto this object
// Returns: nothing
// Description: Alters this object's properties to match the properties in the input memory
ActorBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	this.x = memory.x;
	this.y = memory.y;
	this.z = memory.z;
	this.xvel = memory.xvel;
	this.yvel = memory.yvel;
	this.zvel = memory.zvel;
	this.xacc = memory.xacc;
	this.yacc = memory.yacc;
	this.zacc = memory.zacc;
	this.rotation = memory.rotation;
	this.rotationVel = memory.rotationVel;
	this.rotationAcc = memory.rotationAcc;
}

// Public/Private function (?)
// Input parameters: memory index to set as current
// Returns: nothing
// Description: Sets the current memory index as the input parameter
ActorBlock.prototype.setCurrentMemoryIndex = function(index) {
	PARAMS.initializeValidation();
	index = PARAMS.validateParam(PARAMS.INTEGER, index);

	this.currentMemoryIndex = index;
}

// Private function
// Input parameters: integer for the nth memory from the most recent memory
// Returns: nth memory from the most recent memory (by decreasing memory index from current memory index)
ActorBlock.prototype.getNthLatestMemory = function(n) {
	PARAMS.initializeValidation();
	n = PARAMS.validateParam(PARAMS.INTEGER, n);

	if (n >= 0 && n < this.memoryCapacity) {
		var nthNewestMemoryIndex = this.oldestMemoryIndex - 1 - n;
		if (nthNewestMemoryIndex < 0) {
			nthNewestMemoryIndex += this.memoryCapacity;
		}

		var memory = this.memories[nthNewestMemoryIndex];

		while(this.isMemoryForgotten(memory) && nthNewestMemoryIndex != this.oldestMemoryIndex) {
			nthNewestMemoryIndex--;
			if (nthNewestMemoryIndex < 0) {
				nthNewestMemoryIndex += this.memoryCapacity;
			}
			memory = this.memories[nthNewestMemoryIndex];
		}

		if (this.isMemoryForgotten(memory)) {
			return null;
		}
		else {
			return memory;
		}
	}
	else {
		return null;
	}
}

// Private function
// Input parameters: none
// Returns: the most recent memory
ActorBlock.prototype.getLatestMemory = function() {
	return this.getNthLatestMemory(0);
}

// Private function
// Input parameters: integer for the nth memory from the oldest memory
// Returns: nth memory from the oldest memory (by increasing memory index from current memory index)
ActorBlock.prototype.getNthEarliestMemory = function(n) {
	PARAMS.initializeValidation();
	n = PARAMS.validateParam(PARAMS.INTEGER, n);

	if (n >= 0 && n < this.memoryCapacity) {
		var nthOldestMemoryIndex = this.oldestMemoryIndex + n;
		if (nthOldestMemoryIndex >= this.memoryCapacity) {
			nthOldestMemoryIndex -= this.memoryCapacity;
		}

		var memory = this.memories[nthOldestMemoryIndex];
		
		while(this.isMemoryForgotten(memory) && nthOldestMemoryIndex != this.oldestMemoryIndex - 1) {
			nthOldestMemoryIndex++;
			if (nthOldestMemoryIndex >= this.memoryCapacity) {
				nthOldestMemoryIndex -= this.memoryCapacity;
			}
			memory = this.memories[nthOldestMemoryIndex];
		}

		if (this.isMemoryForgotten(memory)) {
			return null;
		}
		else {
			return memory;
		}
	}
	else {
		return null;
	}
}

// Private function
// Input parameters: none
// Returns: the oldest memory 
ActorBlock.prototype.getEarliestMemory = function() {
	return this.getNthEarliestMemory(0);
}

// Public function
// Input parameters: none
// Returns: one memory later than the current one being remembered
// Description: used to iterate forward through an object's chain of memories while object is not awake
ActorBlock.prototype.recallLaterMemory = function() {
	if (!this.awake || this.currentMemoryIndex != this.oldestMemoryIndex - 1) {

		var laterMemoryIndex = this.currentMemoryIndex;
		laterMemoryIndex++;
		
		if (laterMemoryIndex >= this.memoryCapacity) {
			laterMemoryIndex -= this.memoryCapacity;
		}

		
		var memory = this.memories[laterMemoryIndex];

		while(this.isMemoryForgotten(memory) && laterMemoryIndex != this.oldestMemoryIndex - 1) {
			laterMemoryIndex++;
			if (laterMemoryIndex >= this.memoryCapacity) {
				laterMemoryIndex -= this.memoryCapacity;
			}
			memory = this.memories[laterMemoryIndex];
		}

		for (var i = 0; i < this.children.length; i++) {
			this.children[i].recallLaterMemory();
		}

		if (this.isMemoryForgotten(memory)) {
			return null;
		}
		else {
			this.currentMemoryIndex = laterMemoryIndex;
			return memory;
		}
	}
	else {
		return null;
	}
}


// Public function
// Input parameters: none
// Returns: one memory earlier than the current one being remembered
// Description: used to iterate backward through an object's chain of memories
ActorBlock.prototype.recallEarlierMemory = function() {
	if (!this.awake || this.currentMemoryIndex != this.oldestMemoryIndex) {

		var earlierMemoryIndex = this.currentMemoryIndex;
		earlierMemoryIndex--;

		if (earlierMemoryIndex < 0) {
			earlierMemoryIndex += this.memoryCapacity;
		}

		
		var memory = this.memories[earlierMemoryIndex];

		while(this.isMemoryForgotten(memory) && earlierMemoryIndex != this.oldestMemoryIndex) {
			earlierMemoryIndex--;
			if (earlierMemoryIndex < 0) {
				earlierMemoryIndex += this.memoryCapacity;
			}
			
			memory = this.memories[earlierMemoryIndex];
		}

		for (var i = 0; i < this.children.length; i++) {
			this.children[i].recallEarlierMemory();
		}

		if (this.isMemoryForgotten(memory)) {
			return null;
		}
		else {
			this.currentMemoryIndex = earlierMemoryIndex;
			return memory;
		}
	}
	else {
		return null;
	}
}

// Private function
// Input parameters: none
// Returns: Boolean, whether or not the current object state has changed from the last memory
ActorBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return !(memory.x == this.x && memory.y == this.y && memory.z == this.z && memory.xvel == this.xvel && memory.yvel == this.yvel && memory.zvel == this.zvel && memory.xacc == this.xacc && memory.yacc == this.yacc && memory.zacc == this.zacc && memory.rotation == this.rotation && memory.rotationVel == this.rotationVel && memory.rotationAcc == this.rotationAcc);
	}
}

// Private function
// Input parameters: none
// Returns: Boolean, whether or not the current object position has changed from the last memory
ActorBlock.prototype.hasPositionChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return !(memory.x == this.x && memory.y == this.y && memory.z == this.z && memory.rotation == this.rotation);
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: if the object is awake, this function records an object's current state as a memory, 
// runs its behaviors, and applies its constraints
ActorBlock.prototype.update = function() {
	if (this.awake) {
		this.updateMemory();

		for (var i = 0; i < this.behaviors.length; i++) {
			this.behaviors[i](this);
		}

		for (var i = 0; i < this.constraints.length; i++) {
			this.constraints[i](this);
		}
	}
	else {
		if (this.currentMemoryIndex >= 0 && this.currentMemoryIndex < this.memoryCapacity) {
			var currentMemory = this.memories[this.currentMemoryIndex];
			if (currentMemory != null) {
				this.changeMemoryIntoReality(currentMemory);
			}
		}
	}

	Block.prototype.update.call(this);

	if (!this.isMarkedForDestruction) {
		for (var i = 0; i < this.children.length; i++) {
			var childDestroyed = false;
			if (this.children[i].isMarkedForDestruction) {
				childDestroyed = true;
			}
			this.children[i].update();
			if (childDestroyed) {
				i--;
			}
		}
	}

	// if (this.isMarkedForDestruction) {
	// 	this.destroy();
	// }

	// why did we do this?
	// this.x = Math.round(this.x); 
	// this.y = Math.round(this.y);
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: add a behavior to an object, with optional variables associated with it
// Example: myblockCluster.addBehavior(animate, {framesPerImage:2, frameRate:30});
ActorBlock.prototype.addBehavior = function (behavior, vars) {
	PARAMS.initializeValidation();
	behavior = PARAMS.validateParam(PARAMS.FUNCTION, behavior);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	var behaviorName = behavior.behaviorName;
	if (!behaviorName) {
		behaviorName = COMMON.getFunctionName(behavior);
	}

	var index = -1;
	for (var i = 0; i < this.behaviors.length; i++) {
		if (behaviorName == this.behaviors[i].behaviorName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundBehavior = behavior.bind(vars);
		boundBehavior.behaviorName = behaviorName;
		this.behaviors.push(boundBehavior);
		if (vars != undefined) {
			this.behaviorVars[behaviorName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: add a behavior to an object's children, with optional variables associated with it
// Example: myblockCluster.addBehaviorToChildren(animate, {framesPerImage:2, frameRate:30});
ActorBlock.prototype.addBehaviorToChildren = function (behavior, vars) {
	PARAMS.initializeValidation();
	behavior = PARAMS.validateParam(PARAMS.FUNCTION, behavior);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addBehavior(behavior, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a behavior from an object, including behavior variables
// Example: myblockCluster.removeBehavior(animate);
ActorBlock.prototype.removeBehavior = function (behavior) {
	PARAMS.initializeValidation();
	behavior = PARAMS.validateParam(PARAMS.FUNCTION, behavior);

	var behaviorName = behavior.behaviorName;
	if (!behaviorName) {
		behaviorName = COMMON.getFunctionName(behavior);
	}

	var index = -1;
	for (var i = 0; i < this.behaviors.length; i++) {
		if (behaviorName == this.behaviors[i].behaviorName) {
			index = i;
			break;
		}
	}

	if (index > -1) {
		this.behaviors.splice(index,1);
		for (var innerProp in this.behaviorVars[behaviorName]) {
			delete this.behaviorVars[behaviorName][innerProp];
		}
		delete this.behaviorVars[behaviorName];
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a behavior from an object's children, including behavior variables
// Example: myblockCluster.removeBehaviorFromChildren(animate);
ActorBlock.prototype.removeBehaviorFromChildren = function(behavior) {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeBehavior(behavior);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all behaviors from an object, including behavior variables
// Example: myblockCluster.removeAllBehaviors();
ActorBlock.prototype.removeAllBehaviors = function() {
	while (this.behaviors.length > 0) {
		this.removeBehavior(this.behaviors[0]);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes all behaviors from an object's children, including behavior variables
// Example: myblockCluster.removeAllBehaviorsFromChildren();
ActorBlock.prototype.removeAllBehaviorsFromChildren = function() {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllBehaviors();
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: add a constraint to an object, with optional variables associated with it
// Example: myblockCluster.addConstraint(checkForCrossedBoundaries, {leftMostX:200, topMostY:200});
ActorBlock.prototype.addConstraint = function (constraint, vars) {
	PARAMS.initializeValidation();
	constraint = PARAMS.validateParam(PARAMS.FUNCTION, constraint);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	var constraintName = constraint.constraintName;
	if (!constraintName) {
		constraintName = COMMON.getFunctionName(constraint);
	}
	
	var index = -1;
	for (var i = 0; i < this.constraints.length; i++) {
		if (constraintName == this.constraints[i].constraintName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundConstraint = constraint.bind(vars);
		boundConstraint.constraintName = constraintName;
		this.constraints.push(boundConstraint);
		if (vars != undefined) {
			this.constraintVars[constraintName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: add a constraint to an object's children, with optional variables associated with it
// Example: myblockCluster.addConstraintToChildren(checkForCrossedBoundaries, {leftMostX:200, topMostY:200});
ActorBlock.prototype.addConstraintToChildren = function (constraint, vars) {
	PARAMS.initializeValidation();
	constraint = PARAMS.validateParam(PARAMS.FUNCTION, constraint);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addConstraint(constraint, COMMON.extend(vars,{}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a constraint from an object, including constraint variables
// Example: myblockCluster.removeConstraint(checkForCrossedBoundaries);
ActorBlock.prototype.removeConstraint = function (constraint) {
	PARAMS.initializeValidation();
	constraint = PARAMS.validateParam(PARAMS.FUNCTION, constraint);

	var constraintName = constraint.constraintName;
	if (!constraintName) {
		constraintName = COMMON.getFunctionName(constraint);
	}

	var index = -1;
	for (var i = 0; i < this.constraints.length; i++) {
		if (constraintName == this.constraints[i].constraintName) {
			index = i;
			break;
		}
	}

	if (index > -1) {
		this.constraints.splice(index,1);
		for (var innerProp in this.constraintVars[constraintName]) {
			delete this.constraintVars[constraintName][innerProp];
		}
		delete this.constraintVars[constraintName];
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a constraint from an object's children, including constraint variables
// Example: myblockCluster.removeConstraintFromChildren(checkForCrossedBoundaries);
ActorBlock.prototype.removeConstraintFromChildren = function (constraint) {
	PARAMS.initializeValidation();
	constraint = PARAMS.validateParam(PARAMS.FUNCTION, constraint);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeConstraint(constraint);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all constraints from an object, including constraint variables
// Example: myblockCluster.removeAllConstraints();
ActorBlock.prototype.removeAllConstraints = function() {
	while (this.constraints.length > 0) {
		this.removeConstraint(this.constraints[0]);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all constraints from an object's children, including constraint variables
// Example: myblockCluster.removeAllConstraintsFromChildren();
ActorBlock.prototype.removeAllConstraintsFromChildren = function() {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllConstraintsFromChildren();
	}
}

// Private function
// Input parameters: a matrix object
// Returns: nothing
// Description: adds the Translation, Scale, and Rotation of an object to the matrix passed into the function,
// accounts for the transformations of the parents before applying transformations
ActorBlock.prototype.addTransformationsToMatrix = function(matrix) {
	PARAMS.initializeValidation();
	matrix = PARAMS.validateParam(PARAMS.MATRIX, matrix);

	if (this.parent != null) {
		this.parent.addTransformationsToMatrix(matrix);
	}
	var zscale = 2*Math.tan(CANVASMANAGER.fov*(Math.PI/180)/2);
	var zratio = 1;
	if ((this.z + zscale) != 0) {
		zratio = 1 / ((this.z + zscale) / zscale);
	} 

	var drawx = Math.round(-this.width / 2 + zratio*this.x);
	var drawy = Math.round(-this.height / 2 + zratio*this.y);

	matrix.addTranslation(drawx + this.width/2,drawy+this.height/2);
	matrix.addScale(zratio*this.scaleX, zratio*this.scaleY);
	matrix.addRotation(this.rotation);
}


// Private function
// Input parameters: a matrix object
// Returns: nothing
// Description: adds the inverse Translation, Scale, and Rotation of an object to the matrix passed into the function,
// accounts for the inverse transformations of the parents before applying transformations.
// Typically used to convert global coordinates into local coordinates of an object
ActorBlock.prototype.addInverseTransformationsToMatrix = function(matrix) {
	PARAMS.initializeValidation();
	matrix = PARAMS.validateParam(PARAMS.MATRIX, matrix);

	if (this.parent != null) {
		this.parent.addInverseTransformationsToMatrix(matrix);
	}
	var zscale = 2*Math.tan(CANVASMANAGER.fov*(Math.PI/180)/2);
	var zratio = 1;
	if ((this.z + zscale) != 0) {
		zratio = 1 / ((this.z + zscale) / zscale);
	} 

	var drawx = Math.round(-this.width / 2 + zratio*this.x);
	var drawy = Math.round(-this.height / 2 + zratio*this.y);

	matrix.addTranslation(-(drawx + this.width/2),-(drawy+this.height/2));
	matrix.addScale(1/(zratio*this.scaleX), 1/(zratio*this.scaleY));
	matrix.addRotation(-this.rotation);
}

// Private function
// Input parameters: a matrix object
// Returns: nothing
// Description: adds the reverse Translation, Scale, and Rotation of an object to the matrix passed into the function,
// accounts for the reverse transformations of the parents before applying transformations
ActorBlock.prototype.addReverseTransformationsToMatrix = function(matrix) {
	PARAMS.initializeValidation();
	matrix = PARAMS.validateParam(PARAMS.MATRIX, matrix);

	if (this.parent != null) {
		this.parent.addReverseTransformationsToMatrix(matrix);
	}
	var zscale = 2*Math.tan(CANVASMANAGER.fov*(Math.PI/180)/2);
	var zratio = 1;
	if ((this.z + zscale) != 0) {
		zratio = 1 / ((this.z + zscale) / zscale);
	} 

	var drawx = Math.round(-this.width / 2 + zratio*this.x);
	var drawy = Math.round(-this.height / 2 + zratio*this.y);

	matrix.addRotation(-this.rotation);
	matrix.addScale(1/(zratio*this.scaleX), 1/(zratio*this.scaleY));
	matrix.addTranslation(-(drawx + this.width/2),-(drawy+this.height/2));
}

// Private function
// Input parameters: global x,y coordinates
// Returns: object containing (x,y) coordinates
// Description: converts global coordinates into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
ActorBlock.prototype.transformGlobalXYToLocalCoordinates = function(globalX,globalY) {
	PARAMS.initializeValidation();
	globalX = PARAMS.validateParam(PARAMS.INTEGER, globalX);
	globalY = PARAMS.validateParam(PARAMS.INTEGER, globalY);

	MATRIX.clearTransformations();

	this.addInverseTransformationsToMatrix(MATRIX);

	var xyResult = MATRIX.applyTransformation(globalX,globalY);

	return xyResult;
}

// Private function
// Input parameters: mouseEvent object
// Returns: object containing (x,y) coordinates
// Description: converts coordinates of the mouse event (global coordinates) into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
ActorBlock.prototype.transformMouseEventToLocalCoordinates = function(mouseEvent) {
	PARAMS.initializeValidation();
	mouseEvent = PARAMS.validateParam(PARAMS.MOUSEEVENT, mouseEvent);

	return this.transformGlobalXYToLocalCoordinates(mouseEvent.x,mouseEvent.y);
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouse event is within the boundaries of an object
// Description: converts coordinates of the mouse event (global coordinates) into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
ActorBlock.prototype.isMouseEventWithinBlock = function(mouseEvent) {
	PARAMS.initializeValidation();
	mouseEvent = PARAMS.validateParam(PARAMS.MOUSEEVENT, mouseEvent);

	MATRIX.clearTransformations();

	this.addInverseTransformationsToMatrix(MATRIX);

	var xyResult = MATRIX.applyTransformation(mouseEvent.x,mouseEvent.y);

	LOG.writeObject(xyResult);

	if (xyResult.x > -this.width/2 && xyResult.x < this.width/2 &&
		xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
		return true;
	}
	else {
		return false;
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouseEvent triggered any mouseOver or mouseOut reactions
// Description: checks if the input mouseEvent should trigger any mouseOver or mouseOut reactions
ActorBlock.prototype.reactToMouseMoveEvent = function(mouseEvent) {
	PARAMS.initializeValidation();
	mouseEvent = PARAMS.validateParam(PARAMS.MOUSEEVENT, mouseEvent);

	if (this.isMouseEventWithinBlock(mouseEvent)) {
		if (!this.isMouseOver) {
			this.isMouseOver = true;
			for (var i = 0; i < this.mouseOverReactions.length; i++) {
				this.mouseOverReactions[i](this, mouseEvent);
			}
			//return true;
		}
	}
	else {
		if (this.isMouseOver) {
			this.isMouseOver = false;
			for (var i = 0; i < this.mouseOutReactions.length; i++) {
				this.mouseOutReactions[i](this, mouseEvent);
			}
			//return true;
		}
	}

	for (var i = 0; i < this.mouseMoveReactions.length; i++) {
		this.mouseMoveReactions[i](this, mouseEvent);
	}

	return true;
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object to MouseMove events, 
// and adds a mouseOver reaction to an object, with optional variables associated with it
ActorBlock.prototype.addMouseOverReaction = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	CANVASMANAGER.mouseMoveEvent.subscribe(this);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseOverReactions.length; i++) {
		if (reactionName == this.mouseOverReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.mouseOverReactions.push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to MouseMove events, 
// and adds a mouseOver reaction to an object's children, with optional variables associated with it
ActorBlock.prototype.addMouseOverReactionToChildren = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addMouseOverReaction(reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse over reaction from an object, including behavior variables
// Example: myblockCluster.removeMouseOverReaction(hover);
ActorBlock.prototype.removeMouseOverReaction = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseOverReactions.length; i++) {
		if (reactionName == this.mouseOverReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index > -1) {
		this.mouseOverReactions.splice(index,1);
		for (var innerProp in this.reactionVars[reactionName]) {
			delete this.reactionVars[reactionName][innerProp];
		}
		delete this.reactionVars[reactionName];
	}

	if (this.mouseOverReactions.length == 0 && this.mouseOutReactions.length == 0 && this.mouseMoveReactions.length == 0) {
		CANVASMANAGER.mouseMoveEvent.unsubscribe(this);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse over reaction from an object's children, including behavior variables
// Example: myblockCluster.removeMouseOverReactionFromChildren(hover);
ActorBlock.prototype.removeMouseOverReactionFromChildren = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeMouseOverReaction(reaction);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes all mouse over reactions from an object, including behavior variables
// Example: myblockCluster.removeAllMouseOverReactions();
ActorBlock.prototype.removeAllMouseOverReactions = function () {
	while (this.mouseOverReactions.length > 0) {
		this.removeMouseOverReaction(this.mouseOverReactions[0]);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes all mouse over reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllMouseOverReactionsFromChildren();
ActorBlock.prototype.removeAllMouseOverReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllMouseOverReactions();
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object to MouseMove events, 
// and adds a mouseOut reaction to an object, with optional variables associated with it
ActorBlock.prototype.addMouseOutReaction = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	CANVASMANAGER.mouseMoveEvent.subscribe(this);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseOutReactions.length; i++) {
		if (reactionName == this.mouseOutReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.mouseOutReactions.push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to MouseMove events, 
// and adds a mouseOut reaction to an object's children, with optional variables associated with it
ActorBlock.prototype.addMouseOutReactionToChildren = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addMouseOutReaction(reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse out reaction from an object, including behavior variables
// Example: myblockCluster.removeMouseOutReaction(leftBlock);
ActorBlock.prototype.removeMouseOutReaction = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseOutReactions.length; i++) {
		if (reactionName == this.mouseOutReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index > -1) {
		this.mouseOutReactions.splice(index,1);
		for (var innerProp in this.reactionVars[reactionName]) {
			delete this.reactionVars[reactionName][innerProp];
		}
		delete this.reactionVars[reactionName];
	}

	if (this.mouseOverReactions.length == 0 && this.mouseOutReactions.length == 0 && this.mouseMoveReactions.length == 0) {
		CANVASMANAGER.mouseMoveEvent.unsubscribe(this);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse out reaction from an object's children, including behavior variables
// Example: myblockCluster.removeMouseOutReactionFromChildren(leftBlock);
ActorBlock.prototype.removeMouseOutReactionFromChildren = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeMouseOutReaction(reaction);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes all mouse out reactions from an object's, including behavior variables
// Example: myblockCluster.removeAllMouseOutReactions();
ActorBlock.prototype.removeAllMouseOutReactions = function () {
	while (this.mouseOutReactions.length > 0) {
		this.removeMouseOutReaction(this.mouseOutReactions[0]);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes all mouse out reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllMouseOutReactionsFromChildren();
ActorBlock.prototype.removeAllMouseOutReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllMouseOutReactions();
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object to MouseMove events, 
// and adds a mouseMove reaction to an object, with optional variables associated with it
ActorBlock.prototype.addMouseMoveReaction = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	CANVASMANAGER.mouseMoveEvent.subscribe(this);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseMoveReactions.length; i++) {
		if (reactionName == this.mouseMoveReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.mouseMoveReactions.push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to MouseMove events, 
// and adds a mouseMove reaction to an object's children, with optional variables associated with it
ActorBlock.prototype.addMouseMoveReactionToChildren = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addMouseMoveReaction(reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse over reaction from an object, including behavior variables
// Example: myblockCluster.removeMouseMoveReaction(hover);
ActorBlock.prototype.removeMouseMoveReaction = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseMoveReactions.length; i++) {
		if (reactionName == this.mouseMoveReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index > -1) {
		this.mouseMoveReactions.splice(index,1);
		for (var innerProp in this.reactionVars[reactionName]) {
			delete this.reactionVars[reactionName][innerProp];
		}
		delete this.reactionVars[reactionName];
	}

	if (this.mouseOverReactions.length == 0 && this.mouseOutReactions.length == 0 && this.mouseMoveReactions.length == 0) {
		CANVASMANAGER.mouseMoveEvent.unsubscribe(this);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse over reaction from an object's children, including behavior variables
// Example: myblockCluster.removeMouseMoveReactionFromChildren(hover);
ActorBlock.prototype.removeMouseMoveReactionFromChildren = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeMouseMoveReaction(reaction);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all mouse over reactions from an object, including behavior variables
// Example: myblockCluster.removeAllMouseMoveReactions();
ActorBlock.prototype.removeAllMouseOverReactions = function () {
	while (this.mouseOverReactions.length > 0) {
		this.removeMouseOverReaction(this.mouseOverReactions[0]);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all mouse over reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllMouseMoveReactionsFromChildren();
ActorBlock.prototype.removeAllMouseOverReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllMouseMoveReactions();
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouseEvent triggered any mouseClick reactions
// Description: checks if the input mouseEvent should trigger any mouseClick reactions
ActorBlock.prototype.reactToMouseClickEvent = function(mouseEvent) {
	PARAMS.initializeValidation();
	mouseEvent = PARAMS.validateParam(PARAMS.MOUSEEVENT, mouseEvent);

	if (this.isMouseEventWithinBlock(mouseEvent)) {
		for (var i = 0; i < this.mouseClickReactions.length; i++) {
			this.mouseClickReactions[i](this, mouseEvent);
		}
		return true;
	}
	return false;
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object to MouseClick events, 
// and adds a mouseClick reaction to an object, with optional variables associated with it
ActorBlock.prototype.addMouseClickReaction = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	CANVASMANAGER.mouseClickEvent.subscribe(this);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseClickReactions.length; i++) {
		if (reactionName == this.mouseClickReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.mouseClickReactions.push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to MouseClick events, 
// and adds a mouseClick reaction to an object's children, with optional variables associated with it
ActorBlock.prototype.addMouseClickReactionToChildren = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addMouseClickReaction(reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse click reaction from an object, including behavior variables
// Example: myblockCluster.removeMouseClickReaction(clicked);
ActorBlock.prototype.removeMouseClickReaction = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseClickReactions.length; i++) {
		if (reactionName == this.mouseClickReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	//var index = this.mouseClickReactions.indexOf(reaction);
	if (index > -1) {
		this.mouseClickReactions.splice(index,1);
		for (var innerProp in this.reactionVars[reactionName]) {
			delete this.reactionVars[reactionName][innerProp];
		}
		delete this.reactionVars[reactionName];
	}

	if (this.mouseClickReactions.length == 0) {
		CANVASMANAGER.mouseClickEvent.unsubscribe(this);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse click reaction from an object's children, including behavior variables
// Example: myblockCluster.removeMouseClickReactionFromChildren(clicked);
ActorBlock.prototype.removeMouseClickReactionFromChildren = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeMouseClickReaction(reaction);
	}
}


// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes all mouse click reactions from an object, including behavior variables
// Example: myblockCluster.removeAllMouseClickReactions();
ActorBlock.prototype.removeAllMouseClickReactions = function () {
	while (this.mouseClickReactions.length > 0) {
		this.removeMouseClickReaction(this.mouseClickReactions[0]);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes all mouse click reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllMouseClickReactionsFromChildren();
ActorBlock.prototype.removeAllMouseClickReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllMouseClickReactions;
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouseEvent triggered any mouseDown reactions
// Description: checks if the input mouseEvent should trigger any mouseDown reactions
ActorBlock.prototype.reactToMouseDownEvent = function(mouseEvent) {
	PARAMS.initializeValidation();
	mouseEvent = PARAMS.validateParam(PARAMS.MOUSEEVENT, mouseEvent);

	if (this.isMouseEventWithinBlock(mouseEvent)) {
		for (var i = 0; i < this.mouseDownReactions.length; i++) {
			this.mouseDownReactions[i](this, mouseEvent);
		}
		return true;
	}
	return false;
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object to MouseDown events, 
// and adds a mouseDown reaction to an object, with optional variables associated with it
ActorBlock.prototype.addMouseDownReaction = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	CANVASMANAGER.mouseDownEvent.subscribe(this);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseDownReactions.length; i++) {
		if (reactionName == this.mouseDownReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.mouseDownReactions.push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to MouseDown events, 
// and adds a mouseDown reaction to an object's children, with optional variables associated with it
ActorBlock.prototype.addMouseDownReactionToChildren = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addMouseDownReaction(reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse down reaction from an object, including behavior variables
// Example: myblockCluster.removeMouseDownReaction(downed);
ActorBlock.prototype.removeMouseDownReaction = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseDownReactions.length; i++) {
		if (reactionName == this.mouseDownReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	//var index = this.mouseDownReactions.indexOf(reaction);
	if (index > -1) {
		this.mouseDownReactions.splice(index,1);
		for (var innerProp in this.reactionVars[reactionName]) {
			delete this.reactionVars[reactionName][innerProp];
		}
		delete this.reactionVars[reactionName];
	}

	if (this.mouseDownReactions.length == 0) {
		CANVASMANAGER.mouseDownEvent.unsubscribe(this);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse down reaction from an object's children, including behavior variables
// Example: myblockCluster.removeMouseDownReactionFromChildren(downed);
ActorBlock.prototype.removeMouseDownReactionFromChildren = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeMouseDownReaction(reaction);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes all mouse down reactions from an object, including behavior variables
// Example: myblockCluster.removeAllMouseDownReactions();
ActorBlock.prototype.removeAllMouseDownReactions = function () {
	while (this.mouseDownReactions.length > 0) {
		this.removeMouseDownReaction(this.mouseDownReactions[0]);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes all mouse down reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllMouseDownReactionsFromChildren();
ActorBlock.prototype.removeAllMouseDownReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllMouseDownReactions();
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouseEvent triggered any mouseup reactions
// Description: checks if the input mouseEvent should trigger any mouseUp reactions
ActorBlock.prototype.reactToMouseUpEvent = function(mouseEvent) {
	PARAMS.initializeValidation();
	mouseEvent = PARAMS.validateParam(PARAMS.MOUSEEVENT, mouseEvent);

	if (this.isMouseEventWithinBlock(mouseEvent)) {
		for (var i = 0; i < this.mouseUpReactions.length; i++) {
			this.mouseUpReactions[i](this, mouseEvent);
		}
		return true;
	}
	return false;
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object to MouseUp events, 
// and adds a mouseUp reaction to an object, with optional variables associated with it
ActorBlock.prototype.addMouseUpReaction = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	CANVASMANAGER.mouseUpEvent.subscribe(this);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseUpReactions.length; i++) {
		if (reactionName == this.mouseUpReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.mouseUpReactions.push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to MouseUp events, 
// and adds a mouseUp reaction to an object's children, with optional variables associated with it
ActorBlock.prototype.addMouseUpReactionToChildren = function (reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addMouseUpReaction(reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse up reaction from an object, including behavior variables
// Example: myblockCluster.removeMouseUpReaction(released);
ActorBlock.prototype.removeMouseUpReaction = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = getFunctionName(reaction);
	}

	var index = -1;
	for (var i = 0; i < this.mouseUpReactions.length; i++) {
		if (reactionName == this.mouseUpReactions[i].reactionName) {
			index = i;
			break;
		}
	}

	if (index > -1) {
		this.mouseUpReactions.splice(index,1);
		for (var innerProp in this.reactionVars[reactionName]) {
			delete this.reactionVars[reactionName][innerProp];
		}
		delete this.reactionVars[reactionName];
	}

	if (this.mouseUpReactions.length == 0) {
		CANVASMANAGER.mouseUpEvent.unsubscribe(this);
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes a mouse up reaction from an object's children, including behavior variables
// Example: myblockCluster.removeMouseUpReactionFromChildren(released);
ActorBlock.prototype.removeMouseUpReactionFromChildren = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeMouseUpReaction(reaction);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all mouse up reactions from an object, including behavior variables
// Example: myblockCluster.removeAllMouseUpReactions();
ActorBlock.prototype.removeAllMouseUpReactions = function () {
	while (this.mouseUpReactions.length > 0) {
		this.removeMouseUpReaction(this.mouseUpReactions[0]);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all mouse up reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllMouseUpReactionsFromChildren();
ActorBlock.prototype.removeAllMouseUpReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllMouseUpReactions();
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all mouse over/out/click/down/up reactions from an object, including behavior variables
// Example: myblockCluster.removeAllMouseReactions();
ActorBlock.prototype.removeAllMouseReactions = function () {
	this.removeAllMouseOverReactions();
	this.removeAllMouseOutReactions();
	this.removeAllMouseClickReactions();
	this.removeAllMouseDownReactions();
	this.removeAllMouseUpReactions();
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all mouse over/out/click/down/up reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllMouseReactionsFromChildren();
ActorBlock.prototype.removeAllMouseReactionsFromChildren = function () {
	this.removeAllMouseOverReactionsFromChildren();
	this.removeAllMouseOutReactionsFromChildren();
	this.removeAllMouseClickReactionsFromChildren();
	this.removeAllMouseDownReactionsFromChildren();
	this.removeAllMouseUpReactionsFromChildren();
}

// Private function
// Input parameters: keyboardEvent object
// Returns: Boolean indicating if the keyboardEvent triggered any keyPress reactions
// Description: checks if the input keyboardEvent should trigger any keyPress reactions
ActorBlock.prototype.reactToKeyPressEvent = function(keyboardEvent,keyName) {
	PARAMS.initializeValidation();
	keyboardEvent = PARAMS.validateParam(PARAMS.KEYBOARDEVENT, keyboardEvent);
	keyName = PARAMS.validateParam(PARAMS.STRING, keyName);

	if (this.keyPressReactions[keyName] != undefined) {
		for (var i = 0; i < this.keyPressReactions[keyName].length; i++) {
			this.keyPressReactions[keyName][i](this, keyboardEvent);
		}
		return true;
	}
	return false;
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object to keyPress events, 
// and adds a keyPress reaction for any key to an object, with optional variables associated with it
ActorBlock.prototype.addAnyKeyPressReaction = function(reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	var name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);

	CANVASMANAGER.keyboardEvent.subscribeToKeyPress(this,KEYCODES.ANYKEY);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	if (this.keyPressReactions[name] == undefined) {
		this.keyPressReactions[name] = new Array();
	}

	var index = -1;
	for (var i = 0; i < this.keyPressReactions[name].length; i++) {
		if (reactionName == this.keyPressReactions[name][i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.keyPressReactions[name].push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to keyPress events, 
// and adds a keyPress reaction for any key to an object's children, with optional variables associated with it
ActorBlock.prototype.addAnyKeyPressReactionToChildren = function(reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addAnyKeyPressReaction(reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes an any key press reaction from an object, including behavior variables
// Example: myblockCluster.removeAnyKeyPressReaction(anyKeyPressed);
ActorBlock.prototype.removeAnyKeyPressReaction = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);

	if (this.keyPressReactions[name] != undefined) {
		var reactionName = reaction.reactionName;
		if (!reactionName) {
			reactionName = COMMON.getFunctionName(reaction);
		}

		var index = -1;
		for (var i = 0; i < this.keyPressReactions[name].length; i++) {
			if (reactionName == this.keyPressReactions[name][i].reactionName) {
				index = i;
				break;
			}
		}

		if (index > -1) {
			this.keyPressReactions[name].splice(index,1);
			for (var innerProp in this.reactionVars[reactionName]) {
				delete this.reactionVars[reactionName][innerProp];
			}
			delete this.reactionVars[reactionName];
		}
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes an any key press reaction from an object's children, including behavior variables
// Example: myblockCluster.removeAnyKeyPressReactionFromChildren(anyKeyPressed);
ActorBlock.prototype.removeAnyKeyPressReactionFromChildren = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAnyKeyPressReaction(reaction);
	}
}

// Private function
// Input parameters: keyboardEvent object
// Returns: Boolean indicating if the keyboardEvent triggered any keyDown reactions
// Description: checks if the input keyboardEvent should trigger any keyDown reactions
ActorBlock.prototype.reactToKeyDownEvent = function(keyboardEvent,keyName) {
	PARAMS.initializeValidation();
	keyboardEvent = PARAMS.validateParam(PARAMS.KEYBOARDEVENT, keyboardEvent);
	keyName = PARAMS.validateParam(PARAMS.STRING, keyName);

	if (this.keyDownReactions[keyName] != undefined) {
		for (var i = 0; i < this.keyDownReactions[keyName].length; i++) {
			this.keyDownReactions[keyName][i](this, keyboardEvent);
		}
		return true;
	}
	return false;
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object to any keyDown events, 
// and adds a keyDown reaction for any key to an object, with optional variables associated with it
ActorBlock.prototype.addAnyKeyDownReaction = function(reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	var name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);

	CANVASMANAGER.keyboardEvent.subscribeToKeyDown(this,KEYCODES.ANYKEY);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	if (this.keyDownReactions[name] == undefined) {
		this.keyDownReactions[name] = new Array();
	}

	var index = -1;
	for (var i = 0; i < this.keyDownReactions[name].length; i++) {
		if (reactionName == this.keyDownReactions[name][i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.keyDownReactions[name].push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to any keyDown events, 
// and adds a keyDown reaction for any key to an object's children, with optional variables associated with it
ActorBlock.prototype.addAnyKeyDownReactionToChildren = function(reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addAnyKeyDownReaction(reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes an any key down reaction from an object, including behavior variables
// Example: myblockCluster.removeAnyKeyDownReaction(anyKeyDowned);
ActorBlock.prototype.removeAnyKeyDownReaction = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);

	if (this.keyDownReactions[name] != undefined) {
		var reactionName = reaction.reactionName;
		if (!reactionName) {
			reactionName = COMMON.getFunctionName(reaction);
		}

		var index = -1;
		for (var i = 0; i < this.keyDownReactions[name].length; i++) {
			if (reactionName == this.keyDownReactions[name][i].reactionName) {
				index = i;
				break;
			}
		}

		if (index > -1) {
			this.keyDownReactions[name].splice(index,1);
			for (var innerProp in this.reactionVars[reactionName]) {
				delete this.reactionVars[reactionName][innerProp];
			}
			delete this.reactionVars[reactionName];
		}
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes an any key down reaction from an object's children, including behavior variables
// Example: myblockCluster.removeAnyKeyDownReactionFromChildren(anyKeyDowned);
ActorBlock.prototype.removeAnyKeyDownReactionFromChildren = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAnyKeyDownReaction(reaction);
	}
}

// Private function
// Input parameters: keyboardEvent object
// Returns: Boolean indicating if the keyboardEvent triggered any keyUp reactions
// Description: checks if the input keyboardEvent should trigger any keyUp reactions
ActorBlock.prototype.reactToKeyUpEvent = function(keyboardEvent,keyName) {
	PARAMS.initializeValidation();
	keyboardEvent = PARAMS.validateParam(PARAMS.KEYBOARDEVENT, keyboardEvent);
	keyName = PARAMS.validateParam(PARAMS.STRING, keyName);

	if (this.keyUpReactions[keyName] != undefined) {
		for (var i = 0; i < this.keyUpReactions[keyName].length; i++) {
			this.keyUpReactions[keyName][i](this, keyboardEvent);
		}
		return true;
	}
	return false;
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object to any keyUp events, 
// and adds a keyUp reaction for any key to an object, with optional variables associated with it
ActorBlock.prototype.addAnyKeyUpReaction = function(reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	var name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);
	
	CANVASMANAGER.keyboardEvent.subscribeToKeyUp(this,KEYCODES.ANYKEY);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	if (this.keyUpReactions[name] == undefined) {
		this.keyUpReactions[name] = new Array();
	}

	var index = -1;
	for (var i = 0; i < this.keyUpReactions[name].length; i++) {
		if (reactionName == this.keyUpReactions[name][i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.keyUpReactions[name].push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to any keyUp events, 
// and adds a keyUp reaction for any key to an object's children, with optional variables associated with it
ActorBlock.prototype.addAnyKeyUpReactionToChildren = function(reaction, vars) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addAnyKeyUpReaction(reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes an any key up reaction from an object, including behavior variables
// Example: myblockCluster.removeAnyKeyUpReaction(anyKeyReleased);
ActorBlock.prototype.removeAnyKeyUpReaction = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);

	if (this.keyUpReactions[name] != undefined) {
		var reactionName = reaction.reactionName;
		if (!reactionName) {
			reactionName = COMMON.getFunctionName(reaction);
		}

		var index = -1;
		for (var i = 0; i < this.keyUpReactions[name].length; i++) {
			if (reactionName == this.keyUpReactions[name][i].reactionName) {
				index = i;
				break;
			}
		}

		if (index > -1) {
			this.keyUpReactions[name].splice(index,1);
			for (var innerProp in this.reactionVars[reactionName]) {
				delete this.reactionVars[reactionName][innerProp];
			}
			delete this.reactionVars[reactionName];
		}
	}
}

// Public function
// Input parameters: a function
// Returns: nothing
// Description: removes an any key up reaction from an object's children, including behavior variables
// Example: myblockCluster.removeAnyKeyUpReactionFromChildren(anyKeyReleased);
ActorBlock.prototype.removeAnyKeyUpReactionFromChildren = function (reaction) {
	PARAMS.initializeValidation();
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAnyKeyUpReaction(reaction);
	}
}

// Public function
// Input parameters: a keycode, a function, a variable object
// Returns: nothing
// Description: subscribes an object to keyPress events, 
// and adds a keyPress reaction associated with the input keycode to an object, with optional variables associated with it
ActorBlock.prototype.addKeyPressReaction = function(keyCode, reaction, vars) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	var name = KEYCODES.getStringFromKeyCode(keyCode);

	CANVASMANAGER.keyboardEvent.subscribeToKeyPress(this,keyCode);
		
	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	if (this.keyPressReactions[name] == undefined) {
		this.keyPressReactions[name] = new Array();
	}

	var index = -1;
	for (var i = 0; i < this.keyPressReactions[name].length; i++) {
		if (reactionName == this.keyPressReactions[name][i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.keyPressReactions[name].push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a keycode, a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to keyPress events, 
// and adds a keyPress reaction associated with the input keycode to an object's children, with optional variables associated with it
ActorBlock.prototype.addKeyPressReactionToChildren = function(keyCode, reaction, vars) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addKeyPressReaction(keyCode, reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a keycode, a function
// Returns: nothing
// Description: removes a key press reaction from an object for a given keycode, including behavior variables
// Example: myblockCluster.removeKeyPressReaction(KEYCODES.A, keyPressed);
ActorBlock.prototype.removeKeyPressReaction = function (keyCode, reaction) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var name = KEYCODES.getStringFromKeyCode(keyCode);

	if (this.keyPressReactions[name] != undefined) {
		var reactionName = reaction.reactionName;
		if (!reactionName) {
			reactionName = COMMON.getFunctionName(reaction);
		}

		var index = -1;
		for (var i = 0; i < this.keyPressReactions[name].length; i++) {
			if (reactionName == this.keyPressReactions[name][i].reactionName) {
				index = i;
				break;
			}
		}

		if (index > -1) {
			this.keyPressReactions[name].splice(index,1);
			for (var innerProp in this.reactionVars[reactionName]) {
				delete this.reactionVars[reactionName][innerProp];
			}
			delete this.reactionVars[reactionName];
		}
	}
}

// Public function
// Input parameters: a keycode, a function
// Returns: nothing
// Description: removes a key press reaction from an object's children for a given keycode, including behavior variables
// Example: myblockCluster.removeKeyPressReactionFromChildren(KEYCODES.A, keyPressed);
ActorBlock.prototype.removeKeyPressReactionFromChildren = function (keyCode, reaction) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeKeyPressReaction(keyCode, reaction);
	}
}

// Public function
// Input parameters: a keycode
// Returns: nothing
// Description: removes all key press reactions from an object for a given keycode, including behavior variables
// Example: myblockCluster.removeAllKeyPressReactionsForKeyCode(KEYCODES.A);
ActorBlock.prototype.removeAllKeyPressReactionsForKeyCode = function (keyCode) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);

	var name = KEYCODES.getStringFromKeyCode(keyCode);

	while (this.keyPressReactions[name].length > 0) {
		this.removeKeyPressReaction(keyCode, this.keyPressReactions[name][0]);
	}
}

// Public function
// Input parameters: a keycode
// Returns: nothing
// Description: removes all key press reactions from an object's children for a given keycode, including behavior variables
// Example: myblockCluster.removeAllKeyPressReactionsForKeyCodeFromChildren(KEYCODES.A);
ActorBlock.prototype.removeAllKeyPressReactionsForKeyCodeFromChildren = function (keyCode) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllKeyPressReactionsForKeyCode(keyCode);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all key press reactions from an object, including behavior variables
// Example: myblockCluster.removeAllKeyPressReactions();
ActorBlock.prototype.removeAllKeyPressReactions = function () {
	for (var keyCodeName in this.keyPressReactions) {
		this.removeAllKeyPressReactionsForKeyCode(KEYCODES.getKeyCodeFromString(keyCodeName));
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all key press reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllKeyPressReactionsFromChildren();
ActorBlock.prototype.removeAllKeyPressReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllKeyPressReactions();
	}
}

// Public function
// Input parameters: a keycode, a function, a variable object
// Returns: nothing
// Description: subscribes an object to any keyDown events, 
// and adds a keyDown reaction associated with the input keycode to an object, with optional variables associated with it
ActorBlock.prototype.addKeyDownReaction = function(keyCode, reaction, vars) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	var name = KEYCODES.getStringFromKeyCode(keyCode);
	
	CANVASMANAGER.keyboardEvent.subscribeToKeyDown(this,keyCode);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	if (this.keyDownReactions[name] == undefined) {
		this.keyDownReactions[name] = new Array();
	}

	var index = -1;
	for (var i = 0; i < this.keyDownReactions[name].length; i++) {
		if (reactionName == this.keyDownReactions[name][i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.keyDownReactions[name].push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a keycode, a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to any keyDown events, 
// and adds a keyDown reaction associated with the input keycode to an object's children, with optional variables associated with it
ActorBlock.prototype.addKeyDownReactionToChildren = function(keyCode, reaction, vars) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addKeyDownReaction(keyCode, reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a keycode, a function
// Returns: nothing
// Description: removes a key down reaction from an object for a given keycode, including behavior variables
// Example: myblockCluster.removeKeyDownReaction(KEYCODES.A, keyDowned);
ActorBlock.prototype.removeKeyDownReaction = function (keyCode, reaction) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var name = KEYCODES.getStringFromKeyCode(keyCode);

	if (this.keyDownReactions[name] != undefined) {
		var reactionName = reaction.reactionName;
		if (!reactionName) {
			reactionName = COMMON.getFunctionName(reaction);
		}

		var index = -1;
		for (var i = 0; i < this.keyDownReactions[name].length; i++) {
			if (reactionName == this.keyDownReactions[name][i].reactionName) {
				index = i;
				break;
			}
		}

		if (index > -1) {
			this.keyDownReactions[name].splice(index,1);
			for (var innerProp in this.reactionVars[reactionName]) {
				delete this.reactionVars[reactionName][innerProp];
			}
			delete this.reactionVars[reactionName];
		}
	}
}

// Public function
// Input parameters: a keycode, a function
// Returns: nothing
// Description: removes a key down reaction from an object's children for a given keycode, including behavior variables
// Example: myblockCluster.removeKeyDownReactionFromChildren(KEYCODES.A, keyDowned);
ActorBlock.prototype.removeKeyDownReactionFromChildren = function (keyCode, reaction) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeKeyDownReaction(keyCode, reaction);
	}
}

// Public function
// Input parameters: a keycode
// Returns: nothing
// Description: removes all key down reactions from an object for a given keycode, including behavior variables
// Example: myblockCluster.removeAllKeyDownReactionsForKeyCode(KEYCODES.A);
ActorBlock.prototype.removeAllKeyDownReactionsForKeyCode = function (keyCode) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);

	var name = KEYCODES.getStringFromKeyCode(keyCode);

	while (this.keyDownReactions[name].length > 0) {
		this.removeKeyDownReaction(keyCode, this.keyDownReactions[name][0]);
	}
}

// Public function
// Input parameters: a keycode
// Returns: nothing
// Description: removes all key down reactions from an object's children for a given keycode, including behavior variables
// Example: myblockCluster.removeAllKeyDownReactionsForKeyCodeFromChildren(KEYCODES.A);
ActorBlock.prototype.removeAllKeyDownReactionsForKeyCodeFromChildren = function (keyCode) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllKeyDownReactionsForKeyCode(keyCode);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all single key down reactions from an object, including behavior variables
// Example: myblockCluster.removeAllKeyDownReactions();
ActorBlock.prototype.removeAllKeyDownReactions = function () {
	for (var keyCodeName in this.keyDownReactions) {
		if (keyCodeName.length == 1) {
			this.removeAllKeyDownReactionsForKeyCode(KEYCODES.getKeyCodeFromString(keyCodeName));
		}
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all single key down reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllKeyDownReactionsFromChildren();
ActorBlock.prototype.removeAllKeyDownReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllKeyDownReactions();
	}
}

// Public function
// Input parameters: a keycode, a function, a variable object
// Returns: nothing
// Description: subscribes an object to any keyUp events, 
// and adds a keyUp reaction associated with the input keycode to an object, with optional variables associated with it
ActorBlock.prototype.addKeyUpReaction = function(keyCode, reaction, vars) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	var name = KEYCODES.getStringFromKeyCode(keyCode);
	
	CANVASMANAGER.keyboardEvent.subscribeToKeyUp(this,keyCode);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	if (this.keyUpReactions[name] == undefined) {
		this.keyUpReactions[name] = new Array();
	}

	var index = -1;
	for (var i = 0; i < this.keyUpReactions[name].length; i++) {
		if (reactionName == this.keyUpReactions[name][i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.keyUpReactions[name].push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: a keycode, a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to any keyUp events, 
// and adds a keyUp reaction associated with the input keycode to an object's children, with optional variables associated with it
ActorBlock.prototype.addKeyUpReactionToChildren = function(keyCode, reaction, vars) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addKeyUpReaction(keyCode, reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: a keycode, a function
// Returns: nothing
// Description: removes a key up reaction from an object for a given keycode, including behavior variables
// Example: myblockCluster.removeKeyUpReaction(KEYCODES.A, keyReleased);
ActorBlock.prototype.removeKeyUpReaction = function (keyCode, reaction) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var name = KEYCODES.getStringFromKeyCode(keyCode);

	if (this.keyUpReactions[name] != undefined) {
		var reactionName = reaction.reactionName;
		if (!reactionName) {
			reactionName = COMMON.getFunctionName(reaction);
		}

		var index = -1;
		for (var i = 0; i < this.keyUpReactions[name].length; i++) {
			if (reactionName == this.keyUpReactions[name][i].reactionName) {
				index = i;
				break;
			}
		}

		if (index > -1) {
			this.keyUpReactions[name].splice(index,1);
			for (var innerProp in this.reactionVars[reactionName]) {
				delete this.reactionVars[reactionName][innerProp];
			}
			delete this.reactionVars[reactionName];
		}
	}
}

// Public function
// Input parameters: a keycode, a function
// Returns: nothing
// Description: removes a key up reaction from an object's children for a given keycode, including behavior variables
// Example: myblockCluster.removeKeyUpReactionFromChildren(KEYCODES.A, keyReleased);
ActorBlock.prototype.removeKeyUpReactionFromChildren = function (keyCode, reaction) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeKeyUpReaction(keyCode, reaction);
	}
}

// Public function
// Input parameters: a keycode, a function
// Returns: nothing
// Description: removes all key up reactions from an object for a given keycode, including behavior variables
// Example: myblockCluster.removeAllKeyUpReactionsForKeyCode(KEYCODES.A);
ActorBlock.prototype.removeAllKeyUpReactionsForKeyCode = function (keyCode) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);

	var name = KEYCODES.getStringFromKeyCode(keyCode);

	while (this.keyUpReactions[name].length > 0) {
		this.removeKeyUpReaction(keyCode, this.keyUpReactions[name][0]);
	}
}

// Public function
// Input parameters: a keycode, a function
// Returns: nothing
// Description: removes all key up reactions from an object's children for a given keycode, including behavior variables
// Example: myblockCluster.removeAllKeyUpReactionsForKeyCodeFromChildren(KEYCODES.A);
ActorBlock.prototype.removeAllKeyUpReactionsForKeyCodeFromChildren = function (keyCode) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllKeyUpReactionsForKeyCode(keyCode);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all key up reactions from an object, including behavior variables
// Example: myblockCluster.removeAllKeyUpReactions();
ActorBlock.prototype.removeAllKeyUpReactions = function () {
	for (var keyCodeName in this.keyUpReactions) {
		this.removeAllKeyUpReactionsForKeyCode(KEYCODES.getKeyCodeFromString(keyCodeName));
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all key up reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllKeyUpReactionsFromChildren();
ActorBlock.prototype.removeAllKeyUpReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllKeyUpReactions();
	}
}

// Public function
// Input parameters: an array of keycodes, a function, a variable object
// Returns: nothing
// Description: subscribes an object to any keyDown events, 
// and adds a keyDown reaction associated with the input combination of keycodes to an object, 
// with optional variables associated with it
ActorBlock.prototype.addKeyCombinationReaction = function(keyCodes, reaction, vars) {
	PARAMS.initializeValidation();
	keyCodes = PARAMS.validateParam(PARAMS.ARRAYOFINTEGER, keyCodes);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	var name = KEYCODES.getStringFromKeyCodes(keyCodes);
	
	CANVASMANAGER.keyboardEvent.subscribeToKeyCombination(this,keyCodes);

	var reactionName = reaction.reactionName;
	if (!reactionName) {
		reactionName = COMMON.getFunctionName(reaction);
	}

	if (this.keyDownReactions[name] == undefined) {
		this.keyDownReactions[name] = new Array();
	}

	var index = -1;
	for (var i = 0; i < this.keyDownReactions[name].length; i++) {
		if (reactionName == this.keyDownReactions[name][i].reactionName) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		var boundReaction = reaction.bind(vars);
		boundReaction.reactionName = reactionName;
		this.keyDownReactions[name].push(boundReaction);
		if (vars != undefined) {
			this.reactionVars[reactionName] = vars;
		}
	}
}

// Public function
// Input parameters: an array of keycodes, a function, a variable object
// Returns: nothing
// Description: subscribes an object's children to any keyDown events, 
// and adds a keyDown reaction associated with the input combination of keycodes to an object's children, 
// with optional variables associated with it
ActorBlock.prototype.addKeyCombinationReactionToChildren = function(keyCodes, reaction, vars) {
	PARAMS.initializeValidation();
	keyCodes = PARAMS.validateParam(PARAMS.ARRAYOFINTEGER, keyCodes);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);
	vars = PARAMS.validateParam(PARAMS.OBJECT, vars);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].addKeyCombinationReaction(keyCodes, reaction, COMMON.extend(vars, {}));
	}
}

// Public function
// Input parameters: an array of keycodes, a function
// Returns: nothing
// Description: removes a key combination reaction from an object for a given array of keycodes, including behavior variables
// Example: myblockCluster.removeKeyCombinationReaction([KEYCODES.A,KEYCODES.B,KEYCODES.c], keyCombinationPressed);
ActorBlock.prototype.removeKeyCombinationReaction = function (keyCodes, reaction) {
	PARAMS.initializeValidation();
	keyCodes = PARAMS.validateParam(PARAMS.ARRAYOFINTEGER, keyCodes);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	var name = KEYCODES.getStringFromKeyCodes(keyCodes);

	if (this.keyDownReactions[name] != undefined) {
		var reactionName = reaction.reactionName;
		if (!reactionName) {
			reactionName = COMMON.getFunctionName(reaction);
		}

		var index = -1;
		for (var i = 0; i < this.keyDownReactions[name].length; i++) {
			if (reactionName == this.keyDownReactions[name][i].reactionName) {
				index = i;
				break;
			}
		}

		if (index > -1) {
			this.keyDownReactions[name].splice(index,1);
			for (var innerProp in this.reactionVars[reactionName]) {
				delete this.reactionVars[reactionName][innerProp];
			}
			delete this.reactionVars[reactionName];
		}
	}
}

// Public function
// Input parameters: an array of keycodes, a function
// Returns: nothing
// Description: removes a key combination reaction from an object's children for a given array of keycodes, including behavior variables
// Example: myblockCluster.removeKeyCombinationReactionFromChildren([KEYCODES.A,KEYCODES.B,KEYCODES.c], keyCombinationPressed);
ActorBlock.prototype.removeKeyCombinationReactionFromChildren = function (keyCodes, reaction) {
	PARAMS.initializeValidation();
	keyCodes = PARAMS.validateParam(PARAMS.ARRAYOFINTEGER, keyCodes);
	reaction = PARAMS.validateParam(PARAMS.FUNCTION, reaction);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeKeyCombinationReaction(keyCodes, reaction);
	}
}

// Public function
// Input parameters: an array of keycodes
// Returns: nothing
// Description: removes all key combination reactions from an object for a given array of keycodes, including behavior variables
// Example: myblockCluster.removeAllKeyCombinationReactionsForKeyCodes([KEYCODES.A,KEYCODES.B,KEYCODES.c]);
ActorBlock.prototype.removeAllKeyCombinationReactionsForKeyCodes = function (keyCodes) {
	PARAMS.initializeValidation();
	keyCodes = PARAMS.validateParam(PARAMS.ARRAYOFINTEGER, keyCodes);

	var name = KEYCODES.getStringFromKeyCodes(keyCodes);

	while (this.keyDownReactions[name].length > 0) {
		this.removeKeyCombinationReaction(keyCodes, this.keyDownReactions[name][0]);
	}
}

// Public function
// Input parameters: an array of keycodes
// Returns: nothing
// Description: removes all key combination reactions from an object's children for a given array of keycodes, including behavior variables
// Example: myblockCluster.removeAllKeyCombinationReactionsForKeyCodesFromChildren([KEYCODES.A,KEYCODES.B,KEYCODES.c]);
ActorBlock.prototype.removeAllKeyCombinationReactionsForKeyCodesFromChildren = function (keyCodes) {
	PARAMS.initializeValidation();
	keyCodes = PARAMS.validateParam(PARAMS.ARRAYOFINTEGER, keyCodes);

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllKeyCombinationReactionsForKeyCodes(keyCodes);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all key combination reactions from an object, including behavior variables
// Example: myblockCluster.removeAllKeyCombinationReactions();
ActorBlock.prototype.removeAllKeyCombinationReactions = function () {
	for (var keyCodeName in this.keyDownReactions) {
		if (keyCodeName.indexOf("|") > -1) {
			this.removeAllKeyCombinationReactionsForKeyCodes(KEYCODES.getKeyCodesFromString(keyCodeName));
		}
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all key combination reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllKeyCombinationReactionsFromChildren();
ActorBlock.prototype.removeAllKeyCombinationReactionsFromChildren = function () {
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].removeAllKeyCombinationReactions();
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all key press/up/down/combination reactions from an object, including behavior variables
// Example: myblockCluster.removeAllKeyReactions();
ActorBlock.prototype.removeAllKeyReactions = function () {
	this.removeAllKeyPressReactions();
	this.removeAllKeyDownReactions();
	this.removeAllKeyUpReactions();
	this.removeAllKeyCombinationReactions();
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all key press/up/down/combination reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllKeyReactionsFromChildren();
ActorBlock.prototype.removeAllKeyReactionsFromChildren = function () {
	this.removeAllKeyPressReactionsFromChildren();
	this.removeAllKeyDownReactionsFromChildren();
	this.removeAllKeyUpReactionsFromChildren();
	this.removeAllKeyCombinationReactionsFromChildren();
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all mouse and key reactions from an object, including behavior variables
// Example: myblockCluster.removeAllReactions();
ActorBlock.prototype.removeAllReactions = function () {
	this.removeAllMouseReactions();
	this.removeAllKeyReactions();
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes all mouse and key reactions from an object's children, including behavior variables
// Example: myblockCluster.removeAllReactionsFromChildren();
ActorBlock.prototype.removeAllReactionsFromChildren = function () {
	this.removeAllMouseReactionsFromChildren();
	this.removeAllKeyReactionsFromChildren();
}

ActorBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.xvel = undefined;
		this.yvel = undefined;
		this.zvel = undefined;

		this.xacc = undefined;
		this.yacc = undefined;
		this.zacc = undefined;

		this.rotationVel = undefined;
		this.rotationAcc = undefined;

		this.removeAllBehaviors();
		this.behaviors = undefined;
		this.behaviorVars = undefined;

		this.removeAllConstraints();
		this.constraints = undefined;
		this.constraintVars = undefined;

		this.isMouseOver = undefined;

		this.removeAllReactions();

		this.mouseOverReactions = undefined;
		this.mouseOutReactions = undefined;
		this.mouseClickReactions = undefined;
		this.mouseDownReactions = undefined;
		this.mouseUpReactions = undefined;

		this.keyPressReactions = undefined;
		this.keyDownReactions = undefined;
		this.keyUpReactions = undefined;

		this.reactionVars = undefined;

		CANVASMANAGER.mouseMoveEvent.unsubscribe(this);
		CANVASMANAGER.mouseClickEvent.unsubscribe(this);
		CANVASMANAGER.mouseUpEvent.unsubscribe(this);
		CANVASMANAGER.mouseDownEvent.unsubscribe(this);

		// this.isSubscribedToMouseMove = undefined;
		// this.isSubscribedToMouseClick = undefined;
		// this.isSubscribedToMouseDown = undefined;
		// this.isSubscribedToMouseUp = undefined;

		CANVASMANAGER.keyboardEvent.unsubscribe(this);

		// this.keysPressedSubscribedTo = new Array();
		// this.keysDownSubscribedTo = new Array();
		// this.keysUpSubscribedTo = new Array();

		this.awake = undefined;
		this.memoryCapacity = undefined;
		this.oldestMemoryIndex = undefined;
		this.currentMemoryIndex = undefined;

		for (var i = 0; i < this.memories.length; i++) {
			this.forgetMemory(this.memories[i]);
		}
		this.memories.splice(0,this.memories.length);
		this.memories = undefined;
	}

	Block.prototype.destroy.call(this);
}