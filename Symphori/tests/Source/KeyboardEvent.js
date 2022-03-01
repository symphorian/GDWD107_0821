var KeyboardEvent = function() {
	this.keyPressSubscribedBlocks = new Object();
	this.keyDownSubscribedBlocks = new Object();
	this.keyUpSubscribedBlocks = new Object();
	this.keysDown = new Array();

	this.lastKeyCodePress = 0;
	this.lastKeyCodeDown = 0;
	this.lastKeyCodeUp = 0;

	this.lastKeyNamePress = "";
	this.lastKeyNameDown = "";
	this.lastKeyNameUp = "";

	this.KEYPRESSEVENT = "KeyPressEvent";
	this.KEYDOWNEVENT = "KeyDownEvent";
	this.KEYUPEVENT = "KeyUpEvent";
 }

KeyboardEvent.prototype = new BlockEvent();

KeyboardEvent.prototype.keysDown = new Array();

KeyboardEvent.prototype.fireEvent = function(keyCode, eventType) {
	PARAMS.initializeValidation();
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode);
	eventType = PARAMS.validateParam(PARAMS.STRING, eventType);


	var index = this.keysDown.indexOf(keyCode);
	var name = KEYCODES.getStringFromKeyCode(keyCode);
	var anyKeyName = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);

	if (eventType == this.KEYDOWNEVENT) {
		this.lastKeyCodeDown = keyCode;
		this.lastKeyNameDown = name;
		if (index == -1) {
			this.keysDown.push(keyCode);

			if (this.keysDown.length > 1) {
				var combinationName = KEYCODES.getStringFromKeyCodes(this.keysDown);

				if (this.keyDownSubscribedBlocks[combinationName] != undefined) {
					for (var i = 0; i < this.keyDownSubscribedBlocks[combinationName].length; i++) {
						this.keyDownSubscribedBlocks[combinationName][i]["reactTo" + this.KEYDOWNEVENT](this,name);
					}
				}
				
			}

			if (this.keyDownSubscribedBlocks[name] != undefined) {
				for (var i = 0; i < this.keyDownSubscribedBlocks[name].length; i++) {
					this.keyDownSubscribedBlocks[name][i]["reactTo" + this.KEYDOWNEVENT](this, name);
				}
			}

			if (this.keyDownSubscribedBlocks[KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY)] != undefined) {
				for (var i = 0; i < this.keyDownSubscribedBlocks[KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY)].length; i++) {
					this.keyDownSubscribedBlocks[KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY)][i]["reactTo" + this.KEYDOWNEVENT](this,anyKeyName);
				}
			}
		}
	}
	else if (eventType == this.KEYUPEVENT) {
		this.lastKeyCodeUp = keyCode;
		this.lastKeyNameUp = name;
		if (index != -1) {
			this.keysDown.splice(index, 1);
		}

		if (this.keyUpSubscribedBlocks[name] != undefined) {
			for (var i = 0; i < this.keyUpSubscribedBlocks[name].length; i++) {
				this.keyUpSubscribedBlocks[name][i]["reactTo" + this.KEYUPEVENT](this,name);
			}
		}

		if (this.keyUpSubscribedBlocks[KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY)] != undefined) {
			for (var i = 0; i < this.keyUpSubscribedBlocks[KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY)].length; i++) {
				this.keyUpSubscribedBlocks[KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY)][i]["reactTo" + this.KEYUPEVENT](this,anyKeyName);
			}
		}
	}
	else if (eventType == this.KEYPRESSEVENT) {
		this.lastKeyCodePress = keyCode;
		this.lastKeyNamePress = name;
		if (this.keyPressSubscribedBlocks[name] != undefined) {
			for (var i = 0; i < this.keyPressSubscribedBlocks[name].length; i++) {
				this.keyPressSubscribedBlocks[name][i]["reactTo" + this.KEYPRESSEVENT](this,name);
			}
		}

		if (this.keyPressSubscribedBlocks[KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY)] != undefined) {
			for (var i = 0; i < this.keyPressSubscribedBlocks[KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY)].length; i++) {
				this.keyPressSubscribedBlocks[KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY)][i]["reactTo" + this.KEYPRESSEVENT](this,anyKeyName);
			}
		}
	}
}

KeyboardEvent.prototype.subscribeToKeyPress = function(block, keyCode) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode, 0);

	var name;

	if (keyCode == 0) {
		name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);
	}
	else {
		name = KEYCODES.getStringFromKeyCode(keyCode);
	}
	

	if (this.keyPressSubscribedBlocks[name] == undefined) {
		this.keyPressSubscribedBlocks[name] = new Array();
	}

	if (this.keyPressSubscribedBlocks[name].indexOf(block) == -1) {
		this.keyPressSubscribedBlocks[name].push(block);
	}
}

KeyboardEvent.prototype.unsubscribeFromKeyPressForKeyCode = function(block, keyCode) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode, 0);

	var name;

	if (keyCode == 0) {
		name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);
	}
	else {
		name = KEYCODES.getStringFromKeyCode(keyCode);
	}
	
	if (this.keyPressSubscribedBlocks[name] != undefined) {
		var index = this.keyPressSubscribedBlocks[name].indexOf(block);
		if (index != -1) {
			this.keyPressSubscribedBlocks[name].splice(index,1);
		}
	}
}

