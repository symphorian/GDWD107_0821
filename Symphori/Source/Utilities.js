
/************************************************************
  Log utilities
************************************************************/
var Log = function() {
	this.logThreshold = 0;
	this.displayObjects = false;
	this.displayBlocks = false;

	this.VERBOSE = 0;
	this.INFO = 1;
	this.WARN = 2;
	this.ERROR = 3;
	this.FATAL = 4;
	this.SYSTEM = 5;
	this.NONE = 999;
}

Log.prototype.setLogThreshold = function(logType) {
	switch(logType) {
		case this.VERBOSE:
		case this.INFO:
		case this.WARN:
		case this.ERROR:
		case this.FATAL:
		case this.SYSTEM:
		case this.NONE:
			this.logThreshold = logType;
			break;

		default:
			this.logThreshold = this.VERBOSE;
			break;
	}
}

Log.prototype.setDisplayObjects = function(allowObjectLogging) {
	this.displayObjects = allowObjectLogging;
}

Log.prototype.setDisplayBlocks = function(allowBlockLogging) {
	this.displayBlocks = allowBlockLogging;
}

Log.prototype.write = function(message, logType) {
	var verifiedType = this.VERBOSE;
	var descriptor = "";
	switch(logType) {
		case this.VERBOSE:
			verifiedType = logType;
			descriptor += "VERBOSE: ";
			break;

		case this.INFO:
			verifiedType = logType;
			descriptor += "INFO: ";
			break; 

		case this.WARN:
			verifiedType = logType;
			descriptor += "WARN: ";
			break;

		case this.ERROR:
			verifiedType = logType;
			descriptor += "ERROR: ";
			break;

		case this.FATAL:
			verifiedType = logType;
			descriptor += "FATAL: ";
			break;

		case this.SYSTEM:
			verifiedType = logType;
			descriptor += "SYSTEM: ";
			break;

		default:
			break;
	}

	if (verifiedType >= this.logThreshold) {
		console.log(descriptor + message);
	}
}

Log.prototype.writeObject = function(obj, logType) {
	if (this.displayObjects) {
		var verifiedType = this.VERBOSE;
		var descriptor = "";
		switch(logType) {
			case this.VERBOSE:
				verifiedType = logType;
				descriptor += "VERBOSE: ";
				break;

			case this.INFO:
				verifiedType = logType;
				descriptor += "INFO: ";
				break; 

			case this.WARN:
				verifiedType = logType;
				descriptor += "WARN: ";
				break;

			case this.ERROR:
				verifiedType = logType;
				descriptor += "ERROR: ";
				break;

			case this.FATAL:
				verifiedType = logType;
				descriptor += "FATAL: ";
				break;

			case this.SYSTEM:
				verifiedType = logType;
				descriptor += "SYSTEM: ";
				break;

			default:
				break;
		}

		if (verifiedType >= this.logThreshold) {
			console.log(obj);
		}

		
	}
}

Log.prototype.writeBlock = function(block, logType, identity) {
	if (this.displayBlocks) {
		var verifiedType = this.VERBOSE;
		var descriptor = "";
		switch(logType) {
			case this.VERBOSE:
				verifiedType = logType;
				descriptor += "VERBOSE: ";
				break;

			case this.INFO:
				verifiedType = logType;
				descriptor += "INFO: ";
				break; 

			case this.WARN:
				verifiedType = logType;
				descriptor += "WARN: ";
				break;

			case this.ERROR:
				verifiedType = logType;
				descriptor += "ERROR: ";
				break;

			case this.FATAL:
				verifiedType = logType;
				descriptor += "FATAL: ";
				break;

			case this.SYSTEM:
				verifiedType = logType;
				descriptor += "SYSTEM: ";
				break;

			default:
				break;
		}

		if (verifiedType >= this.logThreshold) {
			if (identity == undefined) {
				console.log(block);
			}
			else {
				if (block.identity == identity) {
					console.log(block);
				}
			}
		}
	}
}

var LOG = new Log();


/***********************************************************
  KeyCodes Enums and Utilities
***********************************************************/
var KeyCodes = function() {
	this.A = 65;
	this.B = 66;
	this.C = 67;
	this.D = 68;
	this.E = 69;
	this.F = 70;
	this.G = 71;
	this.H = 72;
	this.I = 73;
	this.J = 74;
	this.K = 75;
	this.L = 76;
	this.M = 77;
	this.N = 78;
	this.O = 79;
	this.P = 80;
	this.Q = 81;
	this.R = 82;
	this.S = 83;
	this.T = 84;
	this.U = 85;
	this.V = 86;
	this.W = 87;
	this.X = 88;
	this.Y = 89;
	this.Z = 90;

	this.uppercaseKeyCodes = [this.A,this.B,this.C,this.D,this.E,this.F,this.G,this.H,this.I,this.J,this.K,this.L,this.M,this.N,this.O,this.P,this.Q,this.R,this.S,this.T,this.U,this.V,this.W,this.X,this.Y,this.Z];

	this.a = 97;
	this.b = 98;
	this.c = 99;
	this.d = 100;
	this.e = 101;
	this.f = 102;
	this.g = 103;
	this.h = 104;
	this.i = 105;
	this.j = 106;
	this.k = 107;
	this.l = 108;
	this.m = 109;
	this.n = 110;
	this.o = 111;
	this.p = 112;
	this.q = 113;
	this.r = 114;
	this.s = 115;
	this.t = 116;
	this.u = 117;
	this.v = 118;
	this.w = 119;
	this.x = 120;
	this.y = 121;
	this.z = 122;

	this.lowercaseKeyCodes = [this.a,this.b,this.c,this.d,this.e,this.f,this.g,this.h,this.i,this.j,this.k,this.l,this.m,this.n,this.o,this.p,this.q,this.r,this.s,this.t,this.u,this.v,this.w,this.x,this.y,this.z];

	this.ZERO = 48;
	this.ONE = 49;
	this.TWO = 50;
	this.THREE = 51;
	this.FOUR = 52;
	this.FIVE = 53;
	this.SIX = 54;
	this.SEVEN = 55;
	this.EIGHT = 56;
	this.NINE = 57;

	this.numericKeyCodes = [this.ZERO,this.ONE,this.TWO,this.THREE,this.FOUR,this.FIVE,this.SIX,this.SEVEN,this.EIGHT,this.NINE];

	this.SPACE = 32;
	this.ENTER = 13;
	//this.TAB = 9;
	//this.ESCAPE = 27;
	this.BACKSPACE = 8;
	this.SHIFT = 16;

	this.specialKeyCodes = [this.SPACE,this.ENTER,this.BACKSPACE,this.SHIFT];

	this.LEFT = 37;
	this.UP = 38;
	this.RIGHT = 39;
	this.DOWN = 40;

	this.arrowKeyCodes = [this.LEFT,this.UP,this.RIGHT,this.DOWN];

	this.ANYKEY = 999;
}

KeyCodes.prototype.getKeyCodeFromString = function(keyCodeName) {
	var keyCode = this[keyCodeName];

	if (keyCode == undefined) { keyCode = 0; }

	return keyCode;
}

KeyCodes.prototype.getKeyCodesFromString = function(keyCodeCombinationName) {
	var keyCodes = [];
	var combinationSplit = keyCodeCombinationName.split("|");

	for (var i = 0; i < combinationSplit.length; i++) {
		//keyCodes[i] = keyCodeCombinationName.charAt(i);
		keyCodes[i] = this.getKeyCodeFromString(combinationSplit[i]);
	}

	return keyCodes;
}

KeyCodes.prototype.getStringFromKeyCode = function(keyCode) {
	for (var name in this) {
		if (this[name] == keyCode) {
			return name;
		}
	}

	return "";
}

KeyCodes.prototype.getStringFromKeyCodes = function(keyCodes) {
	var name = "";
	keyCodes.sort();
	var filteredKeyCodes = new Array();

	for (var i = 0; i < keyCodes.length; i++) {
		if (filteredKeyCodes.indexOf(keyCodes[i]) == -1) {
			filteredKeyCodes.push(keyCodes[i]);
			if (name != "") name += "|";
			name += this.getStringFromKeyCode(keyCodes[i]);
		}
	}

	return name;
}

KeyCodes.prototype.isKeyCodeUppercase = function(keycode) {
	for (var i = 0; i < this.uppercaseKeyCodes.length; i++) {
		if (this.uppercaseKeyCodes[i] == keycode) {
			return true;
		}
	}
	return false;
}

KeyCodes.prototype.isKeyCodeLowercase = function(keycode) {
	for (var i = 0; i < this.lowercaseKeyCodes.length; i++) {
		if (this.lowercaseKeyCodes[i] == keycode) {
			return true;
		}
	}
	return false;
}

KeyCodes.prototype.isKeyCodeAlphabetic = function(keycode) {
	return (this.isKeyCodeUppercase(keycode) || this.isKeyCodeLowercase(keycode));
}

KeyCodes.prototype.isKeyCodeNumeric = function(keycode) {
	for (var i = 0; i < this.numericKeyCodes.length; i++) {
		if (this.numericKeyCodes[i] == keycode) {
			return true;
		}
	}
	return false;
}

KeyCodes.prototype.isKeyCodeSpecial = function(keycode) {
	for (var i = 0; i < this.specialKeyCodes.length; i++) {
		if (this.specialKeyCodes[i] == keycode) {
			return true;
		}
	}
	return false;
}

KeyCodes.prototype.isKeyCodeArrow = function(keycode) {
	for (var i = 0; i < this.arrowKeyCodes.length; i++) {
		if (this.arrowKeyCodes[i] == keycode) {
			return true;
		}
	}
	return false;
}

var KEYCODES = new KeyCodes();


/***************************************************************
  Common Utilities
***************************************************************/
var Common = function() { } 

Common.prototype.getFunctionName = function(functionObject) {
	var functionString = String(functionObject);
	var firstIndex = functionString.indexOf(' ') + 1;
	var lastIndex = functionString.indexOf('(');

	return functionString.substring(firstIndex, lastIndex);
}

Common.prototype.copyArray = function(src, dest) {
	for (var i = 0; i < src.length; i++) {
		dest[i] = src[i];
	}
	return dest;
}

Common.prototype.extend = function(srcObj, destObj) {
	for (var prop in srcObj) {
		destObj[prop] = srcObj[prop];
	}
}

Common.prototype.extendInternalProperties = function(srcObj, destObj) {
	for (var prop in srcObj) {
		if (prop.charAt(0) == "_" || !(srcObj[prop] instanceof Function || typeof srcObj[prop] == "function")) {
			destObj[prop] = srcObj[prop];
		}
	}
}

var COMMON = new Common();


/**************************************************************
  Utilities to help with measuring and drawing text
**************************************************************/
var TextHelper = function() {
	this.span = document.createElement("span");
	this.block = document.createElement("div");
	this.block.style.display = "inline-block";
	this.block.width = "1px";
	this.block.height = "0px";
	//this.block.textContent = "test";
	this.div = document.createElement("div");
	this.div.appendChild(this.span);
	this.div.appendChild(this.block);

	this.div.style.display = "none";
}

TextHelper.prototype.measureTextHeight = function(text, font, size) {

	if (this.div.parentNode != document.body) {
		document.body.appendChild(this.div);
	}

	this.div.style.display = "inline";

	this.span.style.font = size + "px " + font;
	this.span.textContent = text;

  	var result = {};

  	try {

	    this.block.style.verticalAlign = "baseline";
	    result.ascent = this.block.offsetTop - this.span.offsetTop;

	    this.block.style.verticalAlign = "bottom";
	    result.height = this.block.offsetTop - this.span.offsetTop;

	    result.descent = result.height - result.ascent;

  	} finally {
    	this.div.style.display = "none";
  	}

  	return result;

}