KeyboardEvent.prototype.unsubscribeFromKeyPress = function(block) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);

	for (var name in this.keyPressSubscribedBlocks) {
		if (this.keyPressSubscribedBlocks[name] != undefined) {
			var index = this.keyPressSubscribedBlocks[name].indexOf(block);
			if (index != -1) {
				this.keyPressSubscribedBlocks[name].splice(index,1);
			}
		}
	}
}

KeyboardEvent.prototype.subscribeToKeyDown = function(block, keyCode) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode, 0);

	var name;

	if (keyCode == 0) {
		name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);
	}
	else {
		name = KEYCODES.getStringFromKeyCode(keyCode);
	}
	

	if (this.keyDownSubscribedBlocks[name] == undefined) {
		this.keyDownSubscribedBlocks[name] = new Array();
	}

	if (this.keyDownSubscribedBlocks[name].indexOf(block) == -1) {
		this.keyDownSubscribedBlocks[name].push(block);
	}
}

KeyboardEvent.prototype.unsubscribeFromKeyDownForKeyCode = function(block, keyCode) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode, 0);

	var name;

	if (keyCode == 0) {
		name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);
	}
	else {
		name = KEYCODES.getStringFromKeyCode(keyCode);
	}
	
	if (this.keyDownSubscribedBlocks[name] != undefined) {
		var index = this.keyDownSubscribedBlocks[name].indexOf(block);
		if (index != -1) {
			this.keyDownSubscribedBlocks[name].splice(index,1);
		}
	}
}

KeyboardEvent.prototype.unsubscribeFromKeyDown = function(block) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);

	for (var name in this.keyDownSubscribedBlocks) {
		if (this.keyDownSubscribedBlocks[name] != undefined) {
			var index = this.keyDownSubscribedBlocks[name].indexOf(block);
			if (index != -1) {
				this.keyDownSubscribedBlocks[name].splice(index,1);
			}
		}
	}
}

KeyboardEvent.prototype.subscribeToKeyUp = function(block, keyCode) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode, 0);

	var name;

	if (keyCode == 0) {
		name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);
	}
	else {
		name = KEYCODES.getStringFromKeyCode(keyCode);
	}

	if (this.keyUpSubscribedBlocks[name] == undefined) {
		this.keyUpSubscribedBlocks[name] = new Array();
	}

	if (this.keyUpSubscribedBlocks[name].indexOf(block) == -1) {
		this.keyUpSubscribedBlocks[name].push(block);
	}
}

KeyboardEvent.prototype.unsubscribeFromKeyUpForKeyCode = function(block, keyCode) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);
	keyCode = PARAMS.validateParam(PARAMS.INTEGER, keyCode, 0);

	var name;

	if (keyCode == 0) {
		name = KEYCODES.getStringFromKeyCode(KEYCODES.ANYKEY);
	}
	else {
		name = KEYCODES.getStringFromKeyCode(keyCode);
	}
	
	if (this.keyUpSubscribedBlocks[name] != undefined) {
		var index = this.keyUpSubscribedBlocks[name].indexOf(block);
		if (index != -1) {
			this.keyUpSubscribedBlocks[name].splice(index,1);
		}
	}
}

KeyboardEvent.prototype.unsubscribeFromKeyUp = function(block) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);

	for (var name in this.keyUpSubscribedBlocks) {
		if (this.keyUpSubscribedBlocks[name] != undefined) {
			var index = this.keyUpSubscribedBlocks[name].indexOf(block);
			if (index != -1) {
				this.keyUpSubscribedBlocks[name].splice(index,1);
			}
		}
	}
}

KeyboardEvent.prototype.subscribeToKeyCombination = function(block, keyCodes) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);
	keyCodes = PARAMS.validateParam(PARAMS.ARRAYOFINTEGER, keyCodes);

	var combinationName = KEYCODES.getStringFromKeyCodes(keyCodes);

	if (this.keyDownSubscribedBlocks[combinationName] == undefined) {
		this.keyDownSubscribedBlocks[combinationName] = new Array();
	}

	if (this.keyDownSubscribedBlocks[combinationName].indexOf(block) == -1) {
		this.keyDownSubscribedBlocks[combinationName].push(block);
	}
}

KeyboardEvent.prototype.unsubscribeFromKeyCombinationForKeyCodes = function(block, keyCodes) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);
	keyCodes = PARAMS.validateParam(PARAMS.ARRAYOFINTEGER, keyCodes);

	var combinationName = KEYCODES.getStringFromKeyCodes(keyCodes);
	
	if (this.keyDownSubscribedBlocks[combinationName] != undefined) {
		var index = this.keyDownSubscribedBlocks[combinationName].indexOf(block);
		if (index != -1) {
			this.keyDownSubscribedBlocks[combinationName].splice(index,1);
		}
	}
}

KeyboardEvent.prototype.unsubscribeFromKeyCombination = function(block) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.ACTORBLOCK, block);

	for (var name in this.keyDownSubscribedBlocks) {
		if (this.keyDownSubscribedBlocks[name] != undefined) {
			var index = this.keyDownSubscribedBlocks[name].indexOf(block);
			if (index != -1) {
				this.keyDownSubscribedBlocks[name].splice(index,1);
			}
		}
	}
}

KeyboardEvent.prototype.unsubscribe = function(block) {
	this.unsubscribeFromKeyPress(block);
	this.unsubscribeFromKeyDown(block);
	this.unsubscribeFromKeyUp(block);
	this.unsubscribeFromKeyCombination(block);
}