var TEXTHELPER = new TextHelper();


/*****************************************************************
  Matrix utilities
*****************************************************************/
var Matrix = function() {
	this.transformations = new Array();
	this.result = {x:0,y:0,z:0};
}

Matrix.prototype.addTranslation = function(dx,dy) {
	var m = new Object();
	m.r0c0 = 1;
	m.r0c1 = 0;
	m.r0c2 = dx;
	m.r1c0 = 0;
	m.r1c1 = 1;
	m.r1c2 = dy;
	m.r2c0 = 0;
	m.r2c1 = 0;
	m.r2c2 = 1;

	this.transformations.push(m);
}

Matrix.prototype.addScale = function(sx,sy) {
	var m = new Object();
	m.r0c0 = sx;
	m.r0c1 = 0;
	m.r0c2 = 0;
	m.r1c0 = 0;
	m.r1c1 = sy;
	m.r1c2 = 0;
	m.r2c0 = 0;
	m.r2c1 = 0;
	m.r2c2 = 1;

	this.transformations.push(m);
}

Matrix.prototype.addRotation = function(degrees) {
	var r = degrees*Math.PI/180;
	var m = new Object();
	m.r0c0 = Math.cos(r);
	m.r0c1 = -Math.sin(r);
	m.r0c2 = 0;
	m.r1c0 = Math.sin(r);
	m.r1c1 = Math.cos(r);
	m.r1c2 = 0;
	m.r2c0 = 0;
	m.r2c1 = 0;
	m.r2c2 = 1;

	this.transformations.push(m);
}

Matrix.prototype.clearTransformations = function() {
	this.transformations.splice(0,this.transformations.length);
}

Matrix.prototype.applyTransformation = function(x,y) {
	var cm = this.transformations.pop();

	var nm;
	while(this.transformations.length > 0) {
		nm = this.transformations.pop();

		var r0c0 = cm.r0c0*nm.r0c0 + cm.r0c1*nm.r1c0 + cm.r0c2*nm.r2c0;
		var r0c1 = cm.r0c0*nm.r0c1 + cm.r0c1*nm.r1c1 + cm.r0c2*nm.r2c1;
		var r0c2 = cm.r0c0*nm.r0c2 + cm.r0c1*nm.r1c2 + cm.r0c2*nm.r2c2;

		var r1c0 = cm.r1c0*nm.r0c0 + cm.r1c1*nm.r1c0 + cm.r1c2*nm.r2c0;
		var r1c1 = cm.r1c0*nm.r0c1 + cm.r1c1*nm.r1c1 + cm.r1c2*nm.r2c1;
		var r1c2 = cm.r1c0*nm.r0c2 + cm.r1c1*nm.r1c2 + cm.r1c2*nm.r2c2;

		var r2c0 = cm.r2c0*nm.r0c0 + cm.r2c1*nm.r1c0 + cm.r2c2*nm.r2c0;
		var r2c1 = cm.r2c0*nm.r0c1 + cm.r2c1*nm.r1c1 + cm.r2c2*nm.r2c1;
		var r2c2 = cm.r2c0*nm.r0c2 + cm.r2c1*nm.r1c2 + cm.r2c2*nm.r2c2;

		cm.r0c0 = r0c0;
		cm.r0c1 = r0c1;
		cm.r0c2 = r0c2;

		cm.r1c0 = r1c0;
		cm.r1c1 = r1c1;
		cm.r1c2 = r1c2;

		cm.r2c0 = r2c0;
		cm.r2c1 = r2c1;
		cm.r2c2 = r2c2;
	}

	this.transformations.push(cm);

	this.result.x = x*cm.r0c0 + y*cm.r0c1 + 1*cm.r0c2;
	this.result.y = x*cm.r1c0 + y*cm.r1c1 + 1*cm.r1c2;
	this.result.z = x*cm.r2c0 + y*cm.r2c1 + 1*cm.r2c2;

	return {x:this.result.x, y:this.result.y, z:this.result.z};
}

Matrix.prototype.debugApplyTransformation = function(x,y) {
	var cm = this.transformations.shift();

	var newX;
	var newY;
	var newZ;

	newX = x*cm.r0c0 + y*cm.r0c1 + 1*cm.r0c2;
	newY = x*cm.r1c0 + y*cm.r1c1 + 1*cm.r1c2;
	newZ = x*cm.r2c0 + y*cm.r2c1 + 1*cm.r2c2;

	oldX = newX;
	oldY = newY;
	oldZ = newZ;

	while(this.transformations.length > 0) {
		cm = this.transformations.shift();

		newX = oldX*cm.r0c0 + oldY*cm.r0c1 + 1*cm.r0c2;
		newY = oldX*cm.r1c0 + oldY*cm.r1c1 + 1*cm.r1c2;
		newZ = oldX*cm.r2c0 + oldY*cm.r2c1 + 1*cm.r2c2;

		oldX = newX;
		oldY = newY;
		oldZ = newZ;
	}

	return {x:newX, y:newY, z:newZ};
}

var MATRIX = new Matrix();


/**************************************************************
  Utilities to help with parameter validation
**************************************************************/
var Params = function() {
	this.NONE = -1;
	this.BOOLEAN = 0;
	this.UNSIGNEDINTEGER = 1;
	this.INTEGER = 2;
	this.NUMBER = 3;
	this.STRING = 4;
	this.FUNCTION = 5;
	this.OBJECT = 6;
	this.CANVAS2DCONTEXT = 7;
	this.TRAITS = 8;
	this.MEMORY = 9;
	this.MATRIX = 10;
	this.EVENT = 11;
	this.BLOCKEVENT = 12;
	this.MOUSEEVENT = 13;
	this.KEYBOARDEVENT = 14;
	this.CANVASFRAME = 15;
	this.BLOCK = 20;
	this.ACTORBLOCK = 21;
	this.PLAYERBLOCK = 22;
	this.SOUNDBLOCK = 23;
	this.STEREOBLOCK = 24;
	this.VIDEOBLOCK = 25;
	this.MOVIEBLOCK = 26;
	this.CINEMABLOCK = 27;
	this.TEXTBLOCK = 28;
	this.PARAGRAPHBLOCK = 29;
	this.IMAGETEXTBLOCK = 30;
	this.IMAGEPARAGRAPHBLOCK = 31;
	this.ARRAY = 49;
	this.ARRAYOFBOOLEAN = 50;
	this.ARRAYOFUNSIGNEDINTEGER = 51;
	this.ARRAYOFINTEGER = 52;
	this.ARRAYOFNUMBER = 53;
	this.ARRAYOFSTRING = 54;
	this.ARRAYOFFUNCTION = 55;
	this.ARRAYOFOBJECT = 56;
	this.ARRAYOFCANVAS2DCONTEXT = 57;
	this.ARRAYOFTRAITS = 58;
	this.ARRAYOFMEMORY = 59;
	this.ARRAYOFMATRIX = 60;
	this.ARRAYOFBLOCK = 61;
	this.ARRAYOFACTORBLOCK = 62;
	this.ARRAYOFPLAYERBLOCK = 63;
	this.ARRAYOFSOUNDBLOCK = 64;
	this.ARRAYOFSTEREOBLOCK = 65;
	this.ARRAYOFVIDEOBLOCK = 66;
	this.ARRAYOFMOVIEBLOCK = 67;
	this.ARRAYOFCINEMABLOCK = 68;
	this.ARRAYOFTEXTBLOCK = 69;
	this.ARRAYOFPARAGRAPHBLOCK = 70;
	this.ARRAYOFIMAGETEXTBLOCK = 71;
	this.ARRAYOFIMAGEPARAGRAPHBLOCK = 72;
	this.REST = 99;

	this.typeNames = new Object();
	this.typeNames[this.NONE] = "NONE";
	this.typeNames[this.BOOLEAN] = "Boolean";
	this.typeNames[this.UNSIGNEDINTEGER] = "UnsignedInteger";
	this.typeNames[this.INTEGER] = "Integer";
	this.typeNames[this.NUMBER] = "Number";
	this.typeNames[this.STRING] = "String";
	this.typeNames[this.FUNCTION] = "Function";
	this.typeNames[this.OBJECT] = "Object";
	this.typeNames[this.CANVAS2DCONTEXT] = "Canvas2DContext";

	this.typeNames[this.TRAITS] = "Traits";
	this.typeNames[this.MEMORY] = "Memory";
	this.typeNames[this.MATRIX] = "Matrix";
	this.typeNames[this.EVENT] = "Event";
	this.typeNames[this.BLOCKEVENT] = "BlockEvent";
	this.typeNames[this.MOUSEEVENT] = "MouseEvent";
	this.typeNames[this.KEYBOARDEVENT] = "KeyboardEvent";
	this.typeNames[this.CANVASFRAME] = "CanvasFrame";
	this.typeNames[this.BLOCK] = "Block";
	this.typeNames[this.ACTORBLOCK] = "ActorBlock";
	this.typeNames[this.PLAYERBLOCK] = "PlayerBlock";
	this.typeNames[this.SOUNDBLOCK] = "SoundBlock";
	this.typeNames[this.STEREOBLOCK] = "StereoBlock";
	this.typeNames[this.VIDEOBLOCK] = "VideoBlock";
	this.typeNames[this.MOVIEBLOCK] = "MovieBlock";
	this.typeNames[this.CINEMABLOCK] = "CinemaBlock";
	this.typeNames[this.TEXTBLOCK] = "TextBlock";
	this.typeNames[this.PARAGRAPHBLOCK] = "ParagraphBlock";
	this.typeNames[this.IMAGETEXTBLOCK] = "ImageTextBlock";
	this.typeNames[this.IMAGEPARAGRAPHBLOCK] = "ImageParagraphBlock";
	this.typeNames[this.ARRAY] = "Array";
	this.typeNames[this.ARRAYOFBOOLEAN] = "Array of Booleans";
	this.typeNames[this.ARRAYOFUNSIGNEDINTEGER] = "Array of UnsignedIntegers";
	this.typeNames[this.ARRAYOFINTEGER] = "Array of Integers";
	this.typeNames[this.ARRAYOFNUMBER] = "Array of Numbers";
	this.typeNames[this.ARRAYOFSTRING] = "Array of Strings";
	this.typeNames[this.ARRAYOFFUNCTION] = "Array of Functions";
	this.typeNames[this.ARRAYOFOBJECT] = "Array of Objects";
	this.typeNames[this.ARRAYOFCANVAS2DCONTEXT] = "Array of Canvas2DContexts";
	this.typeNames[this.ARRAYOFTRAITS] = "Array of Traits";
	this.typeNames[this.ARRAYOFMEMORY] = "Array of Memorys";
	this.typeNames[this.ARRAYOFMATRIX] = "Array of Matrixs";
	this.typeNames[this.ARRAYOFBLOCK] = "Array of Blocks";
	this.typeNames[this.ARRAYOFACTORBLOCK] = "Array of ActorBlocks";
	this.typeNames[this.ARRAYOFPLAYERBLOCK] = "Array of PlayerBlocks";
	this.typeNames[this.ARRAYOFSOUNDBLOCK] = "Array of SoundBlocks";
	this.typeNames[this.ARRAYOFSTEREOBLOCK] = "Array of StereoBlocks";
	this.typeNames[this.ARRAYOFVIDEOBLOCK] = "Array of VideoBlocks";
	this.typeNames[this.ARRAYOFMOVIEBLOCK] = "Array of MovieBlocks";
	this.typeNames[this.ARRAYOFCINEMABLOCK] = "Array of CinemaBlocks";
	this.typeNames[this.ARRAYOFTEXTBLOCK] = "Array of TextBlocks";
	this.typeNames[this.ARRAYOFPARAGRAPHBLOCK] = "Array of ParagraphBlocks";
	this.typeNames[this.ARRAYOFIMAGETEXTBLOCK] = "Array of ImageTextBlocks";
	this.typeNames[this.ARRAYOFIMAGEPARAGRAPHBLOCK] = "Array of ImageParagraphBlocks";

	this.typeDefaults = new Object();
	this.typeDefaults[this.NONE] = undefined;
	this.typeDefaults[this.BOOLEAN] = false;
	this.typeDefaults[this.UNSIGNEDINTEGER] = 0;
	this.typeDefaults[this.INTEGER] = 0;
	this.typeDefaults[this.NUMBER] = 0;
	this.typeDefaults[this.STRING] = "";
	this.typeDefaults[this.FUNCTION] = null;
	this.typeDefaults[this.OBJECT] = null;
	this.typeDefaults[this.CANVAS2DCONTEXT] = null;
	this.typeDefaults[this.TRAITS] = null;
	this.typeDefaults[this.MEMORY] = null;
	this.typeDefaults[this.MATRIX] = null;
	this.typeDefaults[this.EVENT] = null;
	this.typeDefaults[this.BLOCKEVENT] = null;
	this.typeDefaults[this.MOUSEEVENT] = null;
	this.typeDefaults[this.KEYBOARDEVENT] = null;
	this.typeDefaults[this.CANVASFRAME] = null;
	this.typeDefaults[this.BLOCK] = null;
	this.typeDefaults[this.ACTORBLOCK] = null;
	this.typeDefaults[this.PLAYERBLOCK] = null;
	this.typeDefaults[this.SOUNDBLOCK] = null;
	this.typeDefaults[this.STEREOBLOCK] = null;
	this.typeDefaults[this.VIDEOBLOCK] = null;
	this.typeDefaults[this.MOVIEBLOCK] = null;
	this.typeDefaults[this.CINEMABLOCK] = null;
	this.typeDefaults[this.TEXTBLOCK] = null;
	this.typeDefaults[this.PARAGRAPHBLOCK] = null;
	this.typeDefaults[this.IMAGETEXTBLOCK] = null;
	this.typeDefaults[this.IMAGEPARAGRAPHBLOCK] = null;
	this.typeDefaults[this.ARRAYOFBOOLEAN] = null;
	this.typeDefaults[this.ARRAYOFUNSIGNEDINTEGER] = null;
	this.typeDefaults[this.ARRAYOFINTEGER] = null;
	this.typeDefaults[this.ARRAYOFNUMBER] = null;
	this.typeDefaults[this.ARRAYOFSTRING] = null;
	this.typeDefaults[this.ARRAYOFFUNCTION] = null;
	this.typeDefaults[this.ARRAYOFOBJECT] = null;
	this.typeDefaults[this.ARRAYOFCANVAS2DCONTEXT] = null;
	this.typeDefaults[this.ARRAYOFTRAITS] = null;
	this.typeDefaults[this.ARRAYOFMEMORY] = null;
	this.typeDefaults[this.ARRAYOFMATRIX] = null;

	this.typeDefaults[this.ARRAY] = null;
	this.typeDefaults[this.ARRAYOFBLOCK] = null;
	this.typeDefaults[this.ARRAYOFACTORBLOCK] = null;
	this.typeDefaults[this.ARRAYOFPLAYERBLOCK] = null;
	this.typeDefaults[this.ARRAYOFSOUNDBLOCK] = null;
	this.typeDefaults[this.ARRAYOFSTEREOBLOCK] = null;
	this.typeDefaults[this.ARRAYOFVIDEOBLOCK] = null;
	this.typeDefaults[this.ARRAYOFMOVIEBLOCK] = null;
	this.typeDefaults[this.ARRAYOFCINEMABLOCK] = null;
	this.typeDefaults[this.ARRAYOFTEXTBLOCK] = null;
	this.typeDefaults[this.ARRAYOFPARAGRAPHBLOCK] = null;
	this.typeDefaults[this.ARRAYOFIMAGETEXTBLOCK] = null;
	this.typeDefaults[this.ARRAYOFIMAGEPARAGRAPHBLOCK] = null;

	this.associatedTypes = new Object();
	this.associatedTypes[this.ARRAYOFBOOLEAN] = this.BOOLEAN;
	this.associatedTypes[this.ARRAYOFUNSIGNEDINTEGER] = this.UNSIGNEDINTEGER;
	this.associatedTypes[this.ARRAYOFINTEGER] = this.INTEGER;
	this.associatedTypes[this.ARRAYOFNUMBER] = this.NUMBER;
	this.associatedTypes[this.ARRAYOFSTRING] = this.STRING;
	this.associatedTypes[this.ARRAYOFFUNCTION] = this.FUNCTION;
	this.associatedTypes[this.ARRAYOFOBJECT] = this.OBJECT;
	this.associatedTypes[this.ARRAYOFCANVAS2DCONTEXT] = this.CANVAS2DCONTEXT;
	this.associatedTypes[this.ARRAYOFTRAITS] = this.TRAITS;
	this.associatedTypes[this.ARRAYOFMEMORY] = this.MEMORY;
	this.associatedTypes[this.ARRAYOFMATRIX] = this.MATRIX;
	this.associatedTypes[this.ARRAYOFBLOCK] = this.BLOCK;
	this.associatedTypes[this.ARRAYOFACTORBLOCK] = this.ACTORBLOCK;
	this.associatedTypes[this.ARRAYOFPLAYERBLOCK] = this.PLAYERBLOCK;
	this.associatedTypes[this.ARRAYOFSOUNDBLOCK] = this.SOUNDBLOCK;
	this.associatedTypes[this.ARRAYOFSTEREOBLOCK] = this.STEREOBLOCK;
	this.associatedTypes[this.ARRAYOFVIDEOBLOCK] = this.VIDEOBLOCK;
	this.associatedTypes[this.ARRAYOFMOVIEBLOCK] = this.MOVIEBLOCK;
	this.associatedTypes[this.ARRAYOFCINEMABLOCK] = this.CINEMABLOCK;
	this.associatedTypes[this.ARRAYOFTEXTBLOCK] = this.TEXTBLOCK;
	this.associatedTypes[this.ARRAYOFPARAGRAPHBLOCK] = this.PARAGRAPHBLOCK;
	this.associatedTypes[this.ARRAYOFIMAGETEXTBLOCK] = this.IMAGETEXTBLOCK;
	this.associatedTypes[this.ARRAYOFIMAGEPARAGRAPHBLOCK] = this.IMAGEPARAGRAPHBLOCK;

	this.currentFunctionName = "";
	this.currentParamIndex = 0;

}

// gets the class name and function name of the caller of the function that called this function
// e.g. MovieBlock.addColorFilter
Params.prototype.getCallerClassNameFunctionName = function() {
	var e = new Error("");
	if (e.stack == null) {
		return " . "
	}
	else if (e.stack.indexOf("    at ") >= 0) {
		return e.stack.split("    at ")[3].split(" ")[0]; // this doesn't capture 'new BlockEvent', just 'new'
	}
	else if (e.stack.indexOf("@") >= 0) {
		return e.stack.split(/\s/)[2].split("@")[0]; // this only captures 'BlockEvent', 'new' is not included
	}
	else {
		return " . ";
	}
}

// gets the function name of the caller of the function that called this function
Params.prototype.getCallerFunctionName = function() {
	return getCallerClassNameFunctionName().split(".")[1];
}

Params.prototype.getDefaultOrNullValue = function(defaultValue) {
	return typeof defaultValue !== "undefined" ? defaultValue : null;
}

Params.prototype.createParamValidationMessage = function(typeEnum, value, innerMessage) {
	if (innerMessage == undefined) {
		innerMessage = "";
	}
	return "Function '" + this.currentFunctionName + "' was expecting a value of type {" + this.typeNames[typeEnum] + "} for parameter (" + this.currentParamIndex + "), but the value '" + value + "' was passed in." + innerMessage;
}

Params.prototype.createArrayParamValidationMessage = function(typeEnum, value, innerMessage) {
	if (innerMessage == undefined) {
		innerMessage = "";
	}
	return "Function '" + this.currentFunctionName + "' was expecting a value of type {" + this.typeNames[typeEnum] + "} for parameter (" + this.currentParamIndex + "), but the value '[" + value + "]' was passed in." + innerMessage;
}

Params.prototype.createArrayParamInnerValidationMessage = function(typeEnum, index, value) {
	return "\n\t\tFunction '" + this.currentFunctionName + "' was expecting a value of type {" + this.typeNames[typeEnum] + "} for parameter (" + this.currentParamIndex + "), but the element value at index [" + index + "]  was '" + value + "'. ";
}

Params.prototype.createArrayParamHeaderValidationMessage = function() {
	return "\n\tArray validation results: ";
}

Params.prototype.initializeValidation = function(customFunctionName) {
	if (customFunctionName == undefined) {
		this.currentFunctionName = LOG.logThreshold <= LOG.WARN ? this.getCallerClassNameFunctionName() : "";
	}
	else {
		this.currentFunctionName = customFunctionName;
	}
	
	this.currentParamIndex = 0;
}

Params.prototype.isTypeOf = function(value, typeEnum) {
	switch(typeEnum) {
		case this.BOOLEAN:
			return typeof value == "boolean";
			break;

		case this.UNSIGNEDINTEGER:
			if (typeof value == "number") {
				return value % 1 == 0 && value >= 0;
			}
			else {
				return false;
			}
			break;

		case this.INTEGER:
			if (typeof value == "number") {
				return value % 1 == 0;
			}
			else {
				return false;
			}
			break;

		case this.NUMBER:
			return typeof value == "number";
			break;

		case this.STRING:
			return value instanceof String || typeof value == "string";
			break;

		case this.FUNCTION:
			return value instanceof Function || typeof value == "function";
			break;

		case this.OBJECT:
			return value instanceof Object && typeof value == "object";
			break;

		case this.CANVAS2DCONTEXT:
			return value instanceof CanvasRenderingContext2D;
			break;

		case this.TRAITS:
			return value.prototype instanceof Traits;
			break;

		case this.MEMORY:
			return value instanceof Memory;
			break;

		case this.MATRIX:
			return value instanceof Matrix;
			break;

		case this.EVENT:
			return value instanceof Event;
			break;

		case this.BLOCKEVENT:
			return value instanceof BlockEvent;
			break;

		case this.MOUSEEVENT:
			var result = value instanceof MouseEvent;
			return value instanceof MouseEvent;
			break;

		case this.KEYBOARDEVENT:
			return value instanceof KeyboardEvent;
			break;

		case this.CANVASFRAME:
			return value instanceof CanvasFrame;
			break;

		case this.BLOCK:
			return value instanceof Block;
			break;

		case this.ACTORBLOCK:
			return value instanceof ActorBlock;
			break;

		case this.PLAYERBLOCK:
			return value instanceof PlayerBlock;
			break;

		case this.SOUNDBLOCK:
			return value instanceof SoundBlock;
			break;

		case this.STEREOBLOCK:
			return value instanceof StereoBlock;
			break;

		case this.VIDEOBLOCK:
			return value instanceof VideoBlock;
			break;

		case this.MOVIEBLOCK:
			return value instanceof MovieBlock;
			break;

		case this.CINEMABLOCK:
			return value instanceof CinemaBlock;
			break;

		case this.TEXTBLOCK:
			return value instanceof TextBlock;
			break;

		case this.PARAGRAPHBLOCK:
			return value instanceof ParagraphBlock;
			break;

		case this.IMAGETEXTBLOCK:
			return value instanceof ImageTextBlock;
			break;

		case this.IMAGEPARAGRAPHBLOCK:
			return value instanceof ImageParagraphBlock;
			break;

		case this.ARRAY:
			return value instanceof Array;
			break;
	}
}

Params.prototype.validateValue = function(typeEnum, value, defaultValue) {
	var validatedValue;
	var message = "";
	if (this.isTypeOf(value,typeEnum)) {
		validatedValue = value;
	}
	else {
		validatedValue = defaultValue; //this.getDefaultOrNullValue(defaultValue);
		message = this.createParamValidationMessage(typeEnum, value);
	}

	return {validatedValue:validatedValue, message:message};
}

Params.prototype.validateArray = function(typeEnum, value, defaultValue) {
	var validatedValue;
	var message = "";
	var innerMessage = "";
	if (value instanceof Array) {
		var allValuesValidated = true;
		for (var i = 0; i < value.length; i++) {
			if (this.isTypeOf(value[i],typeEnum)) {}
			else {
				allValuesValidated = false;
				innerMessage += this.createArrayParamInnerValidationMessage(typeEnum, i, value[i]);
			}
		}
		if (innerMessage != "") {
			innerMessage = this.createArrayParamHeaderValidationMessage() + innerMessage;
		}
		if (allValuesValidated) {
			validatedValue = value;
		}
		else {
			validatedValue = defaultValue; //this.getDefaultOrNullValue(defaultValue);
			message = this.createArrayParamValidationMessage(typeEnum, value, innerMessage);
		}
		
	}
	else {
		validatedValue = defaultValue; //this.getDefaultOrNullValue(defaultValue);
		message = this.createParamValidationMessage(typeEnum, value);
	}

	return {validatedValue:validatedValue, message:message};
}

Params.prototype.validateParam = function(typeEnum, value, defaultValue) {
	var validatedValue;
	var message = "";
	var innerMessage = "";
	var valuesCorrectedInArray = false;
	var validationResult;
	switch(typeEnum) {
		case this.BOOLEAN:
		case this.NUMBER:
		case this.STRING:
		case this.FUNCTION:
		case this.OBJECT:
		case this.CANVAS2DCONTEXT:
		case this.MEMORY:
		case this.TRAITS:
		case this.MATRIX:
		case this.EVENT:
		case this.BLOCKEVENT:
		case this.MOUSEEVENT:
		case this.KEYBOARDEVENT:
		case this.CANVASFRAME:
		case this.BLOCK:
		case this.ACTORBLOCK:
		case this.PLAYERBLOCK:
		case this.SOUNDBLOCK:
		case this.STEREOBLOCK:
		case this.VIDEOBLOCK:
		case this.MOVIEBLOCK:
		case this.CINEMABLOCK:
		case this.TEXTBLOCK:
		case this.PARAGRAPHBLOCK:
		case this.IMAGETEXTBLOCK:
		case this.IMAGEPARAGRAPHBLOCK:
		case this.ARRAY:
			var validationResult = this.validateValue(typeEnum, value, defaultValue);
			validatedValue = validationResult.validatedValue;
			message = validationResult.message;
			break;

		case this.UNSIGNEDINTEGER:
			if (typeof value == "number") {
				if (value % 1 == 0 && value >= 0) {
					validatedValue = value;
				}
				else {
					validatedValue = Math.abs(Math.round(value));
					message = this.createParamValidationMessage(typeEnum, value);
				}
			}
			else {
				validatedValue = defaultValue; //this.getDefaultOrNullValue(defaultValue);
				message = this.createParamValidationMessage(typeEnum, value);
			}
			break;

		case this.INTEGER:
			if (typeof value == "number") {
				if (value % 1 == 0) {
					validatedValue = value;
				}
				else {
					validatedValue = Math.round(value);
					message = this.createParamValidationMessage(typeEnum, value);
				}
			}
			else {
				validatedValue = defaultValue; //this.getDefaultOrNullValue(defaultValue);
				message = this.createParamValidationMessage(typeEnum, value);
			}
			break;

		case this.ARRAYOFBOOLEAN:
		case this.ARRAYOFNUMBER:
		case this.ARRAYOFSTRING:
		case this.ARRAYOFFUNCTION:
		case this.ARRAYOFOBJECT:
		case this.ARRAYOFCANVAS2DCONTEXT:
		case this.ARRAYOFMEMORY:
		case this.ARRAYOFTRAITS:
		case this.ARRAYOFMATRIX:
		case this.ARRAYOFBLOCK:
		case this.ARRAYOFACTORBLOCK:
		case this.ARRAYOFPLAYERBLOCK:
		case this.ARRAYOFSOUNDBLOCK:
		case this.ARRAYOFSTEREOBLOCK:
		case this.ARRAYOFVIDEOBLOCK:
		case this.ARRAYOFMOVIEBLOCK:
		case this.ARRAYOFCINEMABLOCK:
		case this.ARRAYOFTEXTBLOCK:
		case this.ARRAYOFPARAGRAPHBLOCK:
		case this.ARRAYOFIMAGETEXTBLOCK:
		case this.ARRAYOFIMAGEPARAGRAPHBLOCK:
			var validationResult = this.validateArray(this.associatedTypes[typeEnum], value, defaultValue);
			validatedValue = validationResult.validatedValue;
			message = validationResult.message;
			break;

		case this.ARRAYOFUNSIGNEDINTEGER:
			if (value instanceof Array) {
				var allValuesValidated = true;
				for (var i = 0; i < value.length; i++) {
					if (typeof value[i] == "number") {
						if (value[i] % 1 == 0 && value[i] >= 0) {}
						else {
							if (message == "") {
								message = this.createArrayParamValidationMessage(typeEnum,value);
							}
							innerMessage += this.createArrayParamInnerValidationMessage(typeEnum, i, value[i]);
							value[i] = Math.abs(Math.round(value[i]));
							valuesCorrectedInArray = true;
						}
					}
					else {
						allValuesValidated = false;
						innerMessage += this.createArrayParamInnerValidationMessage(typeEnum, i, value[i]);
					}
				}
				if (innerMessage != "") {
					innerMessage = this.createArrayParamHeaderValidationMessage() + innerMessage;
				}
				if (allValuesValidated) {
					validatedValue = value;
					if (innerMessage != "") {
						message = message + " {Number} values will be rounded to {Integer} values and signed values will be stripped of their signs." + innerMessage;
					}
				}
				else {
					validatedValue = defaultValue; //this.getDefaultOrNullValue(defaultValue);
					message = this.createArrayParamValidationMessage(typeEnum, value, innerMessage);
				}
				
			}
			else {
				validatedValue = defaultValue; //this.getDefaultOrNullValue(defaultValue);
				message = this.createParamValidationMessage(typeEnum, value);
			}
			break;

		case this.ARRAYOFINTEGER:
			if (value instanceof Array) {
				var allValuesValidated = true;
				for (var i = 0; i < value.length; i++) {
					if (typeof value[i] == "number") {
						if (value[i] % 1 == 0) {}
						else {
							if (message == "") {
								message = this.createArrayParamValidationMessage(typeEnum,value);
							}
							innerMessage += this.createArrayParamInnerValidationMessage(typeEnum, i, value[i]);
							value[i] = Math.round(value[i]);
							valuesCorrectedInArray = true;
						}
					}
					else {
						allValuesValidated = false;
						innerMessage += this.createArrayParamInnerValidationMessage(typeEnum, i, value[i]);
					}
				}
				if (innerMessage != "") {
					innerMessage = this.createArrayParamHeaderValidationMessage() + innerMessage;
				}
				if (allValuesValidated) {
					validatedValue = value;
					if (innerMessage != "") {
						message = message + " {Number} values will be rounded to {Integer} values." + innerMessage;
					}
				}
				else {
					validatedValue = defaultValue; //this.getDefaultOrNullValue(defaultValue);
					message = this.createArrayParamValidationMessage(typeEnum, value, innerMessage);
				}
				
			}
			else {
				validatedValue = defaultValue; //this.getDefaultOrNullValue(defaultValue);
				message = this.createParamValidationMessage(typeEnum, value);
			}
			break;
	}

	if (message != "") {
		if (typeof validatedValue == "undefined") {
			if (typeEnum < this.ARRAYOFBOOLEAN) {
				validatedValue = this.typeDefaults[typeEnum];
			}
			else {
				validatedValue = [];
			}
			
		}
		if (value != validatedValue || validatedValue == defaultValue || valuesCorrectedInArray) {
			if (typeEnum < this.ARRAYOFBOOLEAN) {
				message = message + " Using a value of '" + validatedValue + "' instead.";
			}
			else if (validatedValue instanceof Array) {
				if (validatedValue.length == 0) {
					message = message + "\n\tUsing a value of '[]' for Array object instead.";
				}
				else {
					message = message + "\n\tUsing a value of '[" + validatedValue + "]' for Array object instead.";
				}
			}
			else {
				message = message + "\n\tUsing a value of '" + validatedValue + "' for Array object instead.";
			}
		}
		LOG.write(message, LOG.WARN);
	}

	this.currentParamIndex++;
	
	return validatedValue;
}

// defaultList should match in count to arguments if passed in to function
Params.prototype.validateArguments = function(typeList,argumentsList,defaultList) {
	defaultList = typeof defaultList !== "undefined" ? defaultList : [];

	var functionName = LOG.logThreshold <= LOG.WARN ? this.getCallerClassNameFunctionName() : "";
	var restPatternStartIndex = 0;
	var typeIndex = 0;
	var defaultIndex = 0;
	var count = Math.max(typeList.indexOf(this.REST) < 0 ? typeList.length : typeList.length - 1 ,argumentsList.length,defaultList.length);
	for (var i = 0; i < count; i++) {
		if (typeList[typeIndex] == this.REST) {
			typeIndex++;
			restPatternStartIndex = typeIndex;
		}

		argumentsList[i] = this.validateParam(typeList[typeIndex], argumentsList[i], defaultIndex >= defaultList.length ? undefined : defaultList[defaultIndex]);

		typeIndex++;
		if (typeIndex >= typeList.length) {
			typeIndex = restPatternStartIndex;
		}

		defaultIndex++;
		if (defaultIndex >= defaultList.length) {
			defaultIndex = restPatternStartIndex - 1;
		}
	}
}

// defaultList is required
Params.prototype.validateVariableObject = function(variableObject,variableNamesList,typeList,defaultList) {
	variableObject = typeof variableObject !== "undefined" ? variableObject : {};
	if (typeof variableNamesList == undefined || typeof typeList == undefined || typeof defaultList == undefined ||
		variableNamesList.length != typeList.length || typeList.length != defaultList.length) {
		return variableObject;
	}

	for (var i = 0; i < variableNamesList.length; i++) {
		variableObject[variableNamesList[i]] = this.validateParam(typeList[i],variableObject[variableNamesList[i]],defaultList[i]);
	}

	return variableObject;
}

var PARAMS = new Params();
