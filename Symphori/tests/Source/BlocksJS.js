
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
	this.NONE = 999;
}

Log.prototype.setLogThreshold = function(logType) {
	switch(logType) {
		case this.VERBOSE:
		case this.INFO:
		case this.WARN:
		case this.ERROR:
		case this.FATAL:
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

	for (var i = 0; i < keyCodeCombinationName.length; i++) {
		keyCodes[i] = keyCodeCombinationName.charAt(i);
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

// Public Constructor function
// Input parameter(s):  none
// Returns: AudioTrack object
// Description: Creates an object that creates and controls an html audio object
var AudioTrack = function() {
	LOG.write("AudioTrack constructor called", LOG.VERBOSE);
	this.audio = document.createElement("audio");
	this.name = "";
	this.onload = null;
}

// Public function
// Input parameter(s): none
// Returns: string
// Description: returns the alias given to the audio object
AudioTrack.prototype.getName = function() {
	return this.name;
}

// Public function
// Input parameter(s): string
// Returns: none
// Description: sets the alias associated to the audio object
AudioTrack.prototype.setName = function(alias) {
	this.name = alias;
	this.audio.name = alias;
}

// Public function
// Input parameter(s): filename string
// Returns: none
// Description: sets the alias associated to the audio object
AudioTrack.prototype.load = function(filename) {
	this.audio.addEventListener("canplaythrough", this.onload);
	this.audio.src = filename;
	this.audio.load();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: plays the track from the beginning
AudioTrack.prototype.play = function() {
	this.audio.currentTime = 0;
	this.audio.play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the track
AudioTrack.prototype.pause = function() {
	this.audio.pause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the track
AudioTrack.prototype.unpause = function() {
	this.audio.unpause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the track
AudioTrack.prototype.playPause = function() {
	if (this.audio.paused) {
		this.audio.play();
	}
	else {
		this.audio.pause();
	}
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the track will play at
AudioTrack.prototype.getVolume = function() {
	return this.audio.volume*100;
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the track will play at
AudioTrack.prototype.setVolume = function(percent) {
	var decimal = 0;
	if (percent >= 100) {
		decimal = 1;
	}
	else if (percent <= 0) {
		decimal = 0;
	}
	else {
		decimal = percent / 100.0;
	}

	this.audio.volume = decimal;
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the track should loop
AudioTrack.prototype.setLooping = function(shouldLoop) {
	this.audio.loop = shouldLoop;
}
// Public Constructor function
// Input parameter(s):  none
// Returns: Video object
// Description: Creates an object that creates and controls an html video object
var Video = function() {
	LOG.write("Video constructor called", LOG.VERBOSE);
	this.video = document.createElement("video");
	this.name = "";
	this.onload = null;
	this.onloadEventListenerAdded = false;
}

// Public function
// Input parameter(s): none
// Returns: string
// Description: returns the alias given to the video object
Video.prototype.getName = function() {
	return this.name;
}

// Public function
// Input parameter(s): string
// Returns: none
// Description: sets the alias associated to the video object
Video.prototype.setName = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	this.name = alias;
	this.video.name = alias;
}

// Public function
// Input parameter(s): filename string, type string
// Returns: none
// Description: adds source elements to the video object 
// (multiple sources/type help compatibility across browsers)
Video.prototype.addSource = function(filename, type) {
	PARAMS.initializeValidation();
	filename = PARAMS.validateParam(PARAMS.STRING, filename);
	type = PARAMS.validateParam(PARAMS.STRING, type);

	if (!this.onloadEventListenerAdded) {
		this.video.addEventListener("canplaythrough", this.onload);
		this.onloadEventListenerAdded = true;
	}

	var source = document.createElement("source");
	source.src = filename;
	source.type = type;

	this.video.appendChild(source);
}

/*
// Public function
// Input parameter(s): filename string
// Returns: none
// Description: sets the alias associated to the video object
Video.prototype.load = function(filename) {
	this.video.addEventListener("canplaythrough", this.onload);
	this.video.src = filename;
	this.video.load();
}
*/

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: plays the video from the beginning
Video.prototype.play = function() {
	this.video.currentTime = 0;
	this.video.play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the video
Video.prototype.pause = function() {
	this.video.pause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the video
Video.prototype.unpause = function() {
	this.video.play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the video
Video.prototype.playPause = function() {
	if (this.video.paused) {
		this.video.play();
	}
	else {
		this.video.pause();
	}
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the video will play at
Video.prototype.getVolume = function() {
	return this.video.volume*100;
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the video will play at
Video.prototype.setVolume = function(percent) {
	PARAMS.initializeValidation();
	percent = PARAMS.validateParam(PARAMS.NUMBER, percent);

	var decimal = 0;
	if (percent >= 100) {
		decimal = 1;
	}
	else if (percent <= 0) {
		decimal = 0;
	}
	else {
		decimal = percent / 100.0;
	}

	this.video.volume = decimal;
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the video should loop
Video.prototype.setLooping = function(shouldLoop) {
	PARAMS.initializeValidation();
	shouldLoop = PARAMS.validateParam(PARAMS.BOOLEAN, shouldLoop);

	this.video.loop = shouldLoop;
}

// Public function
// Input parameter(s): none
// Returns: decimal?
// Description: returns the current time of the video
Video.prototype.getCurrentTime = function() {
	return this.video.currentTime;
}

// Public function
// Input parameter(s): decimal?
// Returns: nothing
// Description: sets the current time of the video
Video.prototype.setCurrentTime = function(seekTime) {
	PARAMS.initializeValidation();
	seekTime = PARAMS.validateParam(PARAMS.NUMBER, seekTime);
	
	this.video.pause();
	this.video.currentTime = seekTime;
}

Video.prototype.destroy = function() {
	if (this.video) { 
		this.video.pause();
		if (this.onloadEventListenerAdded) {
			this.video.removeEventListener("canplaythrough", this.onload);
		}
		delete(this.video);
		this.video = undefined;
	}

	this.name = undefined;
	this.onload = undefined;
	this.onloadEventListenerAdded = undefined;
}
var Memory = function() { }
var Traits = function() { }
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
var AssetManager = function() {
	LOG.write("AssetManager constructor called", LOG.VERBOSE);

	this.xmlRequest = new XMLHttpRequest();
	this.imageAssets = new Object();
	this.audioAssets = new Object();
	this.videoAssets = new Object();

	this.imageAssetsFound = -1;
	this.imageAssetsLoaded = -1;

	this.audioAssetsFound = -1;
	this.audioAssetsLoaded = -1;

	this.videoAssetsFound = -1;
	this.videoAssetsLoaded = -1;

	this.imageAssetsLoadedEvent = new Event();
	this.audioAssetsLoadedEvent = new Event();
	this.videoAssetsLoadedEvent = new Event();
	this.assetsLoadedEvent = new Event();

}

AssetManager.prototype.tryToFireAssetsLoadedEvent = function () {
	if (this.imageAssetsFound < 0 || (this.imageAssetsFound > 0 && this.imageAssetsFound == this.imageAssetsLoaded) &&
		this.audioAssetsFound < 0 || (this.audioAssetsFound > 0 && this.audioAssetsFound == this.audioAssetsLoaded) &&
		this.videoAssetsFound < 0 || (this.videoAssetsFound > 0 && this.videoAssetsFound == this.videoAssetsLoaded)) {
		this.assetsLoadedEvent.fireEvent();
	}
}

AssetManager.prototype.onImageAssetLoaded = function () {
	this.imageAssetsLoaded = this.imageAssetsLoaded + 1;
	LOG.write("assetsFound: " + this.imageAssetsFound + " assetsLoaded: " + this.imageAssetsLoaded, LOG.VERBOSE);
	if (this.imageAssetsFound == this.imageAssetsLoaded) {
		LOG.writeObject(this.imageAssets, LOG.VERBOSE);
		this.imageAssetsLoadedEvent.fireEvent();
		this.tryToFireAssetsLoadedEvent();
	}
}

AssetManager.prototype.onAudioAssetLoaded = function () {
	this.audioAssetsLoaded = this.audioAssetsLoaded + 1;
	LOG.write("assetsFound: " + this.audioAssetsFound + " assetsLoaded: " + this.audioAssetsLoaded, LOG.VERBOSE);
	if (this.audioAssetsFound == this.audioAssetsLoaded) {
		LOG.writeObject(this.audioAssets, LOG.VERBOSE);
		this.audioAssetsLoadedEvent.fireEvent();
		this.tryToFireAssetsLoadedEvent();
	}
}

AssetManager.prototype.onVideoAssetLoaded = function () {
	this.videoAssetsLoaded = this.videoAssetsLoaded + 1;
	LOG.write("assetsFound: " + this.videoAssetsFound + " assetsLoaded: " + this.videoAssetsLoaded, LOG.VERBOSE);
	if (this.videoAssetsFound == this.videoAssetsLoaded) {
		LOG.writeObject(this.videoAssets, LOG.VERBOSE);
		this.videoAssetsLoadedEvent.fireEvent();
		this.tryToFireAssetsLoadedEvent();
	}
}

//AssetManager.prototype.loadImageAsset = function(imgFilename, imgAlias) {
//	var image = new Image();
//	image.onload = this.assetsLoadedEvent.fireEvent;
//	//image.src =
//}

AssetManager.prototype.loadImageAssetXML = function(xmlFilename) {
	PARAMS.initializeValidation();
	xmlFilename = PARAMS.validateParam(PARAMS.STRING, xmlFilename);

	var that = this;
	this.xmlRequest.open("GET", xmlFilename, false);
	this.xmlRequest.send();
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(this.xmlRequest.response, "text/xml");
	var images = xmlDoc.getElementsByTagName("Image");
	this.imageAssetsFound = images.length;
	for (var i = 0; i < images.length; i++) {
		var image = new Image();
		var filename = images[i].getElementsByTagName("Filename")[0].childNodes[0].nodeValue;
		var alias = images[i].getElementsByTagName("Alias")[0].childNodes[0].nodeValue;
		
		if (alias == null) {
			alias = filename;
		}

		this.imageAssets[alias] = new Object();
		this.imageAssets[alias].img = new Image();
		this.imageAssets[alias].img.name = alias;
		this.imageAssets[alias].img.onload = function() {
			LOG.write("Image onload reached with alias: " + this.name + " Width:" + that.imageAssets[this.name].img.width + " Height:" + that.imageAssets[this.name].img.height, LOG.INFO);

			CANVASMANAGER.workingCanvasFrame.resize(CANVASMANAGER.width,CANVASMANAGER.height,-1);
			
			var clipx = 0;
			var clipy = 0;
			var clipw = that.imageAssets[this.name].img.width;
			var cliph = that.imageAssets[this.name].img.height;

			if (CANVASMANAGER.width < that.imageAssets[this.name].img.width || CANVASMANAGER.height < that.imageAssets[this.name].img.height) {
				clipx = that.imageAssets[this.name].img.width / 2 - CANVASMANAGER.width / 2;
				clipy = that.imageAssets[this.name].img.height / 2 - CANVASMANAGER.height / 2;
				clipw = CANVASMANAGER.width;
				cliph = CANVASMANAGER.height;
				//that.imageAssets[this.name].imgdata = CANVASMANAGER.workingCanvasFrame.context.getImageData(centerx,centery,CANVASMANAGER.width,CANVASMANAGER.height);
			}

			CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,clipw,cliph);
			CANVASMANAGER.workingCanvasFrame.context.drawImage(that.imageAssets[this.name].img,clipx,clipy,clipw,cliph,0,0,clipw,cliph);

			that.imageAssets[this.name].imgdata = CANVASMANAGER.workingCanvasFrame.context.getImageData(0,0,that.imageAssets[this.name].img.width,that.imageAssets[this.name].img.height);			
			that.onImageAssetLoaded();
		}
		this.imageAssets[alias].img.src = filename;

		LOG.write("filename: " + filename + " alias: " + alias, LOG.VERBOSE);
	}
}

AssetManager.prototype.loadAudioAssetXML = function(xmlFilename) {
	PARAMS.initializeValidation();
	xmlFilename = PARAMS.validateParam(PARAMS.STRING, xmlFilename);

	var that = this;
	this.xmlRequest.open("GET", xmlFilename, false);
	this.xmlRequest.send();
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(this.xmlRequest.response, "text/xml");
	var audioTracks = xmlDoc.getElementsByTagName("AudioTrack");
	this.audioAssetsFound = audioTracks.length;
	for (var i = 0; i < audioTracks.length; i++) {
		var filename = audioTracks[i].getElementsByTagName("Filename")[0].childNodes[0].nodeValue;
		var alias = audioTracks[i].getElementsByTagName("Alias")[0].childNodes[0].nodeValue;
		var audioTrack = new AudioTrack(filename);
		
		if (alias == null) {
			alias = filename;
		}

		this.audioAssets[alias] = new Object();
		this.audioAssets[alias].track = audioTrack;
		this.audioAssets[alias].track.setName(alias);
		this.audioAssets[alias].track.onload = function() {
			LOG.writeObject(this);
			LOG.write("AudioTrack oncanplaythrough reached with alias: " + this.name, LOG.INFO);
			that.onAudioAssetLoaded();
		};
		this.audioAssets[alias].track.load(filename);

		LOG.write("filename: " + filename + " alias: " + alias, LOG.VERBOSE);
	}
}

AssetManager.prototype.loadVideoAssetXML = function(xmlFilename) {
	PARAMS.initializeValidation();
	xmlFilename = PARAMS.validateParam(PARAMS.STRING, xmlFilename);

	var that = this;
	this.xmlRequest.open("GET", xmlFilename, false);
	this.xmlRequest.send();
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(this.xmlRequest.response, "text/xml");
	var videos = xmlDoc.getElementsByTagName("Video");
	this.videoAssetsFound = videos.length;
	for (var i = 0; i < videos.length; i++) {

		var alias = videos[i].getElementsByTagName("Alias")[0].childNodes[0].nodeValue;
		var video = new Video(filename);

		if (alias == null) {
			alias = filename;
		}

		this.videoAssets[alias] = new Object();
		this.videoAssets[alias].video = video;
		this.videoAssets[alias].video.setName(alias);
		var sources = videos[i].getElementsByTagName("Source");
		this.videoAssets[alias].video.onload = function() {
			LOG.writeObject(this);
			LOG.write("Video oncanplaythrough reached with alias: " + this.name, LOG.INFO);
			that.onVideoAssetLoaded();
		};
		for (var j = 0; j < sources.length; j++) {
			var filename = sources[i].getElementsByTagName("Filename")[0].childNodes[0].nodeValue;
			var type = sources[i].getElementsByTagName("Type")[0].childNodes[0].nodeValue;
			this.videoAssets[alias].video.addSource(filename,type);
		}

		LOG.write("filename: " + filename + " alias: " + alias, LOG.VERBOSE);
	}
}

AssetManager.prototype.loadAssets = function(imageXMLfilename, audioXMLfilename, videoXMLfilename) {
	PARAMS.initializeValidation();
	imageXMLfilename = PARAMS.validateParam(PARAMS.STRING, imageXMLfilename, null);
	audioXMLfilename = PARAMS.validateParam(PARAMS.STRING, audioXMLfilename, null);
	videoXMLfilename = PARAMS.validateParam(PARAMS.STRING, videoXMLfilename, null);

	if (imageXMLfilename == null) {
		this.imageAssetsFound = -1;
		this.imageAssetsLoaded = -1;
	}
	else {
		this.imageAssetsFound = 0;
		this.imageAssetsLoaded = 0;
	}

	if (audioXMLfilename == null) {
		this.audioAssetsFound = -1;
		this.audioAssetsLoaded = -1;
	}
	else {
		this.audioAssetsFound = 0;
		this.audioAssetsLoaded = 0;
	}

	if (videoXMLfilename == null) {
		this.videoAssetsFound = -1;
		this.videoAssetsLoaded = -1;
	}
	else {
		this.videoAssetsFound = 0;
		this.videoAssetsLoaded = 0;
	}

	if (this.imageAssetsFound == 0) {
		this.loadImageAssetXML(imageXMLfilename);
	}

	if (this.audioAssetsFound == 0) {
		this.loadAudioAssetXML(audioXMLfilename);
	}

	if (this.videoAssetsFound == 0) {
		this.loadVideoAssetXML(videoXMLfilename);
	}
}
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

	for (var i = 0; i < this.children.length; i++) {
		this.children[i].update();
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
			this.behaviorVars[reactionName] = vars;
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
		for (var innerProp in this.behaviorVars[reactionName]) {
			delete this.behaviorVars[reactionName][innerProp];
		}
		delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
		for (var innerProp in this.behaviorVars[reactionName]) {
			delete this.behaviorVars[reactionName][innerProp];
		}
		delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
		for (var innerProp in this.behaviorVars[reactionName]) {
			delete this.behaviorVars[reactionName][innerProp];
		}
		delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
		for (var innerProp in this.behaviorVars[reactionName]) {
			delete this.behaviorVars[reactionName][innerProp];
		}
		delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
		for (var innerProp in this.behaviorVars[reactionName]) {
			delete this.behaviorVars[reactionName][innerProp];
		}
		delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
		for (var innerProp in this.behaviorVars[reactionName]) {
			delete this.behaviorVars[reactionName][innerProp];
		}
		delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
			for (var innerProp in this.behaviorVars[reactionName]) {
				delete this.behaviorVars[reactionName][innerProp];
			}
			delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
			for (var innerProp in this.behaviorVars[reactionName]) {
				delete this.behaviorVars[reactionName][innerProp];
			}
			delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
			for (var innerProp in this.behaviorVars[reactionName]) {
				delete this.behaviorVars[reactionName][innerProp];
			}
			delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
			for (var innerProp in this.behaviorVars[reactionName]) {
				delete this.behaviorVars[reactionName][innerProp];
			}
			delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
			for (var innerProp in this.behaviorVars[reactionName]) {
				delete this.behaviorVars[reactionName][innerProp];
			}
			delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
			for (var innerProp in this.behaviorVars[reactionName]) {
				delete this.behaviorVars[reactionName][innerProp];
			}
			delete this.behaviorVars[reactionName];
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
			this.behaviorVars[reactionName] = vars;
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
			for (var innerProp in this.behaviorVars[reactionName]) {
				delete this.behaviorVars[reactionName][innerProp];
			}
			delete this.behaviorVars[reactionName];
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

	var name = KEYCODES.getStringFromKeyCode(keyCodes);

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
		if (keyCodeName.length > 1) {
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


var ShatterTraits = function() {
	var shattered = false;
	var counter = 0;

	this._getShattered = function() { return shattered; };
	this._setShattered = function(val) { 
		shattered = val; 
		counter++;
	};

	this.shattered = shattered;
}

ShatterTraits.prototype = new Traits();

ShatterTraits.prototype.getCurrentFrame = function() {
	throw new Error("Block has learned ShatterTraits, but hasn't implemented the 'getCurrentFrame' function.");
}

// Public function
// Input parameters: the new size for the shattered blocks (integer), width of source image (integer), height of source image (integer)
// Returns: nothing
// Description: shatters the source block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
ShatterTraits.prototype.shatter = function(newBlockSize, maxWidth, maxHeight) {
	PARAMS.initializeValidation();
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);
	maxWidth = PARAMS.validateParam(PARAMS.INTEGER, maxWidth, this.width);
	maxHeight = PARAMS.validateParam(PARAMS.INTEGER, maxHeight, this.height);
	
	if (!this.shattered) {
		var blockClusterPositions = new Array();

		var blockIndex = 0;
		for (var i = 0; i < maxWidth; i += newBlockSize) {
			for (var j = 0; j < maxHeight; j += newBlockSize) {
				if (blockClusterPositions[blockIndex] == undefined) {
					blockClusterPositions[blockIndex] = {"x":Math.floor(i - maxWidth/2 + newBlockSize/2), "y":Math.floor(j - maxHeight/2 + newBlockSize/2)};
				}
				
				blockIndex++;
			}
		}

		for (var i = 0; i < blockClusterPositions.length; i++) {
			var newBlock = new FragmentBlock(this, newBlockSize, newBlockSize, blockClusterPositions[i].x, blockClusterPositions[i].y, 0);

			newBlock.setMemoryCapacity(this.memoryCapacity);
			
			this.adoptChild(newBlock);
		}

		this.shattered = true;
	}
}


// Public function
// Input parameters: none
// Returns: nothing
// Description: removes child blocks resulting from shatter
ShatterTraits.prototype.unshatter = function() {
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i] instanceof FragmentBlock) {
			this.children[i].destroy();
			this.children.splice(i,1);
			i--;
		}
	}
	this.shattered = false;
}
var CanvasTraits = function() { }

CanvasTraits.prototype = new Traits();

// Private function
// Input parameters: canvas 2d context, list of drawing commands
// Returns: nothing
// Description: parses a list of drawing command objects, and applies them to the destination canvas 2d context
CanvasTraits.prototype.parseCanvasCommands = function(dest,commands) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT,dest);
	commands = PARAMS.validateParam(PARAMS.ARRAYOFOBJECT,commands);

	var saveCount = 0;
	var restoreCount = 0;

	for (var i = 0; i < commands.length; i++) {
		var command = commands[i].command;
		var parameters = commands[i].parameters;
		switch(command) {
			case "arc":
				if (parameters.length == 5) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.arc(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4]);
				}
				else if (parameters.length == 6) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.BOOLEAN],
											 parameters);
					dest.arc(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4],parameters[5]);
				}
				break;

			case "arcTo":
				if (parameters.length == 5) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.arcTo(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4]);
				}
				break;

			case "beginPath":
				dest.beginPath();
				break;

			case "bezierCurveTo":
				if (parameters.length == 6) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.bezierCurveTo(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4],parameters[5]);
				}
				break;

			// should we allow this one?
			case "clearRect":
				if (parameters.length == 4) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.clearRect(parameters[0] - 1,parameters[1] - 1,parameters[2] + 2,parameters[3] + 2);
				}
				break;

			case "clip":
				dest.clip();
				break;

			case "closePath":
				dest.closePath();
				break;

			case "createImageData":
				// not implemented, since it returns image data
				break;

			case "createLinearGradient":
				// not implemented, since it returns a gradient object
				break;

			case "createPattern":
				// not implemented, since it returns a pattern object
				break;

			case "createRadialGradient":
				// not implemented, since it returns a gradient object
				break;

			case "drawCustomFocusRing":
				// not implemented, since I don't know what this function does or what it needs
				break;

			case "drawImage":
				if (parameters.length == 3) {
					PARAMS.initializeValidation(command);
					// first parameter should be nsIDOMElement (image)
					PARAMS.validateArguments([PARAMS.OBJECT,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.drawImage(parameters[0],parameters[1],parameters[2]);
				}
				else if (parameters.length == 5) {
					PARAMS.initializeValidation(command);
					// first parameter should be nsIDOMElement (image)
					PARAMS.validateArguments([PARAMS.OBJECT,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.drawImage(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4]);
				}
				else if (parameters.length == 9) {
					PARAMS.initializeValidation(command);
					// first parameter should be nsIDOMElement (image)
					PARAMS.validateArguments([PARAMS.OBJECT,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.drawImage(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4],parameters[5],parameters[6],parameters[7],parameters[8]);
				}
				break;

			case "drawSystemFocusRing":
				// not implemented, since I don't know what this function does or what it needs
				break;

			case "fill":
				dest.fill();
				break;

			case "fillRect":
				if (parameters.length == 4) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.fillRect(parameters[0],parameters[1],parameters[2],parameters[3]);
				}
				break;

			case "fillText":
				if (parameters.length == 3) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.fillText(parameters[0],parameters[1],parameters[2]);
				}
				else if (parameters.length == 4) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.fillText(parameters[0],parameters[1],parameters[2],parameters[3]);
				}
				break;

			case "getImageData":
				// not implemented, since it returns image data
				break;

			case "getLineDash":
				// not implemented, since I don't know what this function does or what it needs
				break;

			case "isPointInPath":
				// not implemented, since it returns a boolean
				break;

			case "isPointInStroke":
				// not implemented, since it returns a boolean
				break;

			case "lineTo":
				if (parameters.length == 2) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.lineTo(parameters[0],parameters[1]);
				}
				break;

			case "measureText":
				// not implemented, since it returns a nsIDOMTextMetrics object
				break;

			case "moveTo":
				if (parameters.length == 2) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.moveTo(parameters[0],parameters[1]);
				}
				break;

			case "putImageData":
				if (parameters.length == 3) {
					PARAMS.initializeValidation(command);
					// first parameter should be imageData
					PARAMS.validateArguments([PARAMS.OBJECT,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.putImageData(parameters[0],parameters[1],parameters[2]);
				}
				else if (parameters.length == 7) {
					PARAMS.initializeValidation(command);
					// first parameter should be imageData
					PARAMS.validateArguments([PARAMS.OBJECT,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.INTEGER,PARAMS.INTEGER,PARAMS.INTEGER,PARAMS.INTEGER],
											 parameters);
					dest.putImageData(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4],parameters[5],parameters[6]);
				}
				break;

			case "quadraticCurveTo":
				if (parameters.length == 4) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.putImageData(parameters[0],parameters[1],parameters[2],parameters[3]);
				}
				break;

			case "rect":
				if (parameters.length == 4) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.rect(parameters[0],parameters[1],parameters[2],parameters[3]);
				}
				break;

			case "restore":
				if (restoreCount < saveCount) {
					dest.restore();
					restoreCount++;
				}
				break;

			case "rotate":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER],
											 parameters);
					dest.rotate(parameters[0]);
				}
				break;

			case "save":
				dest.save();
				saveCount++;
				break;

			case "scale":
				if (parameters.length == 2) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.scale(parameters[0],parameters[1]);
				}
				break;

			case "scrollPathIntoView":
				// not implemented, since I don't know what this function does or what it needs
				break;

			// the following cases are for setting properties, rather than calling functions ******************
			case "setFillStyle":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING],
											 parameters);
					dest.fillStyle = parameters[0];
				}
				break;

			case "setFont":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING],
											 parameters);
					dest.font = parameters[0];
				}
				break;

			case "setGlobalAlpha":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER],
											 parameters);
					dest.globalAlpha = parameters[0];
				}
				break;

			case "setGlobalCompositeOperation":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING],
											 parameters);
					dest.globalCompositeOperation = parameters[0];
				}
				break;

			case "setLineCap":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING],
											 parameters);
					dest.lineCap = parameters[0];
				}
				break;

			case "setLineDashOffset":
				// not implemented, since I don't know how to use this property
				break;

			case "setLineJoin":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING],
											 parameters);
					dest.lineJoin = parameters[0];
				}
				break;

			case "setLineWidth":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER],
											 parameters);
					dest.lineWidth = parameters[0];
				}
				break;

			case "setMiterLimit":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER],
											 parameters);
					dest.miterLimit = parameters[0];
				}
				break;

			case "setShadowBlur":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER],
											 parameters);
					dest.shadowBlur = parameters[0];
				}
				break;

			case "setShadowOffsetX":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER],
											 parameters);
					dest.shadowOffsetX = parameters[0];
				}
				break;

			case "setShadowOffsetY":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER],
											 parameters);
					dest.shadowOffsetY = parameters[0];
				}
				break;

			case "setStrokeStyle":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING],
											 parameters);
					dest.strokeStyle = parameters[0];
				}
				break;

			case "setTextAlign":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING],
											 parameters);
					dest.textAlign = parameters[0];
				}
				break;

			case "setTextBaseline":
				if (parameters.length == 1) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING],
											 parameters);
					dest.textBaseline = parameters[0];
				}
				break;

			// this ends the properties cases of this function *************************************

			case "setLineDash":
				// not implemented, since I don't know what this function does or what it needs
				break;

			case "setTransform":
				if (parameters.length == 6) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.setTransform(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4],parameters[5]);
				}
				break;

			case "stroke":
				dest.stroke();
				break;

			case "strokeRect":
				if (parameters.length == 4) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.strokeRect(parameters[0],parameters[1],parameters[2],parameters[3]);
				}
				break;

			case "strokeText":
				if (parameters.length == 3) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.strokeText(parameters[0],parameters[1],parameters[2]);
				}
				else if (parameters.length == 4) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.STRING,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.strokeText(parameters[0],parameters[1],parameters[2],parameters[3]);
				}
				break;

			case "transform":
				if (parameters.length == 6) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.transform(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4],parameters[5]);
				}
				break;

			case "translate":
				if (parameters.length == 2) {
					PARAMS.initializeValidation(command);
					PARAMS.validateArguments([PARAMS.NUMBER,PARAMS.NUMBER],
											 parameters);
					dest.translate(parameters[0],parameters[1]);
				}
				break;

		}
	}

	if (saveCount > restoreCount) {
		for (var i = 0; i < saveCount - restoreCount; i++) {
			dest.restore();
		}
	}
}
// Public Constructor function
// Input parameter(s):  Block capable of being shattered, integer, integer, integer, integer, integer
// Returns: FragmentBlock object instantiated with the specified height and width at the specified home location
// in order to display the image from the provided source Block that implements the Shatterable interface
// Example: var myFB = new FragmentBlock(this,10,10, -100, -50, 0);
var FragmentBlock = function(sourceBlockParam, widthParam, heightParam, homeXParam, homeYParam, homeZParam) {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.BLOCK, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER], arguments);

	LOG.write("FragmentBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	this.sourceBlock = sourceBlockParam;

	var homeX = 0;
	var homeY = 0;
	var homeZ = 0;
	var shattered = false;

	this._getHomeX = function() { return homeX; };
	this._getHomeY = function() { return homeY; };
	this._getHomeZ = function() { return homeZ; };
	this._getShattered = function() { return shattered; };

	this._setHomeX = function(val) { homeX = val; };
	this._setHomeY = function(val) { homeY = val; };
	this._setHomeZ = function(val) { homeZ = val; };
	this._setShattered = function(val) { shattered = val; };

	this.width = widthParam;
	this.height = heightParam;

	this.x = homeXParam;
	this.y = homeYParam;
	this.z = homeZParam;

	this.homeX = homeXParam;
	this.homeY = homeYParam;
	this.homeZ = homeZParam;

	// this.maskMode = "none";

	this.shattered = false;
}

FragmentBlock.prototype = new ActorBlock();

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
FragmentBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.homeX = this._getHomeX();
	memory.homeY = this._getHomeY();
	memory.homeZ = this._getHomeZ();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
FragmentBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.homeX = memory.homeX;
	this.homeY = memory.homeY;
	this.homeZ = memory.homeZ;
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
FragmentBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.homeX == this.homeX && memory.homeY == this.homeY && memory.homeZ == this.homeZ);
	}
}

// Public function
// Input parameters: the new size for the shattered blocks (integer)
// Returns: nothing
// Description: shatters the current block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
FragmentBlock.prototype.shatter = function(newBlockSize) {
	PARAMS.initializeValidation(); 
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);

	if (newBlockSize > this.width || newBlockSize > this.height) {
		LOG.write("Tried to shatter FragmentBlock into blocks of size: " + newBlockSize + ", but FragmentBlock only has a width of " + this.width + ".", LOG.WARN);
		return;
	}
	
	if (!this.shattered) {
		var blockClusterPositions = new Array();
		var maxWidth = this.width;
		var maxHeight = this.height;

		for (var i = 0; i < maxWidth; i += newBlockSize) {
			for (var j = 0; j < maxHeight; j += newBlockSize) {
				blockClusterPositions.push({"x":Math.floor(i - maxWidth/2 + newBlockSize/2), "y":Math.floor(j - maxHeight/2 + newBlockSize/2)});
			}
		}

		for (var i = 0; i < blockClusterPositions.length; i++) {
			var newBlock = new FragmentBlock(this.sourceBlock, newBlockSize, newBlockSize, blockClusterPositions[i].x, blockClusterPositions[i].y, 0);
			newBlock.setMemoryCapacity(this.memoryCapacity);
			
			this.adoptChild(newBlock);
		}

		this.shattered = true;
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes child FragmentBlocks resulting from shatter
FragmentBlock.prototype.unshatter = function() {
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i] instanceof FragmentBlock) {
			this.children[i].destroy();
			this.children.splice(i,1);
			i--;
		}
	}
	this.shattered = false;
}

FragmentBlock.prototype.getCurrentFrameFromSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getCurrentFrameFromSourceBlock) {
			return this.sourceBlock.getCurrentFrameFromSourceBlock();
		}
		else {
			return this.sourceBlock.getCurrentFrame();
		}
	}
	else {
		return null;
	}
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's image after applying necessary transformations
FragmentBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	if (this.sourceBlock) {
		var drawx = 0;
		var drawy = 0;
		
		try {
			if (this._getVisible()) {
				var zratio = this.getZRatio();

				drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
				drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

				dest.save();
				dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
				dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
				dest.rotate(this._getRotation()*Math.PI/180);

				if (!this._getShattered()) {
					dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
				}

				for (var i = 0; i < this.children.length; i++) {
					this.children[i].undraw(dest);
				}

				dest.restore();
			}
		}
		catch (err) {
			LOG.write("error in FragmentBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
			LOG.writeBlock(this, LOG.ERROR);
			LOG.writeObject(err, LOG.ERROR);
			debugger;
		}
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles frame updates and filter/mask application
FragmentBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	this._setHomeX(this.homeX);
	this._setHomeY(this.homeY);
	this._setHomeZ(this.homeZ);

	this._setShattered(this.shattered);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current frame image after applying necessary transformations
FragmentBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	if (this.sourceBlock) {
		var drawx = 0;
		var drawy = 0;
		
		try {
			if (this._getVisible()) {
				var zratio = this.getZRatio();

				drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
				drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

				dest.save();
				dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
				dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
				dest.rotate(this._getRotation()*Math.PI/180);

				// switch(this.maskMode) {
				// 	case "window":
				// 		dest.globalCompositeOperation = "destination-in";
				// 	break;

				// 	case "wall":
				// 		dest.globalCompositeOperation = "destination-out";
				// 	break;
				// }
				

				if (!this.shattered) {
					var currentFrame = this.getCurrentFrameFromSourceBlock();

					if (currentFrame != null) {
						dest.drawImage(currentFrame,
										(this.getWidthInSourceBlock()-this._getWidth()/2)/this.getHorizontalVideoScalingInSourceBlock(),
										(this.getHeightInSourceBlock()-this._getHeight()/2)/this.getVerticalVideoScalingInSourceBlock(),
										this._getWidth()/this.getHorizontalVideoScalingInSourceBlock(),
										this._getHeight()/this.getVerticalVideoScalingInSourceBlock(),
										-this._getWidth()/2,
										-this._getHeight()/2,
										this._getWidth(),
										this._getHeight());
					}

				}
				 

				if (this.showDebugDisplay) {
					dest.save();
					dest.strokeStyle = "Green";
					dest.lineWidth = 1;
					dest.beginPath();
					dest.moveTo(0,0);
					dest.lineTo(0,-this._getHeight()/2);
					dest.stroke();
					dest.fillStyle = "Red";
					dest.fillRect(-4,-4,8,8);
					dest.beginPath();
					dest.strokeStyle = "Blue";
					dest.lineWidth = 1;
					dest.rect(-this._getWidth()/2,-this._getHeight()/2,this._getWidth(),this._getHeight());
					dest.stroke();
					dest.restore();
				}

				this.children.sort(function(a,b) { return b.z - a.z });
				for (var i = 0; i < this.children.length; i++) {
					this.children[i].draw(dest);
				}
				
				dest.restore();
			}
		}
		catch (err) {
			LOG.write("error in FragmentBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
			LOG.writeBlock(this, LOG.ERROR);
			LOG.writeObject(err, LOG.ERROR);
			debugger;
		}
	}
}

FragmentBlock.prototype.getWidthInSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getWidthInSourceBlock) {
			return this.sourceBlock.getWidthInSourceBlock() + this._getHomeX();
		}
		else {
			return this.sourceBlock._getWidth()/2 + this._getHomeX();
		}
	}
	else {
		return this._getWidth()/2;
	}
}

FragmentBlock.prototype.getHeightInSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getHeightInSourceBlock) {
			return this.sourceBlock.getHeightInSourceBlock() + this._getHomeY();
		}
		else {
			return this.sourceBlock._getHeight()/2 + this._getHomeY();
		}
		
	}
	else {
		return this._getHeight()/2;
	}
}

FragmentBlock.prototype.getHorizontalVideoScalingInSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getHorizontalVideoScalingInSourceBlock) {
			return this.sourceBlock.getHorizontalVideoScalingInSourceBlock();
		}
		else if (this.sourceBlock.getHorizontalVideoScaling) {
			return this.sourceBlock.getHorizontalVideoScaling();
		}
		else {
			return 1;
		}
	}
	else {
		return 1;
	}
}

FragmentBlock.prototype.getVerticalVideoScalingInSourceBlock = function() {
	if (this.sourceBlock) {
		if (this.sourceBlock.getVerticalVideoScalingInSourceBlock) {
			return this.sourceBlock.getVerticalVideoScalingInSourceBlock();
		}
		else if (this.sourceBlock.getVerticalVideoScaling) {
			return this.sourceBlock.getVerticalVideoScaling();
		}
		else {
			return 1;
		}
	}
	else {
		return 1;
	}
}


FragmentBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {

		// this.maskMode = undefined;

		this.sourceBlock = undefined;

		this._setHomeX(undefined);
		this._setHomeY(undefined);
		this._setHomeZ(undefined);

		this.homeX = undefined;
		this.homeY = undefined;
		this.homeZ = undefined;

		this._setShattered(undefined);
		this.shattered = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}
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


// Public Constructor function
// Input parameter(s):  track alias string
// Returns: SoundBlock object instantiated with the AudioTrack matching the supplied input parameter
// Example: var sb = new SoundBlock("StageClear");
var SoundBlock = function(trackAlias) {
	PARAMS.initializeValidation();
	trackAlias = PARAMS.validateParam(PARAMS.STRING, trackAlias);

	LOG.write("SoundBlock constructor called", LOG.VERBOSE);
	PlayerBlock.call(this);

	this.track = CANVASMANAGER.getAudioAsset(trackAlias);
}

SoundBlock.prototype = new PlayerBlock();

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: plays the loaded track from the beginning
SoundBlock.prototype.play = function() {
	this.track.play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the loaded track
SoundBlock.prototype.pause = function() {
	this.track.pause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the loaded track
SoundBlock.prototype.unpause = function() {
	this.track.unpause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the loaded track
SoundBlock.prototype.playPause = function() {
	this.track.playPause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: halts progression of the loaded track and returns to the beginning of the track
SoundBlock.prototype.stop = function() {
	this.track.play();
	this.track.pause();
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the loaded track will play at
SoundBlock.prototype.getVolume = function() {
	return this.track.getVolume();
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the loaded track will play at
SoundBlock.prototype.setVolume = function(percent) {
	PARAMS.initializeValidation();
	percent = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, percent);

	this.track.setVolume(percent);
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the loaded track should loop
SoundBlock.prototype.setLooping = function(shouldLoop) {
	PARAMS.initializeValidation();
	shouldLoop = PARAMS.validateParam(PARAMS.BOOLEAN, shouldLoop);

	this.track.setLooping(shouldLoop);
}
// Public Constructor function
// Input parameter(s):  track alias string, track alias string, ...
// Returns: StereoBlock object instantiated with the AudioTracks matching the supplied input parameters
// Example: var sb = new StereoBlock("StageClear", "BossStageClear");
var StereoBlock = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	LOG.write("SoundBlock constructor called", LOG.VERBOSE);
	PlayerBlock.call(this);

	this.tracks = new Array();

	for (var i = 0; i < arguments.length; i++) {
		var track = CANVASMANAGER.getAudioAsset(arguments[i]);
		if (track != null) {
			this.tracks.push(track);
		}
	}

	this.currentTrackIndex = 0;
	this.volume = 100;
	this.looping = false;
}

StereoBlock.prototype = new PlayerBlock();

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
StereoBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.currentTrackIndex = this.currentTrackIndex;

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
StereoBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.currentTrackIndex = memory.currentTrackIndex;
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
StereoBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.currentTrackIndex == this.currentTrackIndex);
	}
}

// Public function
// Input parameter(s): track alias string
// Returns: AudioTrack
// Description: returns the specified AudioTrack, if it is loaded
StereoBlock.prototype.getTrack = function(trackName) {
	PARAMS.initializeValidation();
	trackName = PARAMS.validateParam(PARAMS.STRING, trackName);

	for (var i = 0; i < this.tracks.length; i++) {
		if (this.tracks[i].getName() == trackName) {
			return this.tracks[i];
		}
	}
	return null;
}

// Public function
// Input parameter(s): track alias string
// Returns: AudioTrack
// Description: returns the index of specified AudioTrack in the track list, if it is loaded
StereoBlock.prototype.getTrackIndex = function(trackName) {
	PARAMS.initializeValidation();
	trackName = PARAMS.validateParam(PARAMS.STRING, trackName);

	for (var i = 0; i < this.tracks.length; i++) {
		if (this.tracks[i].getName() == trackName) {
			return i;
		}
	}
	return -1;
}

// Public function
// Input parameter(s): track alias string
// Returns: nothing
// Description: stops the currently playing track 
// and starts playing the specified AudioTrack from the beginning, if it is loaded
StereoBlock.prototype.play = function(trackName) {
	PARAMS.initializeValidation();
	trackName = PARAMS.validateParam(PARAMS.STRING, trackName);

	if (trackName != null) {
		var newTrackIndex = this.getTrackIndex(trackName);
		if (newTrackIndex >= 0 && newTrackIndex != this.currentTrackIndex) {
			this.stop();
			this.currentTrackIndex = newTrackIndex;
		}
	}

	this.tracks[this.currentTrackIndex].play();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the current track
StereoBlock.prototype.pause = function() {
	this.tracks[this.currentTrackIndex].pause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the current track
StereoBlock.prototype.unpause = function() {
	this.tracks[this.currentTrackIndex].unpause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the current track
StereoBlock.prototype.playPause = function() {
	this.tracks[this.currentTrackIndex].playPause();
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: halts progression of the current track and returns to the beginning of the track
StereoBlock.prototype.stop = function() {
	this.tracks[this.currentTrackIndex].play();
	this.tracks[this.currentTrackIndex].pause();
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the current track will play at
StereoBlock.prototype.getVolume = function() {
	return this.volume;
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the current track will play at
StereoBlock.prototype.setVolume = function(percent) {
	PARAMS.initializeValidation();
	percent = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, percent);

	this.volume = percent;
	for (var i = 0; i < this.tracks.length; i++) {
		this.tracks[i].setVolume(this.volume);
	}
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the current track should loop
StereoBlock.prototype.setLooping = function(shouldLoop) {
	PARAMS.initializeValidation();
	shouldLoop = PARAMS.validateParam(PARAMS.BOOLEAN, shouldLoop);

	this.looping = shouldLoop;
	for (var i = 0; i < this.tracks.length; i++) {
		this.tracks[i].setLooping(this.looping);
	}
}
// Public Constructor function
// Input parameter(s):  image alias string, image alias string, ...
// Returns: MovieBlock object instantiated with the images matching the supplied input parameters
// Example: var myMB = new MovieBlock("img1", "img2", "img3", "img4");
var MovieBlock = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	LOG.write("MovieBlock constructor called", LOG.VERBOSE);
	PlayerBlock.call(this);

	this.frameAliases = new Array();

	for (var i = 0; i < arguments.length; i++) {
		this.frameAliases[i] = arguments[i];
	}

	this.frames = new Array();

	this.filters = new Array();
	this.windowMasks = new Array();
	this.wallMasks = new Array();

	this.filtersUpdate = false;
	this.masksUpdate = false;

	this.isPlaying = true;
	this.currentFrameIndex = -1;

	this.maskMode = "none";
}

MovieBlock.prototype = new ActorBlock();
MovieBlock.prototype.learn(PlayerTraits);
MovieBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
MovieBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.currentFrameIndex = this.currentFrameIndex;

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
MovieBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.currentFrameIndex = memory.currentFrameIndex;
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
MovieBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.currentFrameIndex == this.currentFrameIndex);
	}
}

// Public function
// Input parameters: the new size for the shattered blocks (integer)
// Returns: nothing
// Description: shatters the current block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
MovieBlock.prototype.shatter = function(newBlockSize) {
	PARAMS.initializeValidation(); 
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);

	var maxWidth = 0;
	var maxHeight = 0;

	var length = this.frameAliases.length;

	for (var k = 0; k < length; k++) {
		var frame = this.getFrame(k);

		if (frame.width > maxWidth) { maxWidth = frame.width; }
		if (frame.height > maxHeight) { maxHeight = frame.height; }
	}

	ShatterTraits.prototype.shatter.call(this, newBlockSize, maxWidth, maxHeight);
}

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the image of the current frame, 
// either through the actual image saved in the frames property
// or the image asset matched by the alias associated with the frame, 
// or returns null if no image can be found
MovieBlock.prototype.getCurrentFrame = function() {
	if (this.currentFrameIndex >= 0 && (this.currentFrameIndex < this.frames.length || this.currentFrameIndex < this.frameAliases.length)) {
		if (this.frames[this.currentFrameIndex] != null) {
			return this.frames[this.currentFrameIndex];
		}
		else {
			return CANVASMANAGER.getSingleImageAsset(this.frameAliases[this.currentFrameIndex]);
		}
	}
	else {
		return null;
	}
}

// Public function
// Input parameters: integer index of the desired frame
// Returns: image or null
// Description: returns the image of the specified frame,
// either through the actual image saved in the frames property
// or the image asset matched by the alias associated with the frame, 
// or returns null if no image can be found
MovieBlock.prototype.getFrame = function(frameIndex) {
	PARAMS.initializeValidation();
	frameIndex = PARAMS.validateParam(PARAMS.INTEGER, frameIndex);

	if (frameIndex >= 0 && (frameIndex < this.frames.length || frameIndex < this.frameAliases.length)) {
		if (this.frames[frameIndex] != null) {
			return this.frames[frameIndex];
		}
		else {
			return CANVASMANAGER.getSingleImageAsset(this.frameAliases[frameIndex]);
		}
	}
	else {
		return null;
	}
}

MovieBlock.prototype.play = function() {
	this.isPlaying = true;
	this.currentFrameIndex = -1;
}

MovieBlock.prototype.pause = function() {
	this.isPlaying = false;
}

MovieBlock.prototype.unpause = function() {
	this.isPlaying = true;
}

MovieBlock.prototype.playPause = function() {
	this.isPlaying = !this.isPlaying;
}

MovieBlock.prototype.stop = function() {
	this.play();
	this.pause();
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's image after applying necessary transformations
MovieBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			if (!this._getShattered()) {
				dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in MovieBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles frame updates and filter/mask application
MovieBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	if (this.isPlaying) {
		this.currentFrameIndex++;

		if ((this.frameAliases.length > 0 && this.currentFrameIndex >= this.frameAliases.length) ||
			 (this.frames.length > 0 && this.currentFrameIndex >= this.frames.length)) {
			 this.currentFrameIndex = 0;
		}
	}

	if (this.currentFrameIndex < 0) {
		this.currentFrameIndex = 0;
	}

	var currentFrame = this.getCurrentFrame();

	if (currentFrame != null) {
		this.width = currentFrame.width;
		this.height = currentFrame.height;
	}

	this._setWidth(this.width);
	this._setHeight(this.height);

	this._setShattered(this.shattered);

	this.applyFiltersAndMasks();
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current frame image after applying necessary transformations
MovieBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			switch(this.maskMode) {
				case "window":
					dest.globalCompositeOperation = "destination-in";
				break;

				case "wall":
					dest.globalCompositeOperation = "destination-out";
				break;
			}
			
			if (!this._getShattered()) {
				var currentFrame = this.getCurrentFrame();
				if (currentFrame != null) {	
					dest.drawImage(currentFrame,-this._getWidth()/2,-this._getHeight()/2);
				}
			}
			 

			if (this.showDebugDisplay) {
				dest.save();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this._getHeight()/2);
				dest.stroke();
				dest.fillStyle = "Red";
				dest.fillRect(-4,-4,8,8);
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				dest.rect(-this._getWidth()/2,-this._getHeight()/2,this._getWidth(),this._getHeight());
				dest.stroke();
				dest.restore();
			}

			this.children.sort(function(a,b) { return b.z - a.z });
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(dest);
			}
			
			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in MovieBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Public function
// Input parameters: red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0)
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color
// if filters already exist, applies the color to the existing filters
// (the filter will be applied in the next update() after the filter images have rendered)
MovieBlock.prototype.addColorFilter = function(red,green,blue,alpha) {
	PARAMS.initializeValidation();
	red = PARAMS.validateParam(PARAMS.INTEGER, red);
	green = PARAMS.validateParam(PARAMS.INTEGER, green);
	blue = PARAMS.validateParam(PARAMS.INTEGER, blue);
	alpha = PARAMS.validateParam(PARAMS.NUMBER, alpha, 1);

	var movieLength;
	if (this.frames.length > 0) {
		movieLength = this.frames.length;
	}
	else {
		movieLength = this.frameAliases.length;
	}

	if (movieLength == 0) {
		if (this.width > 0 && this.height > 0) {
			CANVASMANAGER.workingCanvasFrame.resize(this.width,this.height,-1);
			CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,this.width,this.height);
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
			if (this.filters[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.filters[i],0,0);
			}
			CANVASMANAGER.workingCanvasFrame.context.save();
			CANVASMANAGER.workingCanvasFrame.context.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
			CANVASMANAGER.workingCanvasFrame.context.fillRect(0,0,this.width,this.height);
			CANVASMANAGER.workingCanvasFrame.context.restore();

			if (this.filters[i] == null) {
				this.filters[i] = new Image();
			}
			this.filters[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
		}
	}
	else {
		for (var i = 0; i < movieLength; i++) {
			var frame = this.getFrame(i);
			CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
			CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
			if (this.filters[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.filters[i],0,0);
			}
			CANVASMANAGER.workingCanvasFrame.context.save();
			CANVASMANAGER.workingCanvasFrame.context.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
			CANVASMANAGER.workingCanvasFrame.context.fillRect(0,0,frame.width,frame.height);
			CANVASMANAGER.workingCanvasFrame.context.restore();

			if (this.filters[i] == null) {
				this.filters[i] = new Image();
			}
			this.filters[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
		}
	}

	this.filtersUpdate = true;
}

// Public function
// Input parameters: filter image alias, filter image alias, ...
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters
// (the filter will be applied in the next update() after the filter images have rendered)
MovieBlock.prototype.addImageFilter = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	var filters = CANVASMANAGER.getImageAssets(arguments);

	// var filters = new Array();
	// for (var i = 0; i < arguments.length; i++) {
	// 	filters[i] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	// }

	var movieLength;
	if (this.frames.length > 0) {
		movieLength = this.frames.length;
	}
	else {
		movieLength = this.frameAliases.length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.filters[i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.filters[i],0,0);
		}
		if (filters.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(filters[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(filters[i],0,0);
		}

		if (this.filters[i] == null) {
			this.filters[i] = new Image();
		}
		this.filters[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.filtersUpdate = true;
}


// Public function
// Input parameters: mask image alias, mask image alias, ...
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s)
// if window masks already exist, applies the image(s) to the existing window masks
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
MovieBlock.prototype.addWindowMask = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);
	
	var masks = CANVASMANAGER.getImageAssets(arguments);

	// var masks = new Array();
	// for (var i = 0; i < arguments.length; i++) {
	// 	masks[i] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	// }

	var movieLength;
	if (this.frames.length > 0) {
		movieLength = this.frames.length;
	}
	else {
		movieLength = this.frameAliases.length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.windowMasks[i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.windowMasks[i],0,0);
		}
		if (masks.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[i],0,0);
		}

		if (this.windowMasks[i] == null) {
			this.windowMasks[i] = new Image();
		}
		this.windowMasks[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.masksUpdate = true;
}

// Public function
// Input parameters: mask image alias, mask image alias, ...
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s)
// if wall masks already exist, applies the image(s) to the existing window masks
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
MovieBlock.prototype.addWallMask = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	var masks = CANVASMANAGER.getImageAssets(arguments);
	// var masks = new Array();
	// for (var i = 0; i < arguments.length; i++) {
	// 	masks[i] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	// }

	var movieLength;
	if (this.frames.length > 0) {
		movieLength = this.frames.length;
	}
	else {
		movieLength = this.frameAliases.length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.wallMasks[i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.wallMasks[i],0,0);
		}
		if (masks.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[i],0,0);
		}

		if (this.wallMasks[i] == null) {
			this.wallMasks[i] = new Image();
		}
		this.wallMasks[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.masksUpdate = true;
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: function for internal use,
// when a filter or mask is added, this function is called in the next update()
// and apply the composite masks and filters to the object frames
MovieBlock.prototype.applyFiltersAndMasks = function() {
	if (this.masksUpdate || this.filtersUpdate) {
		var i = 0;
		while(this.getFrame(i) != null) {
			var frame = this.getFrame(i);
			CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
			CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
			if (this.windowMasks[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.windowMasks[i],0,0);
			}
			else {
				CANVASMANAGER.workingCanvasFrame.context.save();
				CANVASMANAGER.workingCanvasFrame.context.fillStyle = "rgba(0,0,0,1)";
				CANVASMANAGER.workingCanvasFrame.context.fillRect(0,0,frame.width,frame.height);
				CANVASMANAGER.workingCanvasFrame.context.restore();
			}
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-in";
			CANVASMANAGER.workingCanvasFrame.context.drawImage(frame,0,0);
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-atop";
			if (this.filters[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.filters[i],0,0);
			}
			CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "destination-out";
			if (this.wallMasks[i] != null) {
				CANVASMANAGER.workingCanvasFrame.context.drawImage(this.wallMasks[i],0,0);
			}

			if (this.frames[i] == null) {
				this.frames[i] = new Image();
			}
			this.frames[i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();

			i++;
		}
		this.masksUpdate = false;
		this.filtersUpdate = false;
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all cached frames for the object
MovieBlock.prototype.resetFrames = function() {
	for (var i = 0; i < this.frames.length; i++) {
		this.frames[i] = null;
	}
	this.frames.splice(0,this.frames.length);
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all filters for the object and triggers a reapplication of filters and masks
MovieBlock.prototype.resetFilters = function() {
	for (var i = 0; i < this.filters.length; i++) {
		this.filters[i] = null;
	}
	this.filters.splice(0,this.filters.length);

	this.resetFrames();

	this.filtersUpdate = true;
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all masks for the object and triggers a reapplication of filters and masks
MovieBlock.prototype.resetMasks = function() {
	for (var i = 0; i < this.windowMasks.length; i++) {
		this.windowMasks[i] = null;
	}
	this.windowMasks.splice(0,this.windowMasks.length);

	this.resetFrames();

	this.masksUpdate = true;
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all filters and masks for the object and triggers a reapplication of filters and masks
MovieBlock.prototype.resetFiltersAndMasks = function() {
	this.resetFilters();
	this.resetMasks();
}

MovieBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.frameAliases.length = 0;
		this.frameAliases = undefined;

		this.frames.length = 0;
		this.frames = undefined;

		this.filters.length = 0;
		this.filters = undefined;

		this.windowMasks.length = 0;
		this.windowMasks = undefined;

		this.wallMasks.length = 0;
		this.wallMasks = undefined;

		this.filtersUpdate = undefined;
		this.masksUpdate = undefined;

		this.isPlaying = undefined;
		this.currentFrameIndex = undefined;

		this.maskMode = undefined;

		this.shattered = undefined;
		this._setShattered(undefined);
	}

	PlayerBlock.prototype.destroy.call(this);
}
// Public Constructor function
// Input parameter(s):  movie name string, array of image aliases, movie name string, array of image aliases, ...
// Returns: CinemaBlock object instantiated with movies of the images matching the supplied input parameters
// Example: var b = new CinemaBlock("BirdLeft",["Bird1","Bird2"], "BirdRight", ["Bird1R","Bird2R""]);
var CinemaBlock = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING, PARAMS.ARRAYOFSTRING], arguments);

	LOG.write("CinemaBlock constructor called", LOG.VERBOSE);
	PlayerBlock.call(this);

	this.movieFrameAliases = new Object();

	for (var i = 0; i < arguments.length; i += 2) {
		this.movieFrameAliases[arguments[i]] = arguments[i+1];
	}

	this.movieFrameData = new Object();
	this.movieFrames = new Object();

	this.movieFilters = new Object();
	this.movieWindowMasks = new Object();
	this.movieWallMasks = new Object();

	this.movieFiltersUpdate = new Object();
	this.movieMasksUpdate = new Object();


	this.isPlaying = true;
	if (arguments[0] == undefined) {
		this.currentMovie = "";
	}
	else {
		this.currentMovie = arguments[0];
	}
	
	this.currentFrameIndex = -1;

	this.maskMode = "none";
}

CinemaBlock.prototype = new ActorBlock();
CinemaBlock.prototype.learn(PlayerTraits);
CinemaBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
CinemaBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.currentMovie = this.currentMovie;
	memory.currentFrameIndex = this.currentFrameIndex;

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
CinemaBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.currentMovie = memory.currentMovie;
	this.currentFrameIndex = memory.currentFrameIndex;
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
CinemaBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.currentMovie == this.currentMovie && memory.currentFrameIndex == this.currentFrameIndex);
	}
}

// Private function
// Input parameters: string of the movieName to play
// Returns: nothing
// Description: sets the current movie to play, and resets the frame index
CinemaBlock.prototype.play = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);

	var validMovieName = false;
	for (var existingMovieName in this.movieFrameAliases) {
		if (existingMovieName == movieName) {
			validMovieName = true;
		}
	}
	for (var existingMovieName in this.movieFrameData) {
		if (existingMovieName == movieName) {
			validMovieName = true;
		}
	}

	if (validMovieName) {
		this.currentMovie = movieName;
		this.currentFrameIndex = -1;
	}
	else {
		LOG.write("CinemaBlock with identity " + this.identity + " has no Movie named '" + movieName + "' to play. Defaulting to '" + this.currentMovie + "'.", LOG.WARN);
		this.currentFrameIndex = -1;
	}
	
}

CinemaBlock.prototype.pause = function() {
	this.isPlaying = false;
}

CinemaBlock.prototype.unpause = function() {
	this.isPlaying = true;
}

CinemaBlock.prototype.playPause = function() {
	this.isPlaying = !this.isPlaying;
}

CinemaBlock.prototype.stop = function() {
	this.play();
	this.pause();
}

// Public function
// Input parameters: the new size for the shattered blocks (integer)
// Returns: nothing
// Description: shatters the current block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
CinemaBlock.prototype.shatter = function(newBlockSize) {
	PARAMS.initializeValidation();
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);

	var maxWidth = 0;
	var maxHeight = 0;

	for (var movieName in this.movieFrameAliases) {
		for (var k = 0; k < this.movieFrameAliases[movieName].length; k++) {
			var frame = this.getFrame(movieName,k);

			if (frame.width > maxWidth) { maxWidth = frame.width; }
			if (frame.height > maxHeight) { maxHeight = frame.height; }
		}
	}

	ShatterTraits.prototype.shatter.call(this,newBlockSize,maxWidth,maxHeight);
}

// Public function
// Input parameters: none
// Returns: boolean
// Description: returns whether or not the current frame is the last frame in the current movie
CinemaBlock.prototype.isLastMovieFrame = function() {
	if (this.currentFrameIndex >= 0 && 
		((this.movieFrames[this.currentMovie] != null && this.currentFrameIndex + 1 == this.movieFrames[this.currentMovie].length) ||
			(this.movieFrameAliases[this.currentMovie] != null && this.currentFrameIndex + 1 == this.movieFrameAliases[this.currentMovie].length))) {
		return true;
	}
	else {
		return false;
	}
}

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the image of the current frame, 
// either through the actual image saved in the frames property
// or the image asset matched by the alias associated with the frame, 
// or returns null if no image can be found
CinemaBlock.prototype.getCurrentFrame = function() {
	if (this.currentFrameIndex >= 0 && 
		((this.movieFrames[this.currentMovie] != null && this.currentFrameIndex < this.movieFrames[this.currentMovie].length) ||
			(this.movieFrameAliases[this.currentMovie] != null && this.currentFrameIndex < this.movieFrameAliases[this.currentMovie].length))) {

		if (this.movieFrames[this.currentMovie] != null && this.movieFrames[this.currentMovie][this.currentFrameIndex] != null) {
			return this.movieFrames[this.currentMovie][this.currentFrameIndex];
		}
		else {
			return CANVASMANAGER.getSingleImageAsset(this.movieFrameAliases[this.currentMovie][this.currentFrameIndex]);
		}
	}
	else {
		return null;
	}
}

// Public function
// Input parameters: movieName string, integer index of the desired frame
// Returns: image or null
// Description: returns the image of the specified frame,
// either through the actual image saved in the movieFrames property
// or the image asset matched by the alias associated with the frame, 
// or returns null if no image can be found
CinemaBlock.prototype.getFrame = function(movieName,frameIndex) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);
	frameIndex = PARAMS.validateParam(PARAMS.INTEGER, frameIndex);

	if (frameIndex >= 0 &&
		((this.movieFrames[movieName] != null && frameIndex < this.movieFrames[movieName].length) ||
			(this.movieFrameAliases[movieName] != null && frameIndex < this.movieFrameAliases[movieName].length))) {
		if (this.movieFrames[movieName] != null && this.movieFrames[movieName][frameIndex] != null) {
			return this.movieFrames[movieName][frameIndex];
		}
		else {
			return CANVASMANAGER.getSingleImageAsset(this.movieFrameAliases[movieName][frameIndex]);
		}
	}
	else {
		return null;
	}
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's image after applying necessary transformations
CinemaBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	if (this.currentMovie != null && (this.movieFrameAliases[this.currentMovie].length > 0 || this.movieFrames[this.currentMovie].length > 0)) {
		var drawx = 0;
		var drawy = 0;
		
		try {
			if (this._getVisible()) {
				var zratio = this.getZRatio();

				drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
				drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

				dest.save();
				dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
				dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
				dest.rotate(this._getRotation()*Math.PI/180);

				if (!this._getShattered()) {
					dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
				}

				for (var i = 0; i < this.children.length; i++) {
					this.children[i].undraw(dest);
				}

				dest.restore();
			}
		}
		catch (err) {
			LOG.write("error in CinemaBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
			LOG.writeBlock(this, LOG.ERROR);
			LOG.writeObject(err, LOG.ERROR);
			debugger;
		}
	}
}

// Private function
// Input parameters: canvas context where updates may occur
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles frame updates and filter/mask application
CinemaBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	if (this.isPlaying) {
		this.currentFrameIndex++;

		if ((this.movieFrameAliases[this.currentMovie] != null && this.movieFrameAliases[this.currentMovie].length > 0 && this.currentFrameIndex >= this.movieFrameAliases[this.currentMovie].length) ||
			 (this.movieFrameData[this.currentMovie] != null && this.movieFrameData[this.currentMovie].length > 0 && this.currentFrameIndex >= this.movieFrameData[this.currentMovie].length)) {
			 this.currentFrameIndex = 0;
		}
	}

	if (this.currentFrameIndex < 0) {
		this.currentFrameIndex = 0;
	}

	var currentFrame = this.getCurrentFrame();

	if (currentFrame != null) {
		this.width = currentFrame.width;
		this.height = currentFrame.height;
	}

	this._setWidth(this.width);
	this._setHeight(this.height);

	this._setShattered(this.shattered);

	this.applyFiltersAndMasks();
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current frame image after applying necessary transformations
CinemaBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	if (this.currentMovie != null && (this.movieFrameAliases[this.currentMovie].length > 0 || this.movieFrames[this.currentMovie].length > 0)) {
		var drawx = 0;
		var drawy = 0;
		
		try {
			if (this._getVisible()) {
				var zratio = this.getZRatio();

				drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
				drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

				dest.save();
				dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
				dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
				dest.rotate(this._getRotation()*Math.PI/180);

				switch(this.maskMode) {
					case "window":
						dest.globalCompositeOperation = "destination-in";
					break;

					case "wall":
						dest.globalCompositeOperation = "destination-out";
					break;
				}
				
				if (!this._getShattered()) {
					var currentFrame = this.getCurrentFrame();
					if (currentFrame != null) {	
						dest.drawImage(currentFrame,-this._getWidth()/2,-this._getHeight()/2);
					}
				}

				if (this.showDebugDisplay) {
					dest.save();
					dest.strokeStyle = "Green";
					dest.lineWidth = 1;
					dest.beginPath();
					dest.moveTo(0,0);
					dest.lineTo(0,-this._getHeight()/2);
					dest.stroke();
					dest.fillStyle = "Red";
					dest.fillRect(-4,-4,8,8);
					dest.beginPath();
					dest.strokeStyle = "Blue";
					dest.lineWidth = 1;
					dest.rect(-this._getWidth()/2,-this._getHeight()/2,this._getWidth(),this._getHeight());
					dest.stroke();
					dest.restore();
				}

				this.children.sort(function(a,b) { return b.z - a.z });
				for (var i = 0; i < this.children.length; i++) {
					this.children[i].draw(dest);
				}

				dest.restore();
			}
		}
		catch (err) {
			LOG.write("error in CinemaBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
			LOG.writeBlock(this, LOG.ERROR);
			LOG.writeObject(err, LOG.ERROR);
			debugger;
		}
	}
}

// Public function
// Input parameters: movieName string, red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0)
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color for the specified movie
// if filters already exist, applies the color to the existing filters for the specified movie
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addColorFilterToMovie = function(movieName,red,green,blue,alpha) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);
	red = PARAMS.validateParam(PARAMS.INTEGER, red);
	green = PARAMS.validateParam(PARAMS.INTEGER, green);
	blue = PARAMS.validateParam(PARAMS.INTEGER, blue);
	alpha = PARAMS.validateParam(PARAMS.NUMBER, alpha, 1);

	var movieLength;
	if (this.movieFrames[movieName] != null && this.movieFrames[movieName].length > 0) {
		movieLength = this.movieFrames[movieName].length;
	}
	else {
		movieLength = this.movieFrameAliases[movieName].length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(movieName, i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.movieFilters[movieName] != null && this.movieFilters[movieName][i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieFilters[movieName][i],0,0);
		}
		CANVASMANAGER.workingCanvasFrame.context.save();
		CANVASMANAGER.workingCanvasFrame.context.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
		CANVASMANAGER.workingCanvasFrame.context.fillRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.restore();

		if (this.movieFilters[movieName] == null) {
			this.movieFilters[movieName] = new Array();
		}
		if (this.movieFilters[movieName][i] == null) {
			this.movieFilters[movieName][i] = new Image();
		}
		this.movieFilters[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.movieFiltersUpdate[movieName] = true;
}

// Public function
// Input parameters: red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0), movieName string, movieName string, ...
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color for the specified movies
// if filters already exist, applies the color to the existing filters for the specified movies
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addColorFilterToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.NUMBER, PARAMS.REST, PARAMS.STRING],
		arguments,
		[0,0,0,1.0,""]);

	var red = arguments[0];
	var green = arguments[1];
	var blue = arguments[2];
	var alpha = arguments[3];
	for (var i = 4; i < arguments.length; i++) {
		this.addColorFilterToMovie(arguments[i],red,green,blue,alpha)
	}
}

// Public function
// Input parameters: red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0), movieName string, r, g, b, a, movieName, ...
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color for the specified movies
// if filters already exist, applies the color to the existing filters for the specified movies
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addColorFiltersToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.INTEGER, PARAMS.NUMBER, PARAMS.STRING],
		arguments,
		[0,0,0,1.0,""]);

	for (var i = 0; i < arguments.length; i += 5) {
		this.addColorFilterToMovie(arguments[i],arguments[i+1],arguments[i+2],arguments[i+3],arguments[i+4])
	}
}

// Public function
// Input parameters: red value (0-255), green value (0-255), blue value (0-255), alpha value (0.0-1.0)
// Returns: nothing
// Description: if no filters exist, creates new filters from the supplied color for all movies
// if filters already exist, applies the color to the existing filters for all movies
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addColorFilter = function(red,green,blue,alpha) {
	PARAMS.initializeValidation();
	red = PARAMS.validateParam(PARAMS.INTEGER, red);
	green = PARAMS.validateParam(PARAMS.INTEGER, green);
	blue = PARAMS.validateParam(PARAMS.INTEGER, blue);
	alpha = PARAMS.validateParam(PARAMS.NUMBER, alpha, 1);

	for (var movieName in this.movieFrameAliases) {
		this.addColorFilterToMovie(movieName,red,green,blue,alpha);
	}
}

// Public function
// Input parameters: movieName string, filter image alias, filter image alias, ...
// Returns: nothing
// Description: if no filters exist, creates new filters for the supplied movieName from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters for the supplied movieName
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addImageFilterToMovie = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.STRING, PARAMS.REST, PARAMS.STRING], arguments);

	var movieName = arguments[0];
	var filters = new Array();
	for (var i = 1; i < arguments.length; i++) {
		filters[i-1] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	}
	var movieLength;
	if (this.movieFrames[movieName] != null && this.movieFrames[movieName].length > 0) {
		movieLength = this.movieFrames[movieName].length;
	}
	else {
		movieLength = this.movieFrameAliases[movieName].length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(movieName, i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.movieFilters[movieName] != null && this.movieFilters[movieName][i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieFilters[movieName][i],0,0);
		}
		if (filters.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(filters[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(filters[i],0,0);
		}

		if (this.movieFilters[movieName] == null) {
			this.movieFilters[movieName] = new Array();
		}
		if (this.movieFilters[movieName][i] == null) {
			this.movieFilters[movieName][i] = new Image();
		}
		this.movieFilters[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.movieFiltersUpdate[movieName] = true;
}

// Public function
// Input parameters: array of filter image aliases, movieName string, movieName string, ...
// Returns: nothing
// Description: if no filters exist, creates new filters for the supplied movieNames from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters for the supplied movieNames
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addImageFilterToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.ARRAYOFSTRING, PARAMS.REST, PARAMS.STRING], arguments);

	var filterAliases = arguments[0];
	var filterArgs = new Array();
	filterArgs[0] = "";
	filterArgs = filterArgs.concat(filterAliases);
	for (var i = 1; i < arguments.length; i++) {
		filterArgs[0] = arguments[i];
		this.addImageFilterToMovie.apply(this,filterArgs);
	}
}

// Public function
// Input parameters: array of movieName strings, array of filter image aliases, array of movieName strings, array of filter image aliases, ...
// Returns: nothing
// Description: if no filters exist, creates new filters for the supplied movieNames from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters for the supplied movieNames
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addImageFiltersToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.ARRAYOFSTRING, PARAMS.ARRAYOFSTRING], arguments);

	for (var i = 0; i < arguments.length; i += 2) {
		var movieName = arguments[i];
		var filterAliases = arguments[i+1];
		filterArgs = new Array();
		filterArgs[0] = movieName;
		filterArgs = filterArgs.concat(filterAliases);
		this.addImageFilterToMovie.apply(this,filterArgs);
	}
}

// Public function
// Input parameters: filter image alias, filter image alias, ...
// Returns: nothing
// Description: if no filters exist, creates new filters for all movies from the supplied image(s)
// if filters already exist, applies the image(s) to the existing filters for all movies
// (the filter will be applied in the next update() after the filter images have rendered)
CinemaBlock.prototype.addImageFilter = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var movieName in this.movieFrameAliases) {
		var filterAliases = [].slice.call(arguments,0);
		var filterArgs = new Array();
		filterArgs[0] = movieName;
		filterArgs = filterArgs.concat(filterAliases);
		this.addImageFilterToMovie.apply(this,filterArgs);
	}
}

// Public function
// Input parameters: movieName, mask image alias, mask image alias, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the specified movie
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s) for the specified movie
// if window masks already exist, applies the image(s) to the existing window masks for the specified movie
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
CinemaBlock.prototype.addWindowMaskToMovie = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.STRING, PARAMS.REST, PARAMS.STRING], arguments);

	var movieName = arguments[0];
	var masks = new Array();
	for (var i = 1; i < arguments.length; i++) {
		masks[i-1] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	}

	var movieLength;
	if (this.movieFrames[movieName] != null && this.movieFrames[movieName].length > 0) {
		movieLength = this.movieFrames[movieName].length;
	}
	else {
		movieLength = this.movieFrameAliases[movieName].length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(movieName, i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.movieWindowMasks[movieName] != null && this.movieWindowMasks[movieName][i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieWindowMasks[movieName][i],0,0);
		}
		if (masks.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[i],0,0);
		}

		if (this.movieWindowMasks[movieName] == null) {
			this.movieWindowMasks[movieName] = new Array();
		}
		if (this.movieWindowMasks[movieName][i] == null) {
			this.movieWindowMasks[movieName][i] = new Image();
		}
		this.movieWindowMasks[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.movieMasksUpdate[movieName] = true;
}

// Public function
// Input parameters: array of mask image aliases, movieName string, movieName string, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the specified movie(s)
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s) for the specified movies
// if window masks already exist, applies the image(s) to the existing window masks for the specified movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
CinemaBlock.prototype.addWindowMaskToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.ARRAYOFSTRING, PARAMS.REST, PARAMS.STRING], arguments);

	var maskAliases = arguments[0];
	var maskArgs = new Array();
	maskArgs[0] = "";
	maskArgs = maskArgs.concat(maskAliases);
	for (var i = 1; i < arguments.length; i++) {
		maskArgs[0] = arguments[i];
		this.addWindowMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: movieName string, array of mask image aliases, movieName string, array of mask image aliases, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the specified movie(s)
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s) for the specified movies
// if window masks already exist, applies the image(s) to the existing window masks for the specified movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
CinemaBlock.prototype.addWindowMasksToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING, PARAMS.ARRAYOFSTRING], arguments);

	for (var i = 0; i < arguments.length; i += 2) {
		var movieName = arguments[i];
		var maskAliases = arguments[i+1];
		maskArgs = new Array();
		maskArgs[0] = movieName;
		maskArgs = maskArgs.concat(maskAliases);
		this.addWindowMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: mask image alias, mask image alias, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no window masks exist, creates new window masks from the supplied image(s) for all the object's movies
// if window masks already exist, applies the image(s) to the existing window masks for all the object's movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: window masks only allow content behind the mask to be displayed through pixels with some opacity in the window mask 
CinemaBlock.prototype.addWindowMask = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var movieName in this.movieFrameAliases) {
		var maskArgs = new Array();
		var maskAliases = [].slice.call(arguments,0);
		maskArgs[0] = movieName;
		maskArgs = maskArgs.concat(maskAliases);
		this.addWindowMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: movieName string, mask image alias, mask image alias, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s) for the specified movie
// if wall masks already exist, applies the image(s) to the existing window masks for the specified movie
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
CinemaBlock.prototype.addWallMaskToMovie = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.STRING, PARAMS.REST, PARAMS.STRING], arguments);

	var movieName = arguments[0];
	var masks = new Array();
	for (var i = 1; i < arguments.length; i++) {
		masks[i-1] = CANVASMANAGER.getSingleImageAsset(arguments[i]);
	}

	var movieLength;
	if (this.movieFrames[movieName] != null && this.movieFrames[movieName].length > 0) {
		movieLength = this.movieFrames[movieName].length;
	}
	else {
		movieLength = this.movieFrameAliases[movieName].length;
	}

	for (var i = 0; i < movieLength; i++) {
		var frame = this.getFrame(movieName, i);
		CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
		CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
		if (this.movieWallMasks[movieName] != null && this.movieWallMasks[movieName][i] != null) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieWallMasks[movieName][i],0,0);
		}
		if (masks.length == 1) {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[0],0,0);
		}
		else {
			CANVASMANAGER.workingCanvasFrame.context.drawImage(masks[i],0,0);
		}

		if (this.movieWallMasks[movieName] == null) {
			this.movieWallMasks[movieName] = new Array();
		}
		if (this.movieWallMasks[movieName][i] == null) {
			this.movieWallMasks[movieName][i] = new Image();
		}
		this.movieWallMasks[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}

	this.movieMasksUpdate[movieName] = true;
}

// Public function
// Input parameters: array of mask image aliases, movieName string, movieName string, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s) for the specified movies
// if wall masks already exist, applies the image(s) to the existing window masks for the specified movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
CinemaBlock.prototype.addWallMaskToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.ARRAYOFSTRING, PARAMS.REST, PARAMS.STRING], arguments);

	var maskAliases = arguments[0];
	var maskArgs = new Array();
	maskArgs[0] = "";
	maskArgs = maskArgs.concat(maskAliases);
	for (var i = 1; i < arguments.length; i++) {
		maskArgs[0] = arguments[i];
		this.addWallMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: movieName string, array of mask image aliases, movieName string, array of mask image aliases, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s) for the specified movies
// if wall masks already exist, applies the image(s) to the existing window masks for the specified movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
CinemaBlock.prototype.addWallMasksToMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING, PARAMS.ARRAYOFSTRING], arguments);
	for (var i = 0; i < arguments.length; i += 2) {
		var movieName = arguments[i];
		var maskAliases = arguments[i+1];
		maskArgs = new Array();
		maskArgs[0] = movieName;
		maskArgs = maskArgs.concat(maskAliases);
		this.addWallMaskToMovie.apply(this,maskArgs);
	}
}

// Public function
// Input parameters: mask image alias, mask image alias, ...
// Input notes: the number of mask image aliases should be either 1 or the number of frames in the object's movies
// Returns: nothing
// Description: if no wall masks exist, creates new wall masks from the supplied image(s) for all the object's movies
// if wall masks already exist, applies the image(s) to the existing window masks for all the object's movies
// (the mask will be applied in the next update() after the mask images have rendered)
// Note: wall masks prevent content behind the mask from being displayed through pixels with opacity in the wall mask 
CinemaBlock.prototype.addWallMask = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var movieName in this.movieFrameAliases) {
		var maskArgs = new Array();
		var maskAliases = [].slice.call(arguments,0);
		maskArgs[0] = movieName;
		maskArgs = maskArgs.concat(maskAliases);
		this.addWallMaskToMovie.apply(this,maskArgs);
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: function for internal use,
// when a filter or mask is added, this function is called in the next update()
// and apply the composite masks and filters to the object frames
CinemaBlock.prototype.applyFiltersAndMasks = function() {
	for (var movieName in this.movieFrameAliases) {
		if (this.movieMasksUpdate[movieName] || this.movieFiltersUpdate[movieName]) {
			var i = 0;
			while(this.getFrame(movieName, i) != null) {
				var frame = this.getFrame(movieName, i);
				CANVASMANAGER.workingCanvasFrame.resize(frame.width,frame.height,-1);
				CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,frame.width,frame.height);
				CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-over";
				if (this.movieWindowMasks[movieName] != null && this.movieWindowMasks[movieName][i] != null) {
					CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieWindowMasks[movieName][i],0,0);
				}
				else {
					CANVASMANAGER.workingCanvasFrame.context.save();
					CANVASMANAGER.workingCanvasFrame.context.fillStyle = "rgba(0,0,0,1)";
					CANVASMANAGER.workingCanvasFrame.context.fillRect(0,0,frame.width,frame.height);
					CANVASMANAGER.workingCanvasFrame.context.restore();
				}
				CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-in";
				CANVASMANAGER.workingCanvasFrame.context.drawImage(frame,0,0);
				CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "source-atop";
				if (this.movieFilters[movieName] != null && this.movieFilters[movieName][i] != null) {
					CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieFilters[movieName][i],0,0);
				}
				CANVASMANAGER.workingCanvasFrame.context.globalCompositeOperation = "destination-out";
				if (this.movieWallMasks[movieName] != null && this.movieWallMasks[movieName][i] != null) {
					CANVASMANAGER.workingCanvasFrame.context.drawImage(this.movieWallMasks[movieName][i],0,0);
				}

				if (this.movieFrames[movieName] == null) {
					this.movieFrames[movieName] = new Array();
				}
				if (this.movieFrames[movieName][i] == null) {
					this.movieFrames[movieName][i] = new Image();
				}
				this.movieFrames[movieName][i].src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();

				i++;
			}
			this.movieMasksUpdate[movieName] = false;
			this.movieFiltersUpdate[movieName] = false;
		}
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all cached frames for all movies in the object
CinemaBlock.prototype.resetFramesForMovie = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);

	if (this.movieFrames[movieName] != undefined) {
		for (var i = 0; i < this.movieFrames[movieName].length; i++) {
			this.movieFrames[movieName][i] = null;
		}
		this.movieFrames[movieName].splice(0,this.movieFrames[movieName].length);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all cached frames for all movies in the object
CinemaBlock.prototype.resetFramesForMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var i = 0; i < arguments.length; i++) {
		this.resetFramesForMovie(arguments[i]);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all cached frames for all movies in the object
CinemaBlock.prototype.resetFrames = function() {
	for (var movieName in this.movieFrames) {
		this.resetFramesForMovie(movieName);
	}
}

// Public function
// Input parameters: movieName string
// Returns: nothing
// Description: clears all filters for the specified movie and triggers a reapplication of filters and masks for that movie
CinemaBlock.prototype.resetFiltersForMovie = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);

	if (this.movieFilters[movieName] != undefined) {
		for (var i = 0; i < this.movieFilters[movieName].length; i++) {
			this.movieFilters[movieName][i] = null;
		}
		this.movieFilters[movieName].splice(0,this.movieFilters[movieName].length);

		this.resetFramesForMovie(movieName);

		this.movieFiltersUpdate[movieName] = true;
	}
}

// Public function
// Input parameters: movieName string, movieName string, ...
// Returns: nothing
// Description: clears all filters for the specified movies and triggers a reapplication of filters and masks for those movies
CinemaBlock.prototype.resetFiltersForMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var i = 0; i < arguments.length; i++) {
		this.resetFiltersForMovie(arguments[i]);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all filters for all movies and triggers a reapplication of filters and masks for all movies
CinemaBlock.prototype.resetFilters = function() {
	for (var movieName in this.movieFrameAliases) {
		this.resetFiltersForMovie(movieName);
	}
}

// Public function
// Input parameters: movieName string
// Returns: nothing
// Description: clears all masks for the specified movie and triggers a reapplication of filters and masks for that movie
CinemaBlock.prototype.resetMasksForMovie = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);

	if (this.movieWindowMasks[movieName] != undefined) {
		for (var i = 0; i < this.movieWindowMasks[movieName].length; i++) {
			this.movieWindowMasks[movieName][i] = null;
		}
		this.movieWindowMasks[movieName].splice(0,this.movieWindowMasks[movieName].length);

		this.resetFramesForMovie(movieName);

		this.movieMasksUpdate[movieName] = true;
	}
}

// Public function
// Input parameters: movieName string, movieName string, ...
// Returns: nothing
// Description: clears all masks for the specified movies and triggers a reapplication of filters and masks for those movies
CinemaBlock.prototype.resetMasksForMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	for (var i = 0; i < arguments.length; i++) {
		this.resetMasksForMovie(arguments[i]);
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all masks for all movies and triggers a reapplication of filters and masks for all movies
CinemaBlock.prototype.resetMasks = function() {
	for (var movieName in this.movieFrameAliases) {
		this.resetMasksForMovie(movieName);
	}
}

// Public function
// Input parameters: movieName string
// Returns: nothing
// Description: clears all filters and masks for the specified movie and triggers a reapplication of filters and masks for that movie
CinemaBlock.prototype.resetFiltersAndMasksForMovie = function(movieName) {
	PARAMS.initializeValidation();
	movieName = PARAMS.validateParam(PARAMS.STRING, movieName);
	
	this.resetFiltersForMovie(movieName);
	this.resetMasksForMovie(movieName);
}

// Public function
// Input parameters: movieName string, movieName string, ...
// Returns: nothing
// Description: clears all filters and masks for the specified movies and triggers a reapplication of filters and masks for those movies
CinemaBlock.prototype.resetFiltersAndMasksForMovies = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING], arguments);

	this.resetFiltersForMovies.apply(this,[].slice.call(arguments,0));
	this.resetMasksForMovies.apply(this,[].slice.call(arguments,0));
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: clears all filters and masks for all movies and triggers a reapplication of filters and masks for all movies
CinemaBlock.prototype.resetFiltersAndMasks = function() {
	this.resetFilters();
	this.resetMasks();
}

CinemaBlock.prototype.destroy = function() {
	this.movieFrameAliases = undefined;

	this.movieFrameData = undefined;
	this.movieFrames = undefined;

	this.movieFilters = undefined;
	this.movieWindowMasks = undefined;
	this.movieWallMasks = undefined;

	this.movieFiltersUpdate = undefined;
	this.movieMasksUpdate = undefined;

	this.isPlaying = undefined;
	this.currentMovie = undefined;
	
	this.currentFrameIndex = undefined;

	this.maskMode = undefined;

	this.shattered = undefined;
	this._setShattered(undefined);

	PlayerBlock.prototype.destroy.call(this);
}
// Public Constructor function
// Input parameter(s):  text (string), font name (string)(default:Verdana), 
//                      font size (integer)(default:12), font color (string/hex)(default:#000/Black), 
//                      text alignment (string:left, center, or right)
// Returns: TextBlock object instantiated with the supplied text and font properties
// Description: utilizes the native canvas textFill function to draw text
// Example: var myTB = new TextBlock("Hello world!", "Verdana", 12, "Blue", "left");
var TextBlock = function(textParam, fontParam, sizeParam, colorParam, alignmentParam) {
	PARAMS.initializeValidation();
	textParam = PARAMS.validateParam(PARAMS.STRING, textParam);
	fontParam = PARAMS.validateParam(PARAMS.STRING, fontParam, "Arial, Helvetica, sans-serif");
	sizeParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, sizeParam, 12);
	colorParam = PARAMS.validateParam(PARAMS.STRING, colorParam, "#000");
	alignmentParam = PARAMS.validateParam(PARAMS.STRING, alignmentParam, "center");

	LOG.write("TextBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	var text = "";
	var font = "";
	var size = 0;
	var color = 0;
	var alignment = "";

	this._getText = function() { return text; };
	this._getFont = function() { return font; };
	this._getSize = function() { return size; };
	this._getColor = function() { return color; };
	this._getAlignment = function() { return alignment; };

	this._setText = function(val) { text = val; };
	this._setFont = function(val) { font = val; };
	this._setSize = function(val) { size = val; };
	this._setColor = function(val) { color = val; };
	this._setAlignment = function(val) { 
		switch(val) {
			case "left":
			case "right":
			case "center":
				alignment = val;
		}
	};

	this.text = textParam;
	this.font = fontParam;
	this.size = sizeParam;
	this.color = colorParam;

	this.alignment = "center";
	switch (alignmentParam) {
		case "left":
		case "right":
		case "center":
			this.alignment = alignmentParam;
			break;
	}

	this.ascent = 0;
	this.descent = 0;
	
	this.maskMode = "none";
}

TextBlock.prototype = new ActorBlock();

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
TextBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.text = this._getText();
	memory.font = this._getFont();
	memory.size = this._getSize();
	memory.color = this._getColor();
	memory.alignment = this._getAlignment();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
TextBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.text = memory.text;
	this.font = memory.font;
	this.size = memory.size;
	this.color = memory.color;
	this.alignment = memory.alignment;
}

// Private function
// Input parameters: boolean, whether or not changes in the parent class' properties are checked
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
TextBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
	PARAMS.initializeValidation();
	excludeParentProperties = PARAMS.validateParam(PARAMS.BOOLEAN, excludeParentProperties);

	var memory = this.getLatestMemory();
	if (memory == null) {
		return true;
	}
	else if (excludeParentProperties) {
		return !(memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.alignment == this.alignment && memory.color == this.color);
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.alignment == this.alignment && memory.color == this.color);
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouse event is within the boundaries of an object
// Description: converts coordinates of the mouse event (global coordinates) into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
TextBlock.prototype.isMouseEventWithinBlock = function(e) {
	PARAMS.initializeValidation();
	e = PARAMS.validateParam(PARAMS.MOUSEEVENT, e);

	MATRIX.clearTransformations();

	this.addInverseTransformationsToMatrix(MATRIX);

	var xyResult = MATRIX.applyTransformation(e.x,e.y);

	LOG.writeObject(xyResult);

	switch (this._getAlignment()) {
		case "center":
			if (xyResult.x > -this.width/2 && xyResult.x < this.width/2 &&
				xyResult.y > -this.ascent && xyResult.y < this.height - this.ascent) {
				return true;
			}
			else {
				return false;
			}
			break;

		case "left":
			if (xyResult.x > 0 && xyResult.x < this.width &&
				xyResult.y > -this.ascent && xyResult.y < this.height - this.ascent) {
				return true;
			}
			else {
				return false;
			}
			break;

		case "right":
			if (xyResult.x > -this.width && xyResult.x < 0 &&
				xyResult.y > -this.ascent && xyResult.y < this.height - this.ascent) {
				return true;
			}
			else {
				return false;
			}
			break;
	}
}

// // Public function
// // Input parameters: string
// // Returns: nothing
// // Description: sets the text property of the TextBlock object
// TextBlock.prototype.setText = function(newText) {
// 	PARAMS.initializeValidation();
// 	newText = PARAMS.validateParam(PARAMS.STRING, newText);

// 	this.text = newText;
// }

// // Public function
// // Input parameters: string (left, center, right)
// // Returns: nothing
// // Description: sets the alignment property of the TextBlock object
// TextBlock.prototype.setAlignment = function(newAlignment) {
// 	PARAMS.initializeValidation();
// 	newAlignment = PARAMS.validateParam(PARAMS.STRING, newAlignment);

// 	switch (newAlignment) {
// 		case "left":
// 		case "right":
// 		case "center":
// 			this.alignment = newAlignment;
// 			break;
// 	}
// }

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's text after applying necessary transformations
TextBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			switch (this._getAlignment()) {
				case "center":
					originX = this._getWidth()/2;
					originY = 0;
					break;

				case "left":
					originX = 0;
					originY = 0;
					break;

				case "right":
					originX = this._getWidth();
					originY = 0;
					break;
			}

			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());				

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);
			
			dest.clearRect(-originX - 12, -originY - this.ascent - 10, this._getWidth() + 14, this._getHeight() + 24);

			if (this.showDebugDisplay) {
				dest.clearRect(-3,-3,6,6);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in TextBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: canvas context where updates may occur
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles text and font updates
TextBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	this._setText(this.text);
	this._setFont(this.font);
	this._setSize(this.size);
	this._setColor(this.color);
	this._setAlignment(this.alignment); 

	if (this.hasChangedFromLatestMemory(true)) {
		CANVASMANAGER.workingCanvasFrame.context.save();
		CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
		CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
		CANVASMANAGER.workingCanvasFrame.context.fillText(this.text, 0, 0);
		this.width = CANVASMANAGER.workingCanvasFrame.context.measureText(this.text).width;
		CANVASMANAGER.workingCanvasFrame.context.restore();

		var metric = TEXTHELPER.measureTextHeight(this.text,this.font,this.size);
		this.height = metric.height;
		this.ascent = metric.ascent;
		this.descent = metric.descent;
	}

	if (this.width == 0) { this.width = 1; }
	if (this.height ==0) { this.height = 1; }

	this._setWidth(this.width);
	this._setHeight(this.height);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current text after applying necessary transformations
TextBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);
	
	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			switch (this._getAlignment()) {
				case "center":
					originX = this._getWidth()/2;
					originY = 0;
					break;

				case "left":
					originX = 0;
					originY = 0;
					break;

				case "right":
					originX = this._getWidth();
					originY = 0;
					break;
			}

			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			// for some reason, hidden ascenders and descenders are revealed 
			// when rotation != 0 degrees (depending on zoom)
			dest.rotate((this._getRotation()+0.019)*Math.PI/180);  
			
			//dest.drawImage(this.textImage,-originX,-originY);

			switch(this.maskMode) {
				case "window":
					dest.globalCompositeOperation = "destination-in";
				break;

				case "wall":
					dest.globalCompositeOperation = "destination-out";
				break;
			}

			dest.font = this._getSize() + "px " + this._getFont();
			dest.fillStyle = this._getColor();
			dest.fillText(this._getText(), -originX, -originY);

			if (this.showDebugDisplay) {
				dest.save();
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				dest.rect(-originX, -originY - this.ascent, this._getWidth(), this._getHeight());
				dest.stroke();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this.ascent);
				dest.stroke();
				dest.fillStyle = "Red";
				dest.fillRect(-2,-2,4,4);
				dest.restore();
			}

			this.children.sort(function(a,b) { return b.z - a.z });
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in TextBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

TextBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {

		this.text = undefined;
		this.font = undefined;
		this.size = undefined;
		this.color = undefined;

		this._setText(undefined);
		this._setFont(undefined);
		this._setSize(undefined);
		this._setColor(undefined);
		this._setAlignment(undefined);

		this.ascent = undefined;
		this.descent = undefined;

		this.maskMode = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}
// Public Constructor function
// Input parameter(s):  text (string), font name (string)(default:Verdana), 
//                      font size (integer)(default:12), font color (string/hex)(default:#000/Black), 
//                      text alignment (string:left, center, or right)
// Returns: ImageTextBlock object instantiated with the supplied text and font properties
// Description: utilizes the native canvas textFill function to draw text, and then saves the rasterized text as an image
// Example: var myITB = new ImageTextBlock("Hello world!", "Verdana", 12, "Blue", "left");
var ImageTextBlock = function(textParam, fontParam, sizeParam, colorParam, alignmentParam) {
	PARAMS.initializeValidation();
	textParam = PARAMS.validateParam(PARAMS.STRING, textParam);
	fontParam = PARAMS.validateParam(PARAMS.STRING, fontParam, "Arial, Helvetica, sans-serif");
	sizeParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, sizeParam, 12);
	colorParam = PARAMS.validateParam(PARAMS.STRING, colorParam, "#000");
	alignmentParam = PARAMS.validateParam(PARAMS.STRING, alignmentParam, "center");

	LOG.write("ImageTextBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	var text = "";
	var font = "";
	var size = 0;
	var color = 0;
	var alignment = "";

	this._getText = function() { return text; };
	this._getFont = function() { return font; };
	this._getSize = function() { return size; };
	this._getColor = function() { return color; };
	this._getAlignment = function() { return alignment; };

	this._setText = function(val) { text = val; };
	this._setFont = function(val) { font = val; };
	this._setSize = function(val) { size = val; };
	this._setColor = function(val) { color = val; };
	this._setAlignment = function(val) { 
		switch(val) {
			case "left":
			case "right":
			case "center":
				alignment = val;
		}
	};

	this.text = textParam;
	this.font = fontParam;
	this.size = sizeParam;
	this.color = colorParam;
	
	this.alignment = "center";
	switch (alignmentParam) {
		case "left":
		case "right":
		case "center":
			this.alignment = alignmentParam;
			break;
	}

	//this.textImageData = null;
	this.textImage = new Image();

	this.maskMode = "none";

	this.createTextData();
}

ImageTextBlock.prototype = new ActorBlock();
ImageTextBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
ImageTextBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.text = this._getText();
	memory.font = this._getFont();
	memory.size = this._getSize();
	memory.color = this._getColor();
	memory.alignment = this._getAlignment();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
ImageTextBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.text = memory.text;
	this.font = memory.font;
	this.size = memory.size;
	this.color = memory.color;
	this.alignment = memory.alignment;
}

// Private function
// Input parameters: boolean, whether or not changes in the parent class' properties are checked
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
ImageTextBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
	PARAMS.initializeValidation();
	excludeParentProperties = PARAMS.validateParam(PARAMS.BOOLEAN, excludeParentProperties);

	var memory = this.getLatestMemory();
	if (memory == null) {
		return true;
	}
	else if (excludeParentProperties) {
		return !(memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.alignment == this.alignment && memory.color == this.color);
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.alignment == this.alignment && memory.color == this.color);
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: creates imageData and image objects from the text and font properties
ImageTextBlock.prototype.createTextData = function() {
	LOG.write("creating text data");
	//LOG.write(this.identity + " child of " + this.parent.identity);

	CANVASMANAGER.workingCanvasFrame.context.save();

	CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
	CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
	CANVASMANAGER.workingCanvasFrame.context.textBaseline = 'top';
    CANVASMANAGER.workingCanvasFrame.context.textAlign = 'left';

    // m is an additional buffer in case the font isn't set up properly
    // causing parts of the font to be cut off
    var m = CANVASMANAGER.workingCanvasFrame.context.measureText("M").width;

	this.width = CANVASMANAGER.workingCanvasFrame.context.measureText(this.text).width + m;
	if (this.width == 0) { this.width = 1; }
	var textMetric = TEXTHELPER.measureTextHeight(this.text,this.font,this.size);
	this.height = textMetric.height + 1 + m;

	CANVASMANAGER.workingCanvasFrame.resize(this.width,this.height,-1);

	// since resizing reinitializes the canvas context, we need to reset our text properties
	CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
	CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
	CANVASMANAGER.workingCanvasFrame.context.textBaseline = 'top';
    CANVASMANAGER.workingCanvasFrame.context.textAlign = 'left';

	CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,this.width,this.height);

	CANVASMANAGER.workingCanvasFrame.context.save();
	// for some reason, hidden ascenders and descenders are revealed 
	// when rotation != 0 degrees (depending on zoom)
	CANVASMANAGER.workingCanvasFrame.context.translate(m/2,m/2);
	CANVASMANAGER.workingCanvasFrame.context.rotate(0.1*Math.PI/180);
	

	if (this.text.length > 0) {
		CANVASMANAGER.workingCanvasFrame.context.fillText(this.text, 0, 0);
	}
	else {
		CANVASMANAGER.workingCanvasFrame.context.fillText(" ", 0, 0);
	}

	CANVASMANAGER.workingCanvasFrame.context.restore();
	CANVASMANAGER.workingCanvasFrame.context.restore();

	this.textImage.src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();

}

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the image of text of the current frame, 
// or returns null if no text image can be found
ImageTextBlock.prototype.getCurrentFrame = function() {
	if (this.text && this.textImage) {
		return this.textImage;
	}
	else {
		return null;
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouse event is within the boundaries of an object
// Description: converts coordinates of the mouse event (global coordinates) into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
ImageTextBlock.prototype.isMouseEventWithinBlock = function(e) {
	PARAMS.initializeValidation();
	e = PARAMS.validateParam(PARAMS.MOUSEEVENT, e);

	MATRIX.clearTransformations();

	this.addInverseTransformationsToMatrix(MATRIX);

	var xyResult = MATRIX.applyTransformation(e.x,e.y);

	LOG.writeObject(xyResult);

	// switch (this.alignment) {
	// 	case "center":
			if (xyResult.x > -this.width/2 && xyResult.x < this.width/2 &&
				xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
				return true;
			}
			else {
				return false;
			}
		// 	break;

		// case "left":
		// 	if (xyResult.x > 0 && xyResult.x < this.width &&
		// 		xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
		// 		return true;
		// 	}
		// 	else {
		// 		return false;
		// 	}
		// 	break;

		// case "right":
		// 	if (xyResult.x > -this.width && xyResult.x < 0 &&
		// 		xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
		// 		return true;
		// 	}
		// 	else {
		// 		return false;
		// 	}
		// 	break;
	// }
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's text after applying necessary transformations
ImageTextBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			// switch (this.lastAlignment) {
			// 	case "center":
					originX = this._getWidth()/2;
					originY = this._getHeight()/2;
			// 		break;

			// 	case "left":
			// 		originX = 0;
			// 		originY = this.height/2;
			// 		break;

			// 	case "right":
			// 		originX = this.width;
			// 		originY = this.height/2;
			// 		break;
			// }

			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());				

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			if (!this._getShattered()) {
				dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
			}

			if (this.showDebugDisplay) {
				dest.clearRect(-5,-5,10,10);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in ImageTextBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: canvas context where updates may occur
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles text and font updates
ImageTextBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	this._setText(this.text);
	this._setFont(this.font);
	this._setSize(this.size);
	this._setColor(this.color);
	this._setAlignment(this.alignment);

	if (this.hasChangedFromLatestMemory(true)) {
		this.createTextData();
	}

	this._setWidth(this.width);
	this._setHeight(this.height);

	this._setShattered(this.shattered);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current text after applying necessary transformations
ImageTextBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			// switch (this.alignment) {
			// 	case "center":
					originX = this._getWidth()/2;
					originY = this._getHeight()/2;
			// 		break;

			// 	case "left":
			// 		originX = 0;
			// 		originY = this.height/2;
			// 		break;

			// 	case "right":
			// 		originX = this.width;
			// 		originY = this.height/2;
			// 		break;
			// }

			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			switch(this.maskMode) {
				case "window":
					dest.globalCompositeOperation = "destination-in";
				break;

				case "wall":
					dest.globalCompositeOperation = "destination-out";
				break;
			}
			
			if (!this._getShattered()) {
				var currentFrame = this.getCurrentFrame();
				if (currentFrame != null) {	
					dest.drawImage(currentFrame,-this._getWidth()/2,-this._getHeight()/2);
				}
			}

			if (this.showDebugDisplay) {
				dest.save();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this._getHeight()/2);
				dest.stroke();
				dest.fillStyle = "Red";
				dest.fillRect(-4,-4,8,8);
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				dest.rect(-originX,-originY,this._getWidth(),this._getHeight());
				dest.stroke();
				dest.restore();
			}

			this.children.sort(function(a,b) { return b.z - a.z });
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		dest.restore();
		LOG.write("error in ImageTextBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

ImageTextBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {

		this.text = undefined;
		this.font = undefined;
		this.size = undefined;
		this.color = undefined;

		this._setText(undefined);
		this._setFont(undefined);
		this._setSize(undefined);
		this._setColor(undefined);
		this._setAlignment(undefined);

		this.shattered = undefined;
		this._setShattered(undefined);

		delete(this.textImage);
		this.textImage = undefined;

		this.ascent = undefined;
		this.descent = undefined;

		this.maskMode = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}
// Public Constructor function
// Input parameter(s):  max width, in pixels (integer), text (string, can include newline characters), 
//						font name (string)(default:Verdana), font size (integer)(default:12), 
//						font color (string/hex)(default:#000/Black), text alignment (string:left, center, or right)
// Returns: ParagraphBlock object instantiated with the supplied text and font properties
// Description: utilizes the native canvas textFill function to draw text
// Example: var myPB = new ParagraphBlock(250, "Hello world!\nYou can include new line characters", "Verdana", 12, "Blue", "left");
var ParagraphBlock = function(widthParam, textParam, fontParam, sizeParam, colorParam, alignmentParam, lineSpacingParam) {
	PARAMS.initializeValidation();
	widthParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, widthParam);
	textParam = PARAMS.validateParam(PARAMS.STRING, textParam);
	fontParam = PARAMS.validateParam(PARAMS.STRING, fontParam, "Arial, Helvetica, sans-serif");
	sizeParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, sizeParam, 12);
	colorParam = PARAMS.validateParam(PARAMS.STRING, colorParam, "#000");
	alignmentParam = PARAMS.validateParam(PARAMS.STRING, alignmentParam, "center");
	lineSpacingParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, lineSpacingParam);

	LOG.write("ParagraphBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	var text = "";
	var font = "";
	var size = 0;
	var color = 0;
	var lineSpacing = 0;
	var lineHeight = 0;
	var alignment = "";

	this._getText = function() { return text; };
	this._getFont = function() { return font; };
	this._getSize = function() { return size; };
	this._getColor = function() { return color; };
	this._getLineSpacing = function() { return lineSpacing; };
	this._getLineHeight = function() { return lineHeight; };
	this._getAlignment = function() { return alignment; };

	this._setText = function(val) { text = val; };
	this._setFont = function(val) { font = val; };
	this._setSize = function(val) { size = val; };
	this._setColor = function(val) { color = val; };
	this._setLineSpacing = function(val) { lineSpacing = val; };
	this._setLineHeight = function(val) { lineHeight = val; };
	this._setAlignment = function(val) { 
		switch(val) {
			case "left":
			case "right":
			case "center":
				alignment = val; 
		}
	};

	this.width = widthParam;
	this.lineHeight = 0;
	this.height = 0;

	this.text = textParam;
	this.textFragments = new Array(this.text);

	this.font = fontParam;
	this.size = sizeParam;
	this.color = colorParam;
	this.lineSpacing = lineSpacingParam;

	this.alignment = "center";
	switch (alignmentParam) {
		case "left":
		case "right":
		case "center":
			this.alignment = alignmentParam;
			break;
	}

	this.ascent = 0;
	this.descent = 0;
	
	this.maskMode = "none";
}

ParagraphBlock.prototype = new ActorBlock();

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
ParagraphBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.width = this._getWidth();
	memory.text = this._getText();
	memory.font = this._getFont();
	memory.size = this._getSize();
	memory.color = this._getColor();
	memory.lineSpacing = this._getLineSpacing();
	memory.alignment = this._getAlignment();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
ParagraphBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.width = memory.width;
	this.text = memory.text;
	this.font = memory.font;
	this.size = memory.size;
	this.color = memory.color;
	this.lineSpacing = memory.lineSpacing;
	this.alignment = memory.alignment;
}

// Private function
// Input parameters: boolean, whether or not changes in the parent class' properties are checked
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
ParagraphBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
	PARAMS.initializeValidation();
	excludeParentProperties = PARAMS.validateParam(PARAMS.BOOLEAN, excludeParentProperties);

	var memory = this.getLatestMemory();
	if (memory == null) {
		return true;
	}
	else if (excludeParentProperties) {
		return !(memory.width == this.width && memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.lineSpacing == this.lineSpacing && memory.alignment == this.alignment && memory.color == this.color);
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.width == this.width && memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.lineSpacing == this.lineSpacing && memory.alignment == this.alignment && memory.color == this.color);
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouse event is within the boundaries of an object
// Description: converts coordinates of the mouse event (global coordinates) into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
ParagraphBlock.prototype.isMouseEventWithinBlock = function(e) {
	PARAMS.initializeValidation();
	e = PARAMS.validateParam(PARAMS.MOUSEEVENT, e);

	MATRIX.clearTransformations();

	this.addInverseTransformationsToMatrix(MATRIX);

	var xyResult = MATRIX.applyTransformation(e.x,e.y);

	LOG.writeObject(xyResult);

	switch (this.alignment) {
		case "center":
			if (xyResult.x > -this.width/2 && xyResult.x < this.width/2 &&
				xyResult.y > -this.lineHeight && xyResult.y < this.height - this.lineHeight) {
				return true;
			}
			else {
				return false;
			}
			break;

		case "left":
			if (xyResult.x > 0 && xyResult.x < this.width &&
				xyResult.y > -this.lineHeight && xyResult.y < this.height - this.lineHeight) {
				return true;
			}
			else {
				return false;
			}
			break;

		case "right":
			if (xyResult.x > -this.width && xyResult.x < 0 &&
				xyResult.y > -this.lineHeight && xyResult.y < this.height - this.lineHeight) {
				return true;
			}
			else {
				return false;
			}
			break;
	}
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's text after applying necessary transformations
ParagraphBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(zratio*this._getX());
			drawy = Math.round(zratio*this._getY());				

			dest.save();
			dest.translate(drawx,drawy);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			var originX = 0;
			var originY = 0;

			switch (this._getAlignment()) {
				case "center":
					originX = this._getWidth()/2;
					break;

				case "left":
					originX = 0;
					break;

				case "right":
					originX = this._getWidth();
					break;
			}
			
			dest.clearRect(-originX - 12, -originY - this._getLineHeight() - 1, this._getWidth() + 14, this._getHeight() + 24);

			if (this.showDebugDisplay) {
				dest.clearRect(-3,-3,6,6);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in ParagraphBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: canvas context where updates may occur
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles text and font updates
ParagraphBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	this._setText(this.text);
	this._setFont(this.font);
	this._setSize(this.size);
	this._setColor(this.color);
	this._setLineSpacing(this.lineSpacing);
	this._setAlignment(this.alignment);

	if (this.hasChangedFromLatestMemory(true)) {
		CANVASMANAGER.workingCanvasFrame.context.save();
		CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
		CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
		CANVASMANAGER.workingCanvasFrame.context.fillText(this.text, 0, 0);

		this.textFragments.length = 0;
		this.textFragments[0] = { text: "", width: 0 };
		var currentFragmentIndex = 0;

		var lines = this.text.split("\n");

		for (var l = 0; l < lines.length; l++) {
			var words = lines[l].split(" ");

			for (var i = 0; i < words.length; i++) {
				var newFragment = this.textFragments[currentFragmentIndex].text + words[i];
				var fragmentWidth = CANVASMANAGER.workingCanvasFrame.context.measureText(newFragment).width;

				if (fragmentWidth <= this.width) {
					this.textFragments[currentFragmentIndex].text = newFragment + " ";
					this.textFragments[currentFragmentIndex].width = fragmentWidth;
				}
				else if (newFragment.length == words[i].length) {
					var prevChunk = "";
					for (var j = 0; j < newFragment.length; j++) {
						var newChunk = this.textFragments[currentFragmentIndex].text + newFragment.charAt(j);
						var chunkWidth = CANVASMANAGER.workingCanvasFrame.context.measureText(newChunk).width;
						if (chunkWidth <= this.width) {
							this.textFragments[currentFragmentIndex].text += newFragment.charAt(j);
							this.textFragments[currentFragmentIndex].width = chunkWidth;
						}
						else if (newChunk.length == 1) {
							this.textFragments[currentFragmentIndex].text = newChunk;
							this.textFragments[currentFragmentIndex].width = chunkWidth;
							currentFragmentIndex++;
							this.textFragments[currentFragmentIndex] = { text: "", width: 0 };
						}
						else {
							currentFragmentIndex++;
							this.textFragments[currentFragmentIndex] = { text: "", width: 0 };
							j--;
						}
					}
					if (this.textFragments[currentFragmentIndex].text.length > 0) {
						this.textFragments[currentFragmentIndex].text += " ";
					} 
				}
				else {
					currentFragmentIndex++;
					this.textFragments[currentFragmentIndex] =  { text: "", width: 0 };
					i--;
				}
			}
			currentFragmentIndex++;
			this.textFragments[currentFragmentIndex] =  { text: "", width: 0 };
		}

		if (this.textFragments[currentFragmentIndex].text == "") {
			this.textFragments.pop();
		}

		CANVASMANAGER.workingCanvasFrame.context.restore();

		var metric = TEXTHELPER.measureTextHeight(this.textFragments[0].text,this.font,this.size);
		this.lineHeight = metric.height;
		this.ascent = metric.ascent;
		this.descent = metric.descent;

		if (this.lineHeight == 0) { this.lineHeight = 1; }	

		this._setLineHeight(this.lineHeight);

		// m is an additional buffer in case the font isn't set up properly
		// causing parts of the font to be cut off
		var m = CANVASMANAGER.workingCanvasFrame.context.measureText("M").width;
		this.height = this.textFragments.length * this.lineHeight + (this.textFragments.length - 1) * this.lineSpacing + m;
	}

	if (this.width == 0) { this.width = 1; }
	if (this.height ==0) { this.height = 1; }

	this._setWidth(this.width);
	this._setHeight(this.height);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current text after applying necessary transformations
ParagraphBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);
	
	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(zratio*this._getX());
			drawy = Math.round(zratio*this._getY());

			dest.save();
			dest.translate(drawx,drawy);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			// for some reason, hidden ascenders and descenders are revealed 
			// when rotation != 0 degrees (depending on zoom)
			dest.rotate((this._getRotation()+0.019)*Math.PI/180);  
			
			//dest.drawImage(this.textImage,-originX,-originY);

			switch(this.maskMode) {
				case "window":
					dest.globalCompositeOperation = "destination-in";
				break;

				case "wall":
					dest.globalCompositeOperation = "destination-out";
				break;
			}

			dest.font = this._getSize() + "px " + this._getFont();
			dest.fillStyle = this._getColor();

			var originX = 0;
			var originY = 0;

			for (var i = 0; i < this.textFragments.length; i++) {

				switch (this._getAlignment()) {
					case "center":
						originX = this.textFragments[i].width/2;
						break;

					case "left":
						originX = 0;
						break;

					case "right":
						originX = this.textFragments[i].width;
						break;
				}

				dest.fillText(this.textFragments[i].text, -originX, originY);
				originY += this._getLineHeight() + this._getLineSpacing();
			}

			if (this.showDebugDisplay) {
				dest.save();
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				var ox = 0;
				switch(this._getAlignment()) {
					case "center":
						ox = this._getWidth()/2;
						break;

					case "left":
						ox = 0;
						break;

					case "right":
						ox = this._getWidth();
						break;
				}
				dest.rect(-ox, -this._getLineHeight(), this._getWidth(), this._getHeight());
				dest.stroke();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this.ascent);
				dest.stroke();
				dest.fillStyle = "Red";
				dest.fillRect(-2,-2,4,4);
				dest.restore();
			}

			this.children.sort(function(a,b) { return b.z - a.z });
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in ParagraphBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

ParagraphBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {

		this.text = undefined;
		this.font = undefined;
		this.size = undefined;
		this.color = undefined;
		this.lineHeight = undefined;
		this.lineSpacing = undefined;

		this.textFragments.splice(0,this.textFragments.length);
		this.textFragments = undefined;

		this._setText(undefined);
		this._setFont(undefined);
		this._setSize(undefined);
		this._setColor(undefined);
		this._setAlignment(undefined);
		this._setLineHeight(undefined);
		this._setLineSpacing(undefined);

		this.ascent = undefined;
		this.descent = undefined;

		this.maskMode = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}
// Public Constructor function
// Input parameter(s):  max width, in pixels (integer), text (string, can include newline characters), 
//						font name (string)(default:Verdana), font size (integer)(default:12), 
//						font color (string/hex)(default:#000/Black), text alignment (string:left, center, or right)
// Returns: ImageParagraphBlock object instantiated with the supplied text and font properties
// Description: utilizes the native canvas textFill function to draw text
// Example: var myPB = new ImageParagraphBlock(250, "Hello world!\nYou can include new line characters", "Verdana", 12, "Blue", "left");
var ImageParagraphBlock = function(widthParam, textParam, fontParam, sizeParam, colorParam, alignmentParam, lineSpacingParam) {
	PARAMS.initializeValidation();
	widthParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, widthParam);
	textParam = PARAMS.validateParam(PARAMS.STRING, textParam);
	fontParam = PARAMS.validateParam(PARAMS.STRING, fontParam, "Arial, Helvetica, sans-serif");
	sizeParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, sizeParam, 12);
	colorParam = PARAMS.validateParam(PARAMS.STRING, colorParam, "#000");
	alignmentParam = PARAMS.validateParam(PARAMS.STRING, alignmentParam, "center");
	lineSpacingParam = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, lineSpacingParam, 0);

	LOG.write("ImageParagraphBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	var text = "";
	var font = "";
	var size = 0;
	var color = 0;
	var lineSpacing = 0;
	var lineHeight = 0;
	var alignment = "";

	this._getText = function() { return text; };
	this._getFont = function() { return font; };
	this._getSize = function() { return size; };
	this._getColor = function() { return color; };
	this._getLineSpacing = function() { return lineSpacing; };
	this._getLineHeight = function() { return lineHeight; };
	this._getAlignment = function() { return alignment; };

	this._setText = function(val) { text = val; };
	this._setFont = function(val) { font = val; };
	this._setSize = function(val) { size = val; };
	this._setColor = function(val) { color = val; };
	this._setLineSpacing = function(val) { lineSpacing = val; };
	this._setLineHeight = function(val) { lineHeight = val; };
	this._setAlignment = function(val) { 
		switch(val) {
			case "left":
			case "right":
			case "center":
				alignment = val; 
		}
	};

	this.width = widthParam;
	this.lineHeight = 0;
	this.height = 0;

	this.text = textParam;
	this.textFragments = new Array(this.text);

	this.font = fontParam;
	this.size = sizeParam;
	this.color = colorParam;
	this.lineSpacing = lineSpacingParam;

	this.alignment = "center";
	switch (alignmentParam) {
		case "left":
		case "right":
		case "center":
			this.alignment = alignmentParam;
			break;
	}

	this.ascent = 0;
	this.descent = 0;
	
	this.textImage = new Image();

	this.maskMode = "none";
}

ImageParagraphBlock.prototype = new ActorBlock();
ImageParagraphBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
ImageParagraphBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.width = this._getWidth();
	memory.text = this._getText();
	memory.font = this._getFont();
	memory.size = this._getSize();
	memory.color = this._getColor();
	memory.alignment = this._getAlignment();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
ImageParagraphBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.width = memory.width;
	this.text = memory.text;
	this.font = memory.font;
	this.size = memory.size;
	this.color = memory.color;
	this.alignment = memory.alignment;
}

// Private function
// Input parameters: boolean, whether or not changes in the parent class' properties are checked
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
ImageParagraphBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
	PARAMS.initializeValidation();
	excludeParentProperties = PARAMS.validateParam(PARAMS.BOOLEAN, excludeParentProperties);

	var memory = this.getLatestMemory();
	if (memory == null) {
		return true;
	}
	else if (excludeParentProperties) {
		return !(memory.width == this.width && memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.alignment == this.alignment && memory.color == this.color);
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.width == this.width && memory.text == this.text && memory.font == this.font && memory.size == this.size && memory.alignment == this.alignment && memory.color == this.color);
	}
}

// Private function
// Input parameters: mouseEvent object
// Returns: Boolean indicating if the mouse event is within the boundaries of an object
// Description: converts coordinates of the mouse event (global coordinates) into the coordinates of an object (local coordinates),
// and then checks if the mouse event coordinates are within the bounds of an object
ImageParagraphBlock.prototype.isMouseEventWithinBlock = function(e) {
	PARAMS.initializeValidation();
	e = PARAMS.validateParam(PARAMS.MOUSEEVENT, e);

	MATRIX.clearTransformations();

	this.addInverseTransformationsToMatrix(MATRIX);

	var xyResult = MATRIX.applyTransformation(e.x,e.y);

	LOG.writeObject(xyResult);

	// switch (this.alignment) {
	// 	case "center":
			if (xyResult.x > -this.width/2 && xyResult.x < this.width/2 &&
				xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
				return true;
			}
			else {
				return false;
			}
		// 	break;

		// case "left":
		// 	if (xyResult.x > 0 && xyResult.x < this.width &&
		// 		xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
		// 		return true;
		// 	}
		// 	else {
		// 		return false;
		// 	}
		// 	break;

		// case "right":
		// 	if (xyResult.x > -this.width && xyResult.x < 0 &&
		// 		xyResult.y > -this.height/2 && xyResult.y < this.height/2) {
		// 		return true;
		// 	}
		// 	else {
		// 		return false;
		// 	}
		// 	break;
	// }
}

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the image of text of the current frame, 
// or returns null if no text image can be found
ImageParagraphBlock.prototype.getCurrentFrame = function() {
	if (this.text && this.textImage) {
		return this.textImage;
	}
	else {
		return null;
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: creates imageData and image objects from the text and font properties
ImageParagraphBlock.prototype.createTextData = function() {
	LOG.write("creating text data");
	//LOG.write(this.identity + " child of " + this.parent.identity);

	if (this.width == 0) { this.width = 1; }

	CANVASMANAGER.workingCanvasFrame.resize(this.width,this.height,-1);

	CANVASMANAGER.workingCanvasFrame.context.save();
	CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
	CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
	CANVASMANAGER.workingCanvasFrame.context.textBaseline = 'top';
    CANVASMANAGER.workingCanvasFrame.context.textAlign = 'left';

	CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,this.width,this.height);

	// for some reason, hidden ascenders and descenders are revealed 
	// when rotation != 0 degrees (depending on zoom)
	//CANVASMANAGER.workingCanvasFrame.context.translate(m/2,m/2);
	CANVASMANAGER.workingCanvasFrame.context.rotate(0.1*Math.PI/180);


	var originX = 0;
	var originY = 0;

	for (var i = 0; i < this.textFragments.length; i++) {

		switch (this.alignment) {
			case "center":
				originX = (this.width - this.textFragments[i].width)/2;
				break;

			case "left":
				originX = 0;
				break;

			case "right":
				originX = this.width - this.textFragments[i].width;
				break;
		}

		CANVASMANAGER.workingCanvasFrame.context.fillText(this.textFragments[i].text, originX, originY);
		originY += this.lineHeight + this.lineSpacing;
	}

	/*
	if (this.text.length > 0) {
		CANVASMANAGER.workingCanvasFrame.context.fillText(this.text, 0, 0);
	}
	else {
		CANVASMANAGER.workingCanvasFrame.context.fillText(" ", 0, 0);
	}
	*/

	CANVASMANAGER.workingCanvasFrame.context.restore();

	//this.textImageData = CANVASMANAGER.workingCanvasFrame.context.getImageData(0,0,this.width,this.height);
	this.textImage.src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();

}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's text after applying necessary transformations
ImageParagraphBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			// switch (this.lastAlignment) {
			// 	case "center":
					originX = this._getWidth()/2;
					originY = this._getHeight()/2;
			// 		break;

			// 	case "left":
			// 		originX = 0;
			// 		originY = this.height/2;
			// 		break;

			// 	case "right":
			// 		originX = this.width;
			// 		originY = this.height/2;
			// 		break;
			// }


			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());				

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			// if (this.parent.shattered && this.homeX != undefined && this.homeY != undefined) {
			// 	dest.clearRect(-this.width/2 - 1,-this.height/2 - 1,this.width + 2,this.height + 2);
			// }
			// else 
			if (!this._getShattered()) {
				dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
			}

			if (this.showDebugDisplay) {
				dest.clearRect(-5,-5,10,10);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in TextBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: canvas context where updates may occur
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles text and font updates
ImageParagraphBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	this._setText(this.text);
	this._setFont(this.font);
	this._setSize(this.size);
	this._setColor(this.color);
	this._setLineSpacing(this.lineSpacing);
	this._setAlignment(this.alignment);

	if (this.hasChangedFromLatestMemory(true)) {
		CANVASMANAGER.workingCanvasFrame.context.save();
		CANVASMANAGER.workingCanvasFrame.context.font = this.size + "px " + this.font;
		CANVASMANAGER.workingCanvasFrame.context.fillStyle = this.color;
		CANVASMANAGER.workingCanvasFrame.context.fillText(this.text, 0, 0);

		this.textFragments.length = 0;
		this.textFragments[0] = { text: "", width: 0 };
		var currentFragmentIndex = 0;

		var lines = this.text.split("\n");

		for (var l = 0; l < lines.length; l++) {
			var words = lines[l].split(" ");

			for (var i = 0; i < words.length; i++) {
				var newFragment = this.textFragments[currentFragmentIndex].text + words[i];
				var fragmentWidth = CANVASMANAGER.workingCanvasFrame.context.measureText(newFragment).width;

				if (fragmentWidth <= this.width) {
					this.textFragments[currentFragmentIndex].text = newFragment + " ";
					this.textFragments[currentFragmentIndex].width = fragmentWidth;
				}
				else if (newFragment.length == words[i].length) {
					var prevChunk = "";
					for (var j = 0; j < newFragment.length; j++) {
						var newChunk = this.textFragments[currentFragmentIndex].text + newFragment.charAt(j);
						var chunkWidth = CANVASMANAGER.workingCanvasFrame.context.measureText(newChunk).width;
						if (chunkWidth <= this.width) {
							this.textFragments[currentFragmentIndex].text += newFragment.charAt(j);
							this.textFragments[currentFragmentIndex].width = chunkWidth;
						}
						else if (newChunk.length == 1) {
							this.textFragments[currentFragmentIndex].text = newChunk;
							this.textFragments[currentFragmentIndex].width = chunkWidth;
							currentFragmentIndex++;
							this.textFragments[currentFragmentIndex] = { text: "", width: 0 };
						}
						else {
							currentFragmentIndex++;
							this.textFragments[currentFragmentIndex] = { text: "", width: 0 };
							j--;
						}
					}
					if (this.textFragments[currentFragmentIndex].text.length > 0) {
						this.textFragments[currentFragmentIndex].text += " ";
					} 
				}
				else {
					currentFragmentIndex++;
					this.textFragments[currentFragmentIndex] =  { text: "", width: 0 };
					i--;
				}
			}
			currentFragmentIndex++;
			this.textFragments[currentFragmentIndex] =  { text: "", width: 0 };
		}

		if (this.textFragments[currentFragmentIndex].text == "") {
			this.textFragments.pop();
		}

		if (this.lineHeight == 0) { this.lineHeight = 1; }

		// m is an additional buffer in case the font isn't set up properly
		// causing parts of the font to be cut off
		var m = CANVASMANAGER.workingCanvasFrame.context.measureText("M").width;

		var metric = TEXTHELPER.measureTextHeight(this.textFragments[0].text,this.font,this.size);
		this.lineHeight = metric.height;
		this._setLineHeight(this.lineHeight);
		this.ascent = metric.ascent;
		this.descent = metric.descent;
		
		this.height = this.textFragments.length * this.lineHeight + (this.textFragments.length - 1) * this.lineSpacing + m/2;

		CANVASMANAGER.workingCanvasFrame.context.restore();

		this.createTextData();
	}

	if (this.width == 0) { this.width = 1; }
	if (this.height ==0) { this.height = 1; }

	this._setWidth(this.width);
	this._setHeight(this.height);

	this._setShattered(this.shattered);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current text after applying necessary transformations
ImageParagraphBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);
	
	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var originX;
			var originY;

			// switch (this.alignment) {
			// 	case "center":
					originX = this._getWidth()/2;
					originY = this._getHeight()/2;
			// 		break;

			// 	case "left":
			// 		originX = 0;
			// 		originY = this.height/2;
			// 		break;

			// 	case "right":
			// 		originX = this.width;
			// 		originY = this.height/2;
			// 		break;
			// }


			var zratio = this.getZRatio();

			drawx = Math.round(-originX + zratio*this._getX());
			drawy = Math.round(-originY + zratio*this._getY());

			dest.save();
			dest.translate(drawx+originX,drawy+originY);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			switch(this.maskMode) {
				case "window":
					dest.globalCompositeOperation = "destination-in";
				break;

				case "wall":
					dest.globalCompositeOperation = "destination-out";
				break;
			}

			// if (this.parent.shattered && this.homeX != undefined && this.homeY != undefined) {
			// 	dest.drawImage(this.parent.textImage,this.homeX+this.parent.width/2-this.width/2,this.homeY+this.parent.height/2-this.height/2,this.width,this.height,
			// 									-this.width/2,-this.height/2,this.width,this.height);
			// }
			// else 
			if (!this._getShattered()) {
				dest.drawImage(this.textImage,-this._getWidth()/2,-this._getHeight()/2);
			}

			if (this.showDebugDisplay) {
				dest.save();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this._getHeight()/2);
				dest.stroke();
				dest.fillStyle = "Red";
				dest.fillRect(-4,-4,8,8);
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				dest.rect(-originX,-originY,this._getWidth(),this._getHeight());
				dest.stroke();
				dest.restore();
			}

			this.children.sort(function(a,b) { return b.z - a.z });
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in ImageParagraphBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

ImageParagraphBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.lineHeight = undefined;
		this.text = undefined;
		this.font = undefined;
		this.size = undefined;
		this.color = undefined;
		this.lineSpacing = undefined;
		this.alignment = undefined;

		this._setText(undefined);
		this._setFont(undefined);
		this._setSize(undefined);
		this._setColor(undefined);
		this._setAlignment(undefined);
		this._setLineHeight(undefined);
		this._setLineSpacing(undefined);

		this.textFragments.splice(0,this.textFragments.length);
		this.textFragments = undefined;

		this.ascent = undefined;
		this.descent = undefined;
		
		//this.textImageData = undefined;
		this.textImage = undefined;

		this.maskMode = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}
// Public Constructor function
// Input parameter(s):  image alias string, image alias string, ...
// Returns: VideoBlock object instantiated with the images matching the supplied input parameters
// Example: var myVB = new VideoBlock("img1", "img2", "img3", "img4");
var VideoBlock = function(videoAlias, width, height) {
	PARAMS.initializeValidation();
	videoAlias = PARAMS.validateParam(PARAMS.STRING, videoAlias, null);
	width = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, width);
	height = PARAMS.validateParam(PARAMS.UNSIGNEDINTEGER, height);

	LOG.write("VideoBlock constructor called", LOG.VERBOSE);
	PlayerBlock.call(this);

	var video = null;

	this._getVideo = function() { return video; };
	this._setVideo = function(val) { video = val; };

	if (videoAlias != null) {
		this.video = CANVASMANAGER.getVideoAsset(videoAlias);
	}
	this.width = width;
	this.height = height;

	this.currentTime = this.video ? 0 : this.video.getCurrentTime();
}

VideoBlock.prototype = new ActorBlock();
VideoBlock.prototype.learn(PlayerTraits);
VideoBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.sleep
VideoBlock.prototype.sleep = function() {
	ActorBlock.prototype.sleep.call(this);

	this.video.pause();
}

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.wake
VideoBlock.prototype.wake = function() {
	ActorBlock.prototype.wake.call(this);

	this.video.unpause();
}

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
VideoBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	memory.currentTime = this.video == undefined ? 0 : this.video.getCurrentTime();

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
VideoBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.currentTime = memory.currentTime;
	this.video.setCurrentTime(this.currentTime);
}

// Private function
// Input parameters: none
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
VideoBlock.prototype.hasChangedFromLatestMemory = function() {
	var memory = this.getLatestMemory();
	if (memory == null) {
		return false;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || !(memory.currentTime == this.currentTime);
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: plays the loaded video from the beginning
VideoBlock.prototype.play = function() {
	if (this.awake) {
		this.video.play();
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: pauses progression of the loaded video
VideoBlock.prototype.pause = function() {
	if (this.awake) {
		this.video.pause();
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: resumes progression of the loaded video
VideoBlock.prototype.unpause = function() {
	if (this.awake) {
		this.video.unpause();
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: toggles the play/pause state of the loaded video
VideoBlock.prototype.playPause = function() {
	if (this.awake) {
		this.video.playPause();
	}
}

// Public function
// Input parameter(s): none
// Returns: nothing
// Description: halts progression of the loaded video and returns to the beginning of the video
VideoBlock.prototype.stop = function() {
	if (this.awake) {
		this.video.play();
		this.video.pause();
	}
}

// Public function
// Input parameter(s): none
// Returns: integer between 0 and 100
// Description: returns the current volume the loaded video will play at
VideoBlock.prototype.getVolume = function() {
	return this.video.getVolume();
}

// Public function
// Input parameter(s): integer between 0 and 100
// Returns: nothing
// Description: sets the current volume the loaded video will play at
VideoBlock.prototype.setVolume = function(percent) {
	PARAMS.initializeValidation();
	percent = PARAMS.validateParam(PARAMS.NUMBER, percent);

	if (this.awake) {
		this.video.setVolume(percent);
	}
}

// Public function
// Input parameter(s): boolean
// Returns: nothing
// Description: sets whether or not the loaded video should loop
VideoBlock.prototype.setLooping = function(shouldLoop) {
	PARAMS.initializeValidation();
	shouldLoop = PARAMS.validateParam(PARAMS.BOOLEAN, shouldLoop);

	if (this.awake) {
		this.video.setLooping(shouldLoop);
	}
}

// Public function
// Input parameters: the new size for the shattered blocks (integer)
// Returns: nothing
// Description: shatters the current block's frames into an an array of new child blocks, 
// each with a small part of the original image/animation
VideoBlock.prototype.shatter = function(newBlockSize) {
	PARAMS.initializeValidation();
	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);
	
	if (!this.shattered) {
		var blockClusterPositions = new Array();

		var blockIndex = 0;
		for (var i = 0; i < this.width; i += newBlockSize) {
			for (var j = 0; j < this.height; j += newBlockSize) {
				if (blockClusterPositions[blockIndex] == undefined) {
					blockClusterPositions[blockIndex] = {"x":Math.floor(i - this.width/2 + newBlockSize/2), "y":Math.floor(j - this.height/2 + newBlockSize/2)};
				}
				
				blockIndex++;
			}
		}

		for (var i = 0; i < blockClusterPositions.length; i++) {
			var newBlock = new FragmentBlock(this, newBlockSize, newBlockSize, blockClusterPositions[i].x, blockClusterPositions[i].y, 0);

			newBlock.setMemoryCapacity(this.memoryCapacity);
			
			this.adoptChild(newBlock);
		}

		this.shattered = true;
	}
}

// Public function
// Input parameters: none
// Returns: nothing
// Description: removes child blocks resulting from shatter
VideoBlock.prototype.unshatter = function() {
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i] instanceof FragmentBlock) {
			this.children[i].destroy();
			this.children.splice(i,1);
			i--;
		}
	}
	this.shattered = false;
}

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the image of text of the current frame, 
// or returns null if no text image can be found
VideoBlock.prototype.getCurrentFrame = function() {
	if (this.video && this.video.video) {
		return this.video.video;
	}
	else {
		return null;
	}
}

VideoBlock.prototype.getHorizontalVideoScaling = function() {
	return this._getWidth() / this.video.video.videoWidth;
}

VideoBlock.prototype.getVerticalVideoScaling = function() {
	return this._getHeight() / this.video.video.videoHeight;
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to clear the rectangle occupied by the object's image after applying necessary transformations
VideoBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			if (!this._getShattered() && this._getVideo()) {
				dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in VideoBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles frame updates and filter/mask application
VideoBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	this._setVideo(this.video);
	this._setShattered(this.shattered);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to draw the object's current frame image after applying necessary transformations
VideoBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);
	
	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			// switch(this.maskMode) {
			// 	case "window":
			// 		dest.globalCompositeOperation = "destination-in";
			// 	break;

			// 	case "wall":
			// 		dest.globalCompositeOperation = "destination-out";
			// 	break;
			// }
			
			if (!this._getShattered() && this._getVideo()) {
				dest.drawImage(this._getVideo().video,-this._getWidth()/2,-this._getHeight()/2,this._getWidth(),this._getHeight());
			}

			if (this.showDebugDisplay) {
				dest.save();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this._getHeight()/2);
				dest.stroke();
				dest.fillStyle = "Red";
				dest.fillRect(-4,-4,8,8);
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				dest.rect(-this._getWidth()/2,-this._getHeight()/2,this._getWidth(),this._getHeight());
				dest.stroke();
				dest.restore();
			}

			this.children.sort(function(a,b) { return b.z - a.z });
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(dest);
			}
			
			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in MovieBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

VideoBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.video.destroy();
		this._getVideo().destroy();
		this._setVideo(undefined);

		this.currentTime = undefined;
		this.shattered = undefined;
		this._setShattered(undefined);
	}

	PlayerBlock.prototype.destroy.call(this);
}
// Public Constructor function
// Input parameter(s):  
// Returns: DrawingBlock object 
// Description: utilizes the native canvas drawing functions to draw...whatever you want
// User is responsible for undrawing what they have drawn
// Example: var myDB = new DrawingBlock()
var DrawingBlock = function(width,height) {
	PARAMS.initializeValidation();
	width = PARAMS.validateParam(PARAMS.INTEGER, width);
	height = PARAMS.validateParam(PARAMS.INTEGER, height);

	LOG.write("DrawingBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	this._setWidth(0);
	this._setHeight(0);

	this.width = width;
	this.height = height;

	this.drawingCommands = new Array();
	this.undrawingCommands = new Array();
}

DrawingBlock.prototype = new ActorBlock();
DrawingBlock.prototype.learn(CanvasTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
DrawingBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	// note to self: can we use extend here?
	if (memory.drawingCommands == undefined) {
		memory.drawingCommands = new Array();
	}
	else {
		memory.drawingCommands.splice(0,memory.drawingCommands.length);
	}
	for (var i = 0; i < this.drawingCommands.length; i++) {
		if (memory.drawingCommands[i] == undefined) {
			memory.drawingCommands[i] = new Object();
		}
		memory.drawingCommands[i].command = this.drawingCommands[i].command;

		if (this.drawingCommands[i].parameters != undefined) {
			if (memory.drawingCommands[i].parameters == undefined) {
				memory.drawingCommands[i].parameters = new Array();
			}
			else {
				memory.drawingCommands[i].parameters.splice(0,memory.drawingCommands[i].parameters.length);
			}
			for (var j = 0; j < this.drawingCommands[i].parameters.length; j++) {
				memory.drawingCommands[i].parameters[j] = this.drawingCommands[i].parameters[j];
			}
		}
		
	}
	
	if (memory.undrawingCommands == undefined) {
		memory.undrawingCommands = new Array();
	}
	else {
		memory.undrawingCommands.splice(0,memory.undrawingCommands.length);
	}
	for (var i = 0; i < this.undrawingCommands.length; i++) {
		if (memory.undrawingCommands[i] == undefined) {
			memory.undrawingCommands[i] = new Object();
		}
		memory.undrawingCommands[i].command = this.undrawingCommands[i].command;

		if (this.undrawingCommands[i].parameters != undefined) {
			if (memory.undrawingCommands[i].parameters == undefined) {
				memory.undrawingCommands[i].parameters = new Array();
			}
			else {
				memory.undrawingCommands[i].parameters.splice(0,memory.undrawingCommands[i].parameters.length);
			}
			for (var j = 0; j < this.undrawingCommands[i].parameters.length; j++) {
				memory.undrawingCommands[i].parameters[j] = this.undrawingCommands[i].parameters[j];
			}
		}
		
	}

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
DrawingBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.drawingCommands = memory.drawingCommands;
	this.undrawingCommands = memory.undrawingCommands;
}

// Private function
// Input parameters: boolean, whether or not changes in the parent class' properties are checked
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
DrawingBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
	PARAMS.initializeValidation();
	excludeParentProperties = PARAMS.validateParam(PARAMS.BOOLEAN, excludeParentProperties);

	var memory = this.getLatestMemory();
	var hasDifferentDrawingCommands = false;
	var hasDifferentUndrawingCommands = false;

	if (memory != null) {
		if (memory.drawingCommands != this.drawingCommands) {
			hasDifferentDrawingCommands = true;
		}
		for (var dc in memory.drawingCommands) {
			if (this.drawingCommands[dc] == undefined) {
				hasDifferentDrawingCommands = true;
				break;
			}
			else if (this.drawingCommands[dc].command != memory.drawingCommands[dc].command) {
				hasDifferentDrawingCommands = true;
				break;
			}
			else if (this.drawingCommands[dc].parameters != null && memory.drawingCommands[dc].parameters != null && 
					 	this.drawingCommands[dc].parameters.length != memory.drawingCommands[dc].parameters.length) {
				hasDifferentDrawingCommands = true;
				break;
			}
			else if (this.drawingCommands[dc].parameters != null && memory.drawingCommands[dc].parameters != null) {
				for (var i = 0; i < this.drawingCommands[dc].parameters.length; i++) {
					if (this.drawingCommands[dc].parameters[i] != memory.drawingCommands[dc].parameters[i]) {
						hasDifferentDrawingCommands = true;
						break;
					}
				}
			}
		}

		if (memory.undrawingCommands != this.undrawingCommands) {
			hasDifferentUndrawingCommands = true;
		}
		for (var uc in memory.undrawingCommands) {
			if (this.undrawingCommands[uc] == undefined) {
				hasDifferentUndrawingCommands = true;
				break;
			}
			else if (this.undrawingCommands[uc].command != memory.undrawingCommands[uc].command) {
				hasDifferentUndrawingCommands = true;
				break;
			}
			else if (this.undrawingCommands[uc].parameters != null && memory.undrawingCommands[uc].parameters != null && 
					 	this.undrawingCommands[uc].parameters.length != memory.undrawingCommands[uc].parameters.length) {
				hasDifferentUndrawingCommands = true;
				break;
			}
			else if (this.undrawingCommands[uc].parameters != null && memory.undrawingCommands[uc].parameters != null) {
				for (var i = 0; i < this.undrawingCommands[uc].parameters.length; i++) {
					if (this.undrawingCommands[uc].parameters[i] != memory.undrawingCommands[uc].parameters[i]) {
						hasDifferentUndrawingCommands = true;
						break;
					}
				}
			}
		}
	}
	else {
		hasDifferentDrawingCommands = true;
		hasDifferentUndrawingCommands = true;
	}

	if (memory == null) {
		return true;
	}
	else if (excludeParentProperties) {
		return hasDifferentDrawingCommands || hasDifferentUndrawingCommands;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || hasDifferentDrawingCommands || hasDifferentUndrawingCommands;
	}
}

DrawingBlock.prototype.addDrawingCommand = function(command, parameters) {
	PARAMS.initializeValidation();
	command = PARAMS.validateParam(PARAMS.STRING,command);
	parameters = PARAMS.validateParam(PARAMS.ARRAY,parameters);

	if (command.length > 0) {
		var drawingCommand = new Object();
		drawingCommand.command = command;
		drawingCommand.parameters = parameters;

		this.drawingCommands.push(drawingCommand);
	}
}

DrawingBlock.prototype.addUndrawingCommand = function(command, parameters) {
	PARAMS.initializeValidation();
	command = PARAMS.validateParam(PARAMS.STRING,command);
	parameters = PARAMS.validateParam(PARAMS.ARRAY,parameters);

	if (command.length > 0) {
		var undrawingCommand = new Object();
		undrawingCommand.command = command;
		undrawingCommand.parameters = parameters;

		this.undrawingCommands.push(undrawingCommand);
	}
}

DrawingBlock.prototype.addDrawingCommands = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING, PARAMS.ARRAYOFOBJECT],
							 arguments);

	for (var i = 0; i < arguments.length; i += 2) {
		var command = arguments[i];
		var parameters = arguments[i+1];

		if (command.length > 0) {
			var drawingCommand = new Object();
			drawingCommand.command = command;
			drawingCommand.parameters = parameters;

			this.drawingCommands.push(drawingCommand);
		}
	}
}

DrawingBlock.prototype.setDrawingCommands = function(drawingCommands) {
	PARAMS.initializeValidation();
	drawingCommands = PARAMS.validateParam(PARAMS.ARRAYOFOBJECT,drawingCommands);

	this.clearDrawingCommands();
	for (var i = 0; i < drawingCommands.length; i ++) {
		this.drawingCommands.push(drawingCommands[i]);
	}
}

DrawingBlock.prototype.getDrawingCommands = function() {
	var drawingCommands = new Array();

	for (var i = 0; i < this.drawingCommands.length; i++) {
		if (drawingCommands[i] == undefined) {
			drawingCommands[i] = new Object();
		}
		drawingCommands[i].command = this.drawingCommands[i].command;

		if (this.drawingCommands[i].parameters != undefined) {
			if (drawingCommands[i].parameters == undefined) {
				drawingCommands[i].parameters = new Array();
			}
			for (var j = 0; j < this.drawingCommands[i].parameters.length; j++) {
				drawingCommands[i].parameters[j] = this.drawingCommands[i].parameters[j];
			}
		}
	}

	return drawingCommands;
}

DrawingBlock.prototype.clearDrawingCommands = function() {
	this.drawingCommands.splice(0,this.drawingCommands.length);
}

DrawingBlock.prototype.clearUndrawingCommands = function() {
	this.undrawingCommands.splice(0,this.undrawingCommands.length);
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to perform the undraw operations specified by the user
DrawingBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx+this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);
			
			dest.clearRect(-this._getWidth()/2-1,-this._getHeight()/2-1,this._getWidth()+2,this._getHeight()+2);
			this.parseCanvasCommands(dest,this.undrawingCommands);

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in TextBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: canvas context where updates may occur
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles text and font updates
DrawingBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to perform the draw operations specified by the user
DrawingBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);
	
	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx+this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);
			dest.translate(-this._getWidth()/2,-this._getHeight()/2);

			// switch(this.maskMode) {
			// 	case "window":
			// 		dest.globalCompositeOperation = "destination-in";
			// 	break;

			// 	case "wall":
			// 		dest.globalCompositeOperation = "destination-out";
			// 	break;
			// }
			
			this.parseCanvasCommands(dest,this.drawingCommands);

			dest.translate(this._getWidth()/2,this._getHeight()/2);

			if (this.showDebugDisplay) {
				dest.save();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this._getHeight()/2);
				dest.stroke();
				dest.closePath();
				dest.fillStyle = "Red";
				dest.fillRect(-4,-4,8,8);
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				dest.rect(-this._getWidth()/2,-this._getHeight()/2,this._getWidth(),this._getHeight());
				dest.stroke();
				dest.restore();
			}

			this.children.sort(function(a,b) { return b.z - a.z });
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(dest);
			}
			
			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in TextBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

DrawingBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.drawingCommands.splice(0,this.drawingCommands.length);
		this.drawingCommands = undefined;

		this.undrawingCommands.splice(0,this.undrawingCommands.length);
		this.undrawingCommands = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}
// Public Constructor function
// Input parameter(s):  
// Returns: ImageDrawingBlock object 
// Description: utilizes the native canvas drawing functions to draw...whatever you want
// User is responsible for undrawing what they have drawn
// Example: var myDB = new ImageDrawingBlock()
var ImageDrawingBlock = function(width,height) {
	PARAMS.initializeValidation();
	width = PARAMS.validateParam(PARAMS.INTEGER, width);
	height = PARAMS.validateParam(PARAMS.INTEGER, height);

	LOG.write("DrawingBlock constructor called", LOG.VERBOSE);
	ActorBlock.call(this);

	this.width = width;
	this.height = height;

	this.drawingCommands = new Array();

	this.canvasImage = new Image();
}

ImageDrawingBlock.prototype = new ActorBlock();
ImageDrawingBlock.prototype.learn(CanvasTraits);
ImageDrawingBlock.prototype.learn(ShatterTraits);

// Private function
// Input parameters: none
// Returns: the modified memory object
// Description: overrides ActorBlock.recordMemory
ImageDrawingBlock.prototype.recordMemory = function() {
	var memory = ActorBlock.prototype.recordMemory.call(this);

	if (memory.drawingCommands == undefined) {
		memory.drawingCommands = new Array();
	}
	else {
		memory.drawingCommands.splice(0,memory.drawingCommands.length);
	}
	for (var i = 0; i < this.drawingCommands.length; i++) {
		if (memory.drawingCommands[i] == undefined) {
			memory.drawingCommands[i] = new Object();
		}
		memory.drawingCommands[i].command = this.drawingCommands[i].command;

		if (this.drawingCommands[i].parameters != undefined) {
			if (memory.drawingCommands[i].parameters == undefined) {
				memory.drawingCommands[i].parameters = new Array();
			}
			else {
				memory.drawingCommands[i].parameters.splice(0,memory.drawingCommands[i].parameters.length);
			}
			for (var j = 0; j < this.drawingCommands[i].parameters.length; j++) {
				memory.drawingCommands[i].parameters[j] = this.drawingCommands[i].parameters[j];
			}
		}
		
	}

	return memory;
}

// Private function
// Input parameters: a memory object
// Returns: nothing
// Description: overrides ActorBlock.changeMemoryIntoReality
ImageDrawingBlock.prototype.changeMemoryIntoReality = function(memory) {
	PARAMS.initializeValidation();
	memory = PARAMS.validateParam(PARAMS.MEMORY, memory);

	ActorBlock.prototype.changeMemoryIntoReality.call(this,memory);
	this.drawingCommands = memory.drawingCommands;
}

// Private function
// Input parameters: boolean, whether or not changes in the parent class' properties are checked
// Returns: boolean, whether or not the current object state has changed from the last memory
// Description: overrides ActorBlock.hasChangedFromLatestMemory
ImageDrawingBlock.prototype.hasChangedFromLatestMemory = function(excludeParentProperties) {
	PARAMS.initializeValidation();
	excludeParentProperties = PARAMS.validateParam(PARAMS.BOOLEAN, excludeParentProperties);

	var memory = this.getLatestMemory();
	var hasDifferentDrawingCommands = false;

	if (memory != null) {
		if (memory.drawingCommands != this.drawingCommands) {
			hasDifferentDrawingCommands = true;
		}
		for (var dc = 0; dc < memory.drawingCommands.length; dc++) {
			if (this.drawingCommands[dc] == undefined) {
				hasDifferentDrawingCommands = true;
				break;
			}
			else if (this.drawingCommands[dc].command != memory.drawingCommands[dc].command) {
				hasDifferentDrawingCommands = true;
				break;
			}
			else if (this.drawingCommands[dc].parameters != null && memory.drawingCommands[dc].parameters != null && 
					 	this.drawingCommands[dc].parameters.length != memory.drawingCommands[dc].parameters.length) {
				hasDifferentDrawingCommands = true;
				break;
			}
			else if (this.drawingCommands[dc].parameters != null && memory.drawingCommands[dc].parameters != null) {
				for (var i = 0; i < this.drawingCommands[dc].parameters.length; i++) {
					if (this.drawingCommands[dc].parameters[i] != memory.drawingCommands[dc].parameters[i]) {
						hasDifferentDrawingCommands = true;
						break;
					}
				}
			}
		}
	}
	else {
		hasDifferentDrawingCommands = true;
	}

	if (memory == null) {
		return true;
	}
	else if (excludeParentProperties) {
		return hasDifferentDrawingCommands;
	}
	else {
		return ActorBlock.prototype.hasChangedFromLatestMemory.call(this) || hasDifferentDrawingCommands;
	}
}

// // Public function
// // Input parameters: the new size for the shattered blocks (integer)
// // Returns: nothing
// // Description: shatters the current block's frames into an an array of new child blocks, 
// // each with a small part of the original image/animation
// ImageDrawingBlock.prototype.shatter = function(newBlockSize) {
// 	PARAMS.initializeValidation();
// 	newBlockSize = PARAMS.validateParam(PARAMS.INTEGER, newBlockSize);
	
// 	if (!this.shattered) {
// 		var blockClusterPositions = new Array();

// 		var blockIndex = 0;
// 		for (var i = 0; i < this.width; i += newBlockSize) {
// 			for (var j = 0; j < this.height; j += newBlockSize) {
// 				if (blockClusterPositions[blockIndex] == undefined) {
// 					blockClusterPositions[blockIndex] = {"x":Math.floor(i - this.width/2 + newBlockSize/2), "y":Math.floor(j - this.height/2 + newBlockSize/2)};
// 				}
				
// 				blockIndex++;
// 			}
// 		}

// 		for (var i = 0; i < blockClusterPositions.length; i++) {
// 			var newBlock = new FragmentBlock(this,newBlockSize,newBlockSize,blockClusterPositions[i].x,blockClusterPositions[i].y,0);

// 			newBlock.setMemoryCapacity(this.memoryCapacity);
			
// 			this.adoptChild(newBlock);
// 		}

// 		this.shattered = true;
// 	}
// }

// // Public function
// // Input parameters: none
// // Returns: nothing
// // Description: removes child blocks resulting from shatter
// ImageDrawingBlock.prototype.unshatter = function() {
// 	for (var i = 0; i < this.children.length; i++) {
// 		if (this.children[i] instanceof FragmentBlock) {
// 			this.children[i].destroy();
// 			this.children.splice(i,1);
// 			i--;
// 		}
// 	}
// 	this.shattered = false;
// }

// Public function
// Input parameters: none
// Returns: image or null
// Description: returns the canvas image of the current frame, 
// or returns null if no canvas image can be found
ImageDrawingBlock.prototype.getCurrentFrame = function() {
	if (this.drawingCommands.length > 0 && this.canvasImage) {
		return this.canvasImage;
	}
	else {
		return null;
	}
}

ImageDrawingBlock.prototype.addDrawingCommand = function(command, parameters) {
	PARAMS.initializeValidation();
	command = PARAMS.validateParam(PARAMS.STRING,command);
	parameters = PARAMS.validateParam(PARAMS.ARRAY,parameters);

	if (command.length > 0) {
		var drawingCommand = new Object();
		drawingCommand.command = command;
		drawingCommand.parameters = parameters;

		this.drawingCommands.push(drawingCommand);
	}
}

ImageDrawingBlock.prototype.addDrawingCommands = function() {
	PARAMS.initializeValidation();
	PARAMS.validateArguments([PARAMS.REST, PARAMS.STRING, PARAMS.ARRAYOFOBJECT],
							 arguments);

	for (var i = 0; i < arguments.length; i += 2) {
		var command = arguments[i];
		var parameters = arguments[i+1];

		if (command.length > 0) {
			var drawingCommand = new Object();
			drawingCommand.command = command;
			drawingCommand.parameters = parameters;

			this.drawingCommands.push(drawingCommand);
		}
	}
}

ImageDrawingBlock.prototype.setDrawingCommands = function(drawingCommands) {
	PARAMS.initializeValidation();
	drawingCommands = PARAMS.validateParam(PARAMS.ARRAYOFOBJECT,drawingCommands);

	this.clearDrawingCommands();
	for (var i = 0; i < drawingCommands.length; i ++) {
		this.drawingCommands.push(drawingCommands[i]);
	}
}

ImageDrawingBlock.prototype.getDrawingCommands = function() {
	var drawingCommands = new Array();

	for (var i = 0; i < this.drawingCommands.length; i++) {
		if (drawingCommands[i] == undefined) {
			drawingCommands[i] = new Object();
		}
		drawingCommands[i].command = this.drawingCommands[i].command;

		if (this.drawingCommands[i].parameters != undefined) {
			if (drawingCommands[i].parameters == undefined) {
				drawingCommands[i].parameters = new Array();
			}
			for (var j = 0; j < this.drawingCommands[i].parameters.length; j++) {
				drawingCommands[i].parameters[j] = this.drawingCommands[i].parameters[j];
			}
		}
	}

	return drawingCommands;
}

ImageDrawingBlock.prototype.clearDrawingCommands = function() {
	this.drawingCommands.splice(0,this.drawingCommands.length);
}

// Private function
// Input parameters: none
// Returns: nothing
// Description: creates imageData and image objects from the text and font properties
ImageDrawingBlock.prototype.createDrawingData = function() {
	if (this.drawingCommands.length > 0) {
		CANVASMANAGER.workingCanvasFrame.context.save();

		CANVASMANAGER.workingCanvasFrame.resize(this.width,this.height,-1);
		CANVASMANAGER.workingCanvasFrame.context.clearRect(0,0,this.width,this.height);
		this.parseCanvasCommands(CANVASMANAGER.workingCanvasFrame.context,this.drawingCommands);

		CANVASMANAGER.workingCanvasFrame.context.restore();

		//this.textImageData = CANVASMANAGER.workingCanvasFrame.context.getImageData(0,0,this.width,this.height);
		this.canvasImage.src = CANVASMANAGER.workingCanvasFrame.canvas.toDataURL();
	}
}

// Private function
// Input parameters: canvas context where the undrawing should occur
// Returns: nothing
// Description: overrides Block.undraw,
// used to perform the undraw operations specified by the user
ImageDrawingBlock.prototype.undraw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);

	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);
			
			if (!this._getShattered()) {
				dest.clearRect(-this._getWidth()/2 - 1,-this._getHeight()/2 - 1,this._getWidth() + 2,this._getHeight() + 2);
			}

			if (this.showDebugDisplay) {
				dest.clearRect(-3,-3,6,6);
			}

			for (var i = 0; i < this.children.length; i++) {
				this.children[i].undraw(dest);
			}

			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in ImageDrawingBlock.undraw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

// Private function
// Input parameters: canvas context where updates may occur
// Returns: nothing
// Description: overrides ActorBlock.update,
// handles text and font updates
ImageDrawingBlock.prototype.update = function() {
	ActorBlock.prototype.update.call(this);

	if (this.hasChangedFromLatestMemory(true)) {
		this.createDrawingData();
	}

	this._setShattered(this.shattered);
}

// Private function
// Input parameters: canvas context where the drawing should occur
// Returns: nothing
// Description: overrides Block.draw,
// used to perform the draw operations specified by the user
ImageDrawingBlock.prototype.draw = function(dest) {
	PARAMS.initializeValidation();
	dest = PARAMS.validateParam(PARAMS.CANVAS2DCONTEXT, dest);
	
	var drawx = 0;
	var drawy = 0;
	try {
		if (this._getVisible()) {
			var zratio = this.getZRatio();

			drawx = Math.round(-this._getWidth() / 2 + zratio*this._getX());
			drawy = Math.round(-this._getHeight() / 2 + zratio*this._getY());

			dest.save();
			dest.translate(drawx + this._getWidth()/2,drawy+this._getHeight()/2);
			dest.scale(zratio*this._getScaleX(),zratio*this._getScaleY());
			dest.rotate(this._getRotation()*Math.PI/180);

			// switch(this.maskMode) {
			// 	case "window":
			// 		dest.globalCompositeOperation = "destination-in";
			// 	break;

			// 	case "wall":
			// 		dest.globalCompositeOperation = "destination-out";
			// 	break;
			// }
			
			if (!this._getShattered()) {
				dest.drawImage(this.canvasImage,-this._getWidth()/2,-this._getHeight()/2);
			}

			if (this.showDebugDisplay) {
				dest.save();
				dest.strokeStyle = "Green";
				dest.lineWidth = 1;
				dest.beginPath();
				dest.moveTo(0,0);
				dest.lineTo(0,-this._getHeight()/2);
				dest.stroke();
				dest.closePath();
				dest.fillStyle = "Red";
				dest.fillRect(-4,-4,8,8);
				dest.beginPath();
				dest.strokeStyle = "Blue";
				dest.lineWidth = 1;
				dest.rect(-this._getWidth()/2,-this._getHeight()/2,this._getWidth(),this._getHeight());
				dest.stroke();
				dest.restore();
			}

			this.children.sort(function(a,b) { return b.z - a.z });
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(dest);
			}
			
			dest.restore();
		}
	}
	catch (err) {
		LOG.write("error in ImageDrawingBlock.draw at: " + drawx + " " + drawy, LOG.ERROR);
		LOG.writeBlock(this, LOG.ERROR);
		LOG.writeObject(err, LOG.ERROR);
		debugger;
	}
}

ImageDrawingBlock.prototype.destroy = function() {
	if (this.isMarkedForDestruction) {
		this.drawingCommands.splice(0,this.drawingCommands.length);
		this.drawingCommands = undefined;

		this.shattered = undefined;
		this._setShattered(undefined);

		delete(this.canvasImage);
		this.canvasImage = undefined;
	}

	ActorBlock.prototype.destroy.call(this);
}
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
var CanvasManager = function() {
	LOG.write("CanvasManager constructor function called", LOG.VERBOSE);
	var that = this;
	this.width = 0;
	this.height = 0;

	this.identityNumber = 0;

	this.startUpFunction = null;

	this.fov = 75; // field of view in degrees

	this.frameRate = 30;

	this.canvasFrameStack = new Array();
	//this.workingCanvasFrame = new CanvasFrame(this.width, this.height);

	this.mouseMoveEvent = new MouseEvent("MouseMoveEvent");
	this.mouseClickEvent = new MouseEvent("MouseClickEvent");
	this.mouseDownEvent = new MouseEvent("MouseDownEvent");
	this.mouseUpEvent = new MouseEvent("MouseUpEvent");

	this.keyboardEvent = new KeyboardEvent("KeyboardEvent");

	/*
	this.isFixedWidth = false;
	this.isFixedHeight = false;

	if (isFixedWidth != null) {
		this.isFixedWidth = isFixedWidth;
	}
	if (isFixedHeight != null) {
		this.isFixedHeight = isFixedHeight;
	}

	if (width != null) {
		this.width = width;
	}
	if (height != null) {
		this.height = height;
	}
	*/

	window.onload = function() {
		LOG.write("Window loaded and ready for action. Window width: " + window.innerWidth + " Window height: " + window.innerHeight, LOG.VERBOSE);
		
		//that.gallery = document.createElement("div");
		//that.gallery.setAttribute("style", "position: relative");


		that.width = window.innerWidth;
		that.height = window.innerHeight;
		that.workingCanvasFrame = new CanvasFrame(that.width, that.height, -1);
		var canvasFrame = new CanvasFrame(that.width, that.height, 0);
		that.canvasFrameStack.push(canvasFrame);

		//document.body.appendChild(that.gallery);
		//that.gallery.appendChild(canvasFrame.canvas);
		document.body.appendChild(canvasFrame.canvas);

		if (that.startUpFunction != null) {
			that.startUpFunction();
		}
	}

	window.onresize = function() {
		LOG.write("Window resize detected. width: " + window.innerWidth + " height: " + window.innerHeight, LOG.VERBOSE);
		var shouldResizeCanvases = false;
		if (!that.isFixedWidth) {
			that.width = window.innerWidth;
			shouldResizeCanvases = true;
		}
		if (!that.isFixedHeight) {
			that.height = window.innerHeight;
			shouldResizeCanvases = true;
		}

		if (shouldResizeCanvases) {
			for (var i = 0; i < that.canvasFrameStack.length; i++) {
				document.body.removeChild(that.canvasFrameStack[i].canvas);
				that.canvasFrameStack[i].resize(that.width, that.height, i);
				document.body.appendChild(that.canvasFrameStack[i].canvas);
				that.canvasFrameStack[i].masterBlock.x = that.width/2;
				that.canvasFrameStack[i].masterBlock.y = that.height/2;
			}
		}
	}

	window.onmousemove = function(e) {
		LOG.write("Mouse move detected. moveX:" + e.pageX + " moveY:" + e.pageY, LOG.VERBOSE);
		that.mouseMoveEvent.consumeEvent(Math.round(e.pageX), Math.round(e.pageY));
	}

	window.onclick = function(e) {
		LOG.write("Mouse click detected. clickX:" + e.pageX + " clickY:" + e.pageY, LOG.VERBOSE);
		that.mouseClickEvent.fireEvent(Math.round(e.pageX), Math.round(e.pageY));
	}

	window.onmousedown = function(e) {
		LOG.write("Mouse down detected. downX:" + e.pageX + " downY:" + e.pageY, LOG.VERBOSE);
		that.mouseDownEvent.fireEvent(Math.round(e.pageX), Math.round(e.pageY));
	}

	window.onmouseup = function(e) {
		LOG.write("Mouse up detected. upX:" + e.pageX + " upY:" + e.pageY, LOG.VERBOSE);
		that.mouseUpEvent.fireEvent(Math.round(e.pageX), Math.round(e.pageY));
	}

	window.onkeypress = function(e) {
		LOG.write("Key press detected. keycode:" + e.keyCode + " key:" + KEYCODES.getStringFromKeyCode(e.keyCode), LOG.VERBOSE);
		that.keyboardEvent.fireEvent(e.keyCode, that.keyboardEvent.KEYPRESSEVENT);
	}

	window.onkeydown = function(e) {
		LOG.write("Key down detected. keycode:" + e.keyCode + " key:" + KEYCODES.getStringFromKeyCode(e.keyCode), LOG.VERBOSE);
		that.keyboardEvent.fireEvent(e.keyCode, that.keyboardEvent.KEYDOWNEVENT);

		if (e.keyCode == KEYCODES.BACKSPACE) {
			that.keyboardEvent.fireEvent(e.keyCode, that.keyboardEvent.KEYPRESSEVENT);
			return false;
		}
	}

	window.onkeyup = function(e) {
		LOG.write("Key up detected. keycode:" + e.keyCode + " key:" + KEYCODES.getStringFromKeyCode(e.keyCode), LOG.VERBOSE);
		that.keyboardEvent.fireEvent(e.keyCode, that.keyboardEvent.KEYUPEVENT);

		if (e.keyCode == KEYCODES.BACKSPACE) {
			return false;
		}
	}

	this.assetManager = new AssetManager();
};

CanvasManager.prototype.getIdentityNumber = function() {
	return this.identityNumber++;
}

CanvasManager.prototype.setStartUpFunction = function(func) {
	PARAMS.initializeValidation();
	func = PARAMS.validateParam(PARAMS.FUNCTION, func);

	this.startUpFunction = func;
}

CanvasManager.prototype.addCanvasFrame = function(canvasFrame) {
	PARAMS.initializeValidation();
	canvasFrame = PARAMS.validateParam(PARAMS.CANVASFRAME, canvasFrame);

	var index = this.canvasFrameStack.indexOf(canvasFrame);
	
	if (index > -1) {
		this.canvasFrameStack[index] = undefined;
		//this.canvasFrameStack.splice(index, 1);
		//this.gallery.removeChild(canvasFrame.canvas);
		document.body.removeChild(canvasFrame.canvas);
	}

	this.canvasFrameStack.push(canvasFrame);

	//this.gallery.appendChild(canvasFrame.canvas);
	document.body.appendChild(canvasFrame.canvas);
}

CanvasManager.prototype.insertCanvasFrame = function(canvasFrame, insertionIndex) {
	PARAMS.initializeValidation();
	canvasFrame = PARAMS.validateParam(PARAMS.CANVASFRAME, canvasFrame);

	var index = this.canvasFrameStack.indexOf(canvasFrame);
	
	if (index > -1) {
		this.canvasFrameStack[index] = undefined;
		// this.canvasFrameStack.splice(index, 1);
		// this.gallery.removeChild(canvasFrame.canvas);
		document.body.removeChild(canvasFrame.canvas);
	}

	this.canvasFrameStack[insertionIndex] = canvasFrame;

	//this.gallery.appendChild(canvasFrame.canvas);
	document.body.appendChild(canvasFrame.canvas);
}

CanvasManager.prototype.addNewCanvasFrame = function() {
	var canvasFrame = new CanvasFrame(this.width, this.height, this.canvasFrameStack.length);
	this.canvasFrameStack.push(canvasFrame);
	document.body.appendChild(canvasFrame.canvas);
}

CanvasManager.prototype.adoptBlockChild = function(block, canvasFrameIndex) {
	PARAMS.initializeValidation();
	block = PARAMS.validateParam(PARAMS.BLOCK, block);
	canvasFrameIndex = PARAMS.validateParam(PARAMS.INTEGER, canvasFrameIndex);

	// if (canvasFrameIndex == null) {
	// 	canvasFrameIndex = 0;
	// }

	if (!this.canvasFrameStack[canvasFrameIndex]) {
		var canvasFrame = new CanvasFrame(this.width, this.height, canvasFrameIndex);
		this.insertCanvasFrame(canvasFrame,canvasFrameIndex);

	}

	this.canvasFrameStack[canvasFrameIndex].adoptBlockChild(block);
}

CanvasManager.prototype.refreshAll = function() {
	this.mouseMoveEvent.fireEvent();
	for (var i = 0; i < this.canvasFrameStack.length; i++) {
		this.canvasFrameStack[i].refresh();
	}
}

CanvasManager.prototype.start = function(frameRate) {
	PARAMS.initializeValidation();
	frameRate = PARAMS.validateParam(PARAMS.INTEGER, frameRate);

	var that = this;

	if (frameRate != null) {
		this.frameRate = frameRate;
	}

	setInterval(function() {window.requestAnimationFrame(function() { that.refreshAll(); })},1000/this.frameRate);
}

CanvasManager.prototype.showVerboseMessages = function() {
	LOG.setLogThreshold(LOG.VERBOSE);
}

CanvasManager.prototype.showInfoMessages = function() {
	LOG.setLogThreshold(LOG.INFO);
}

CanvasManager.prototype.showWarningMessages = function() {
	LOG.setLogThreshold(LOG.WARN);
}

CanvasManager.prototype.showErrorMessages = function() {
	LOG.setLogThreshold(LOG.ERROR);
}

CanvasManager.prototype.showFatalMessages = function() {
	LOG.setLogThreshold(LOG.FATAL);
}

CanvasManager.prototype.showNoMessages = function() {
	LOG.setLogThreshold(LOG.NONE);
}

/*
CanvasManager.prototype.loadImageAssetsXML = function(filename) {
	this.assetManager.loadImageAssetXML(filename);
}

CanvasManager.prototype.loadAudioAssetsXML = function(filename) {
	this.assetManager.loadAudioAssetXML(filename);
}
*/

CanvasManager.prototype.loadAssets = function(imageXMLfilename, audioXMLfilename, videoXMLfilename) {
	PARAMS.initializeValidation();
	imageXMLfilename = PARAMS.validateParam(PARAMS.STRING, imageXMLfilename, null);
	audioXMLfilename = PARAMS.validateParam(PARAMS.STRING, audioXMLfilename, null);
	videoXMLfilename = PARAMS.validateParam(PARAMS.STRING, videoXMLfilename, null);

	this.assetManager.loadAssets(imageXMLfilename, audioXMLfilename, videoXMLfilename);
}

CanvasManager.prototype.getSingleImageAsset = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	return this.assetManager.imageAssets[alias].img;
}

// pass in image aliases to be gotten
//CanvasManager.prototype.getImageAssets = function() {
//	var imageAssets = new Array();
//	for (var i = 0; i < arguments.length; i++) {
//		imageAssets.push(this.assetManager.imageAssets[arguments[i]].img);
//	}
//	return imageAssets;
//}

CanvasManager.prototype.getImageAssets = function(aliases) {
	PARAMS.initializeValidation();
	aliases = PARAMS.validateParam(PARAMS.ARRAYOFSTRING, aliases);

	var imageAssets = new Array();
	for (var i = 0; i < aliases.length; i++) {
		imageAssets.push(this.assetManager.imageAssets[aliases[i]].img);
	}
	return imageAssets;
}

CanvasManager.prototype.getSingleImageAssetData = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	return this.assetManager.imageAssets[alias].imgdata;
}

// pass in image aliases to be gotten
//CanvasManager.prototype.getImageAssetData = function() {
//	var imageAssets = new Array();
//	for (var i = 0; i < arguments.length; i++) {
//		imageAssets.push(this.assetManager.imageAssets[arguments[i]].imgdata);
//	}
//	return imageAssets;
//}

CanvasManager.prototype.getImageAssetData = function(aliases) {
	PARAMS.initializeValidation();
	aliases = PARAMS.validateParam(PARAMS.ARRAYOFSTRING, aliases);

	var imageAssets = new Array();
	for (var i = 0; i < aliases.length; i++) {
		imageAssets.push(this.assetManager.imageAssets[aliases[i]].imgdata);
	}
	return imageAssets;
}

CanvasManager.prototype.getAudioAsset = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	return this.assetManager.audioAssets[alias].track;
}

CanvasManager.prototype.getVideoAsset = function(alias) {
	PARAMS.initializeValidation();
	alias = PARAMS.validateParam(PARAMS.STRING, alias);

	return this.assetManager.videoAssets[alias].video;
}

var CANVASMANAGER = new CanvasManager();
// function simplePhysicsUpdate(obj,dest) {
// 	obj.xvel += obj.xacc;
// 	obj.yvel += obj.yacc;
// 	obj.x += obj.xvel;
// 	obj.y += obj.yvel;
// 	obj.x = Math.round(obj.x);
// 	obj.y = Math.round(obj.y);

// 	//trace("x: " + obj.x + " y:" + obj.y + " xvel:" + obj.xvel + " yvel:" + obj.yvel);
// }

function pace(obj,dest) {
	var left = obj.behaviorVars["pace"].left;
	var right = obj.behaviorVars["pace"].right;

	if (obj.xvel == 0) {
		obj.xvel = 1;
		obj.yvel = 1;
	}

	if (obj.x > right) {
		obj.xvel = -1;
	}
	if (obj.x < left) {
		obj.xvel = 1;
	}
}

function zpace(obj,dest) {
	if (obj.behaviorVars["zpace"] == null) {
		obj.behaviorVars["zpace"] = new Object();
		var goesAway;
		if (Math.random() > .5) {
			goesAway = true;
		}
		else {
			goesAway = false;
		}
		obj.behaviorVars["zpace"].away = goesAway;
		obj.behaviorVars["zpace"].increment = 0.01;
	}

	if (obj.behaviorVars["zpace"].away) {
		obj.z += obj.behaviorVars["zpace"].increment;
		if (obj.z > 2) {
			obj.behaviorVars["zpace"].away = false;
		}
	}
	else {
		obj.z -= obj.behaviorVars["zpace"].increment;
		if (obj.z < 0) {
			obj.behaviorVars["zpace"].away = true;
		}
	}
}

function setRandomTextColor(obj) {
	var r = Math.floor(Math.random() * 10);
	var g = Math.floor(Math.random() * 10);
	var b = Math.floor(Math.random() * 10);

	obj.color = "#" + r + g + b;
}

function cycleThroughTextAlignments(obj) {
	if (obj.behaviorVars["cycleThroughTextAlignments"] == null) {
		obj.behaviorVars["cycleThroughTextAlignments"] = new Object();
		obj.behaviorVars["cycleThroughTextAlignments"].index = 0;
	}

	obj.behaviorVars["cycleThroughTextAlignments"].index++;
	switch(obj.behaviorVars["cycleThroughTextAlignments"].index) {
		case 0:
			obj.alignment = "left";
			break;

		case 1:
			obj.alignment = "center";
			break;

		case 2: 
			obj.alignment = "right";
			break;

		default:
			obj.alignment = "left";
			obj.behaviorVars["cycleThroughTextAlignments"].index = 0;
	}
}

function cycleThroughTextSizes(obj) {
	if (obj.behaviorVars["cycleThroughTextSizes"] == null) {
		obj.behaviorVars["cycleThroughTextSizes"] = new Object();
		obj.behaviorVars["cycleThroughTextSizes"].index = 0;
	}

	obj.behaviorVars["cycleThroughTextSizes"].index++;
	switch(obj.behaviorVars["cycleThroughTextSizes"].index) {
		case 0:
			obj.size = 8;
			break;

		case 1:
			obj.size = 10;
			break;

		case 2: 
			obj.size = 12;
			break;

		case 3:
			obj.size = 18;
			break;

		case 4:
			obj.size = 24;
			break;

		case 4:
			obj.size = 36;
			break;

		case 5:
			obj.size = 48;
			break;

		default:
			obj.size = 8;
			obj.behaviorVars["cycleThroughTextSizes"].index = 0;
	}
}

function cycleThroughTextFonts(obj) {
	if (obj.behaviorVars["cycleThroughTextFonts"] == null) {
		obj.behaviorVars["cycleThroughTextFonts"] = new Object();
		obj.behaviorVars["cycleThroughTextFonts"].index = 0;
	}

	obj.behaviorVars["cycleThroughTextFonts"].index++;
	switch(obj.behaviorVars["cycleThroughTextFonts"].index) {
		case 0:
			obj.font = "";
			break;

		case 1:
			obj.font = "Verdana";
			break;

		case 2: 
			obj.font = "Hymmnos";
			break;

		case 3: 
			obj.font = "Courier New";
			break;

		default:
			obj.font = "";
			obj.behaviorVars["cycleThroughTextFonts"].index = 0;
	}
}

function applyRandomColorFilter(obj) {
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);

	obj.applyColorFilter(r,g,b,0.5);
}

function spin(obj,dest) {
	obj.rotation++;
}

function growAndShrink(obj,dest) {
	if (obj.behaviorVars["growAndshrink"] == null) {
		obj.behaviorVars["growAndshrink"] = new Object();
		obj.behaviorVars["growAndshrink"].growing = true;
	}

	if (obj.behaviorVars["growAndshrink"].growing) {
		obj.scaleX += 0.02;
		if (obj.scaleX > 2) {
			obj.behaviorVars["growAndshrink"].growing = false;
		}
		obj.scaleY = obj.scaleX;
	}
	else {
		obj.scaleX -= 0.02;
		if (obj.scaleX < 0.05) {
			obj.behaviorVars["growAndshrink"].growing = true;
		}
		obj.scaleY = obj.scaleX;
	}
}

function poke(obj,dest) {
	if (CANVASMANAGER.mouseMoveEvent.x > obj.x - obj.width/2 && CANVASMANAGER.mouseMoveEvent.x < obj.x + obj.width/2 &&
		CANVASMANAGER.mouseMoveEvent.y > obj.y - obj.height/2 && CANVASMANAGER.mouseMoveEvent.y < obj.y + obj.height/2) {
		LOG.write("poked you!", LOG.VERBOSE);
	}
}

function angularVelUpdate(obj, dest) {

	if (obj.behaviorVars["angularVelUpdate"] == null) {
		obj.behaviorVars["angularVelUpdate"] = new Object();
	}

	var degrees = obj.behaviorVars["angularVelUpdate"].angle;
	var speed = obj.behaviorVars["angularVelUpdate"].speed;

	if (degrees == undefined) {
		degrees = Math.random() * 360;
		obj.behaviorVars["angularVelUpdate"].angle = degrees;
	}
	if (speed == undefined) {
		speed = 5;
		obj.behaviorVars["angularVelUpdate"].speed = speed;
	}

	var xsign = 0;
	var ysign = 0;

	while (degrees > 360) {
		degrees -= 360;
	}

	while (degrees < 0) {
		degrees += 360;
	}

	if (degrees >= 0 && degrees < 180) {
		ysign = 1;
	}
	else {
		ysign = -1;
	}

	if (degrees >= 90 && degrees < 270) {
		xsign = -1;
	}
	else {
		xsign = 1;
	}

	if (degrees > 270) {
		degrees -= 180;
		degrees = 180 - degrees;
	}
	else if (degrees > 180) {
		degrees -= 180;
	}
	else if (degrees > 90) {
		degrees = 180 - degrees;
	}

	var radians = degrees*Math.PI/180;

	obj.xvel = xsign * speed * Math.cos(radians);
	obj.yvel = ysign * speed * Math.sin(radians);

	obj.x += obj.xvel;
	obj.y += obj.yvel;
	obj.x = Math.round(obj.x);
	obj.y = Math.round(obj.y);

	obj.rotation = obj.behaviorVars["angularVelUpdate"].angle;
}

function wanderWithinBoundaries(obj, dest) {
	var leftBoundaryCrossed = false;
	var rightBoundaryCrossed = false;
	var topBoundaryCrossed = false;
	var bottomBoundaryCrossed = false;

	if (obj.constraintVars["checkForCrossedBoundaries"] != undefined) {
		leftBoundaryCrossed = obj.constraintVars["checkForCrossedBoundaries"].leftBoundaryCrossed;
		rightBoundaryCrossed = obj.constraintVars["checkForCrossedBoundaries"].rightBoundaryCrossed;
		topBoundaryCrossed = obj.constraintVars["checkForCrossedBoundaries"].topBoundaryCrossed;
		bottomBoundaryCrossed = obj.constraintVars["checkForCrossedBoundaries"].bottomBoundaryCrossed;
	}

	var chanceToTurn = obj.behaviorVars["wanderWithinBoundaries"].chanceToTurn;
	var chanceToAccelerate = obj.behaviorVars["wanderWithinBoundaries"].chanceToAccelerate;
	var maxTurnAngle = obj.behaviorVars["wanderWithinBoundaries"].maxTurnAngle;
	var maxTurnFrames = obj.behaviorVars["wanderWithinBoundaries"].maxTurnFrames;
	var maxAcceleration = obj.behaviorVars["wanderWithinBoundaries"].maxAcceleration;
	var maxAccelerationFrames = obj.behaviorVars["wanderWithinBoundaries"].maxAccelerationFrames;
	var returnAngle = obj.behaviorVars["wanderWithinBoundaries"].returnAngle;

	var framesToTurn = obj.behaviorVars["wanderWithinBoundaries"].framesToTurn;
	var turnAngle = obj.behaviorVars["wanderWithinBoundaries"].turnAngle;
	var framesToAccelerate = obj.behaviorVars["wanderWithinBoundaries"].framesToAccelerate;
	var acceleration = obj.behaviorVars["wanderWithinBoundaries"].acceleration;


	if (leftBoundaryCrossed || rightBoundaryCrossed || topBoundaryCrossed || bottomBoundaryCrossed) {

		if (framesToTurn != 0) {
			framesToTurn = 0;
			turnAngle = 0;
		}
		framesToAccelerate = 0;

		var currentAngle = obj.behaviorVars["angularVelUpdate"].angle;
		while (currentAngle < 0) {
			currentAngle += 360;
		}
		while (currentAngle > 360) {
			currentAngle -= 360;
		}
		if (leftBoundaryCrossed) {
			if (!((currentAngle > 0 && currentAngle < 10) || (currentAngle > 350 && currentAngle < 360))) {
				if (turnAngle == 0) {
					if (currentAngle > 180) {
						turnAngle = returnAngle;
					}
					else {
						turnAngle = -returnAngle;
					}
				}
				obj.behaviorVars["angularVelUpdate"].angle += turnAngle;
			}
		}
		else if (rightBoundaryCrossed) {
			if (!(currentAngle > 170 && currentAngle < 190)) {
				if (turnAngle == 0) {
					if (currentAngle < 180) {
						turnAngle = returnAngle;
					}
					else {
						turnAngle = -returnAngle;
					}
				}
				obj.behaviorVars["angularVelUpdate"].angle += turnAngle;
			}
		}
		else if (bottomBoundaryCrossed) {
			if (!(currentAngle > 260 && currentAngle < 280)) {
				if (turnAngle == 0) {
					if (currentAngle > 90 && currentAngle < 270) {
						turnAngle = returnAngle;
					}
					else {
						turnAngle = -returnAngle;
					}
				}
				obj.behaviorVars["angularVelUpdate"].angle += turnAngle;
			}
		}
		else if (topBoundaryCrossed) {
			if (!(currentAngle > 80 && currentAngle < 100)) {
				if (turnAngle == 0) {
					if (currentAngle < 270 && currentAngle > 90) {
						turnAngle = -returnAngle;
					}
					else {
						turnAngle = returnAngle;
					}
				}
				obj.behaviorVars["angularVelUpdate"].angle += turnAngle;
			}
		}
	}
	else {
		if (framesToTurn == undefined || framesToTurn == 0) {
			if (Math.random() < chanceToTurn) {
				framesToTurn = Math.ceil(Math.random() * maxTurnFrames);
				turnAngle = Math.round(Math.random()*maxTurnAngle*2 - maxTurnAngle);
			}
		}
		else {
			framesToTurn--;
			obj.behaviorVars["angularVelUpdate"].angle += turnAngle;
		}

		if (framesToAccelerate == undefined || framesToAccelerate == 0) {
			if (Math.random() < chanceToAccelerate) {
				framesToAccelerate = Math.ceil(Math.random() * maxAccelerationFrames);
				acceleration = Math.round(Math.random()*maxAcceleration*2 - maxAcceleration);
			}
		}
		else {
			framesToAccelerate--;
			obj.behaviorVars["angularVelUpdate"].speed += acceleration;

			if (obj.behaviorVars["angularVelUpdate"].speed < 0) {
				obj.behaviorVars["angularVelUpdate"].speed = 0;
			}
		}
	}

	obj.behaviorVars["wanderWithinBoundaries"].framesToTurn = framesToTurn;
	obj.behaviorVars["wanderWithinBoundaries"].turnAngle = turnAngle;
	obj.behaviorVars["wanderWithinBoundaries"].framesToAccelerate = framesToAccelerate;
	obj.behaviorVars["wanderWithinBoundaries"].acceleration = acceleration;
}

function applyRandomSingleColorFilter(obj, dest) {
	var color = obj.behaviorVars["applyRandomSingleColorFilter"].color;
	var lowerRange = obj.behaviorVars["applyRandomSingleColorFilter"].lowerRange;
	var upperRange = obj.behaviorVars["applyRandomSingleColorFilter"].upperRange;

	var red;
	var green;
	var blue;

	var rand = Math.random() * (upperRange-lowerRange) + lowerRange;

	switch(color) {
		case "red":
			if (rand < .5) {
				red = 255 * rand*2;
				green = 0;
				blue = 0;
			}
			else {
				red = 255;
				green = 255 * (1-rand)*2;
				blue = 255 * (1-rand)*2;
			}
			break;

		case "green":
			if (rand < .5) {
				red = 0;
				green = 255 * rand*2;
				blue = 0;
			}
			else {
				red = 255 * (1-rand)*2;
				green = 255;
				blue = 255 * (1-rand)*2;
			}
			break;

		case "blue":
			if (rand < .5) {
				red = 0;
				green = 0;
				blue = 255 * rand*2;
			}
			else {
				red = 255 * (1-rand)*2;
				green = 255 * (1-rand)*2;
				blue = 255;
			}
			break;

		default:
			red = 255 * rand;
			green = 255 * rand;
			blue = 255 * rand;
			break;
	}
	

	obj.setColorFilter(red, green, blue);

	obj.removeBehavior(applyRandomSingleColorFilter);
}

/*function applyRandomColorFilter(obj, dest) {

	var red = Math.random() * 255;
	var green = Math.random() * 255;
	var blue = Math.random() * 255;

	obj.setColorFilter(red, green, blue);

	obj.removeBehavior(applyRandomColorFilter);
}*/

// event behaviors
function addRedFilter(obj) {
	if (obj.behaviorVars["addRedFilter"] == null) {
		obj.behaviorVars["addRedFilter"] = new Object();
		obj.behaviorVars["addRedFilter"].isRed = false;
	}

	if (obj.behaviorVars["addRedFilter"].isRed) {
		obj.behaviorVars["addRedFilter"].isRed = false;
		obj.resetFilters();
	}
	else {
		obj.behaviorVars["addRedFilter"].isRed = true;
		obj.setColorFilter(255);
	}
	
}

function addMoreRedFilter(obj) {
	obj.addColorFilter(255,0,0,1);
}

function resetFilter(obj) {
	obj.resetFilters();
}

function toggleRandomFilter(obj) {
	if (obj.behaviorVars["toggleRandomFilter"] == null) {
		obj.behaviorVars["toggleRandomFilter"] = new Object();
		obj.behaviorVars["toggleRandomFilter"].addFilter = true;
	}

	if (obj.behaviorVars["toggleRandomFilter"].addFilter) {
		obj.addColorFilter(Math.random()*255,Math.random()*255,Math.random()*255, 0.4);
	}
	else {
		obj.resetFilters();
	}

	obj.behaviorVars["toggleRandomFilter"].addFilter = !obj.behaviorVars["toggleRandomFilter"].addFilter;
}

function addRandomFilter(obj) {
	obj.resetFilters();
	obj.addColorFilter(Math.random()*255,Math.random()*255,Math.random()*255, 1);
}

function addRandomFilterToHelper(obj) {
	obj.children[0].resetFilters();
	obj.children[0].addColorFilter(Math.random()*255,Math.random()*255,Math.random()*255, 0.2);
}

function createButterfly(obj, e) {
	if (obj.behaviorVars["createButterfly"] == null) {
		obj.behaviorVars["createButterfly"] = new Object();
		obj.behaviorVars["createButterfly"].maxButterflies = 50;
		obj.behaviorVars["createButterfly"].butterflyCount = 0;
	}
	if (obj.behaviorVars["createButterfly"].butterflyCount < obj.behaviorVars["createButterfly"].maxButterflies) {
		var b = new MovieBlock("Butterfly1","Butterfly1","Butterfly2","Butterfly2","Butterfly3","Butterfly3","Butterfly2","Butterfly2");

		b.addConstraint(checkForCrossedBoundaries, {leftMostX:-CANVASMANAGER.width/2 + 300, rightMostX:CANVASMANAGER.width/2 - 200, topMostY:0, bottomMostY:CANVASMANAGER.height/2 - 200});
		b.addBehavior(angularVelUpdate);
		b.addBehavior(wanderWithinBoundaries,{chanceToTurn:0.1, chanceToAccelerate:0.05, maxTurnAngle:8, maxTurnFrames:25, maxAcceleration:0.1, maxAccelerationFrames:10, returnAngle:4});
		
		/*var rand = Math.random();
		var clr;
		if (rand < .25) {
			clr = "red";
		}
		else if (rand < .5) {
			clr = "blue";
		}
		else if (rand < .75) {
			clr = "green"
		}
		else {
			clr = "";
		}

		b.addBehavior(applyRandomColorFilter);*/
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var bl = Math.floor(Math.random() * 255);

		//b.applyColorFilter(r,g,bl,255);
		b.addColorFilter(r,g,bl,255);
		b.addBehavior(zpace);

		b.addMouseClickReaction(addRandomFilter);

		b.x = e.x - CANVASMANAGER.width / 2;
		b.y = e.y - CANVASMANAGER.height / 2;
		b.z = 2*Math.tan(CANVASMANAGER.fov*(Math.PI/180)/2);
		

		obj.adoptChild(b);

		obj.behaviorVars["createButterfly"].butterflyCount++;
	}
}

function gravitateToMouse(obj) {
	var g = {"x":CANVASMANAGER.mouseMoveEvent.x, "y":CANVASMANAGER.mouseMoveEvent.y};

	var xdif = (g.x-obj.globalX());
	var ydif = (g.y-obj.globalY());
	var mag = Math.sqrt(xdif*xdif + ydif*ydif);
	if (mag == 0) {
		mag = 0.0001;
	}

	//obj.undraw(dest);
	obj.xacc = xdif/mag / 5;
	obj.yacc = ydif/mag / 5;
	obj.xvel += obj.xacc;
	obj.yvel += obj.yacc;
	obj.x += obj.xvel;
	obj.y += obj.yvel;
}

function fleeAndReturn(obj) {
	PARAMS.initializeValidation();
	obj.behaviorVars["fleeAndReturn"] = PARAMS.validateVariableObject(obj.behaviorVars["fleeAndReturn"], 
																		["fleeDistance","fleeAcc","returnAcc"],
																		[PARAMS.NUMBER,PARAMS.NUMBER,PARAMS.NUMBER],
																		[100,5,2]);

	var g = obj.parent.transformMouseEventToLocalCoordinates(CANVASMANAGER.mouseMoveEvent);

	var xdif = (g.x-obj.x);
	var ydif = (g.y-obj.y);
	var mag = Math.sqrt(xdif*xdif + ydif*ydif);
	if (mag == 0) {
		mag = 0.0001;
	}

	if (mag < obj.behaviorVars["fleeAndReturn"].fleeDistance) {
		obj.xacc = -xdif/mag * obj.behaviorVars["fleeAndReturn"].fleeAcc;
		obj.yacc = -ydif/mag * obj.behaviorVars["fleeAndReturn"].fleeAcc;
		obj.xvel += obj.xacc;
		obj.yvel += obj.yacc;
		obj.x += obj.xvel;
		obj.y += obj.yvel;
	}
	else {
		var hxdif = (obj.homeX-obj.x);
		var hydif = (obj.homeY-obj.y);
		var hmag = Math.sqrt(hxdif*hxdif + hydif*hydif);
		if (hmag == 0) {
			hmag = 0.0001;
		}

		obj.xacc = hxdif/hmag * obj.behaviorVars["fleeAndReturn"].returnAcc;
		obj.yacc = hydif/hmag * obj.behaviorVars["fleeAndReturn"].returnAcc;

		obj.xvel += obj.xacc;
		obj.yvel += obj.yacc;

		if (hmag > 10) {
			var damper = 1 - 1/Math.log(hmag);

			obj.xvel = obj.xvel * damper;
			obj.yvel = obj.yvel * damper;
			obj.x += obj.xvel;
			obj.y += obj.yvel;
		}
		else {
			obj.xvel = 0;
			obj.yvel = 0;
			obj.x = obj.homeX;
			obj.y = obj.homeY;
		}
	}
}

function addFleeBehaviors(obj,e) {
	if (!obj.shattered) {
		obj.shatter(8);
		obj.addBehavior(unshatterWhenChildrenAreHome,{});
		obj.addBehaviorToChildren(fleeAndReturn,{});
	}
}

function fleeFromMouseIfNear(obj) {
	var g = obj.parent.transformMouseEventToLocalCoordinates(CANVASMANAGER.mouseMoveEvent);

	var xdif = (g.x-obj.x);
	var ydif = (g.y-obj.y);
	var mag = Math.sqrt(xdif*xdif + ydif*ydif);
	if (mag == 0) {
		mag = 0.0001;
	}

	if (mag < 100) {
		obj.xacc += -xdif/mag * 0.2;
		obj.yacc += -ydif/mag * 0.2;
	}
}

function unshatterWhenChildrenAreHome(obj) {
	if (obj.behaviorVars["unshatterWhenChildrenAreHome"] == null) {
		obj.behaviorVars["unshatterWhenChildrenAreHome"] = new Object();
		obj.behaviorVars["unshatterWhenChildrenAreHome"].hasStarted = false;

	}

	if (obj.shattered && obj.behaviorVars["unshatterWhenChildrenAreHome"].hasStarted) {
		var childrenHome = true;

		for (var i = 0; i < obj.children.length; i++) {
			if (obj.children[i].x != obj.children[i].homeX || obj.children[i].y != obj.children[i].homeY) {
				childrenHome = false;
				return;
			}
		}

		if (childrenHome) {
			obj.removeBehavior(fleeAndReturn);
			obj.unshatter();
			obj.behaviorVars["unshatterWhenChildrenAreHome"].hasStarted = false;
			// obj.removeBehavior(gravitateToHome);
			obj.removeBehavior(unshatterWhenChildrenAreHome);
		}
	}
	else if (!obj.behaviorVars["unshatterWhenChildrenAreHome"].hasStarted) {
		obj.behaviorVars["unshatterWhenChildrenAreHome"].hasStarted = true;
	}
}

function gravitateToHome(obj, dest) {
	var xdif = (obj.homeX-obj.x);
	var ydif = (obj.homeY-obj.y);
	var mag = Math.sqrt(xdif*xdif + ydif*ydif);
	if (mag == 0) {
		mag = 0.0001;
	}

	obj.xacc += xdif/mag * 0.01;
	obj.yacc += ydif/mag * 0.01;
}


function returnHomeByLog(obj, dest) {
	var newmag = Math.sqrt((obj.homeX-obj.x)*(obj.homeX-obj.x) + (obj.homeY-obj.y)*(obj.homeY-obj.y));

	if (newmag > 0) {
		obj.x = obj.homeX - (newmag-2*Math.log(newmag)) * ((obj.homeX - obj.x) / newmag);
		obj.y = obj.homeY - (newmag-2*Math.log(newmag)) * ((obj.homeY - obj.y) / newmag);
	}
}

function returnHomeByFraction(obj, dest) {
	if (obj.behaviorVars["returnHomeByFraction"] == null) {
		obj.behaviorVars["returnHomeByFraction"] = new Object();
		obj.behaviorVars["returnHomeByFraction"].mag = 0;
		obj.behaviorVars["returnHomeByFraction"].fraction = 0;
		obj.behaviorVars["returnHomeByFraction"].decrement = 0.01;
		obj.behaviorVars["returnHomeByFraction"].unitX = 1;
		obj.behaviorVars["returnHomeByFraction"].unitY = 1;

	}
	if (obj.behaviorVars["returnHomeByFraction"].fraction == 0) {
		obj.behaviorVars["returnHomeByFraction"].fraction = 1;
		obj.behaviorVars["returnHomeByFraction"].mag = Math.sqrt((obj.homeX-obj.x)*(obj.homeX-obj.x) + (obj.homeY-obj.y)*(obj.homeY-obj.y));
		if (obj.behaviorVars["returnHomeByFraction"].mag == 0) {
			obj.behaviorVars["returnHomeByFraction"].mag = 0.001;
		}
		obj.behaviorVars["returnHomeByFraction"].unitX = (obj.homeX - obj.x) / (obj.behaviorVars["returnHomeByFraction"].mag);
		obj.behaviorVars["returnHomeByFraction"].unitY = (obj.homeY - obj.y) / (obj.behaviorVars["returnHomeByFraction"].mag);
	}

	obj.behaviorVars["returnHomeByFraction"].fraction -= obj.behaviorVars["returnHomeByFraction"].decrement;

	obj.x = obj.homeX - (obj.behaviorVars["returnHomeByFraction"].mag * obj.behaviorVars["returnHomeByFraction"].fraction) * obj.behaviorVars["returnHomeByFraction"].unitX;
	obj.y = obj.homeY - (obj.behaviorVars["returnHomeByFraction"].mag * obj.behaviorVars["returnHomeByFraction"].fraction) * obj.behaviorVars["returnHomeByFraction"].unitY;

	if (obj.behaviorVars["returnHomeByFraction"].fraction <= 0) {
		obj.behaviorVars["returnHomeByFraction"].fraction = 0;
		obj.removeBehavior("returnHomeByFraction");
	}
}

function followMouseThenReturnHome(obj, dest) {
	if (obj.behaviorVars["followMouseThenReturnHome"] == null) {
		obj.behaviorVars["followMouseThenReturnHome"] = new Object();
		obj.behaviorVars["followMouseThenReturnHome"].count = 0;
		obj.behaviorVars["followMouseThenReturnHome"].increment = 0;
	}

	if (obj.behaviorVars["followMouseThenReturnHome"].count == 0) {
		obj.behaviorVars["followMouseThenReturnHome"].increment = 1;
		obj.removeBehavior(returnHomeByFraction);
		obj.addBehavior(gravitateToMouse);
	}
	else if (obj.behaviorVars["followMouseThenReturnHome"].count == 200) {
		obj.behaviorVars["followMouseThenReturnHome"].increment = -1;
		obj.addBehavior(returnHomeByFraction);
		obj.removeBehavior(gravitateToMouse);
	}

	obj.behaviorVars["followMouseThenReturnHome"].count += obj.behaviorVars["followMouseThenReturnHome"].increment;
}

function togglePause(obj, dest) {
	obj.isPlaying = !obj.isPlaying;
}

function startMovingLeft(obj, e) {
	if (obj.behaviorVars["startMovingLeft"] == null) {
		obj.behaviorVars["startMovingLeft"] = new Object();
		obj.behaviorVars["startMovingLeft"].speed = 5;
	}

	obj.xvel = -obj.behaviorVars["startMovingLeft"].speed;
}

function stopMoving(obj,e) {
	obj.xvel = 0;
	obj.yvel = 0;
}

function startMovingRight(obj, e) {
	if (obj.behaviorVars["startMovingRight"] == null) {
		obj.behaviorVars["startMovingRight"] = new Object();
		obj.behaviorVars["startMovingRight"].speed = 5;
	}

	obj.xvel = obj.behaviorVars["startMovingRight"].speed;
}

function applyForceLeft(obj, e) {
	LOG.write("Applying Left Force", LOG.INFO);
	if (obj.behaviorVars["applyForceLeft"] == null) {
		obj.behaviorVars["applyForceLeft"] = new Object();
		obj.behaviorVars["applyForceLeft"].force = 2;
	}

	obj.xacc += -obj.behaviorVars["applyForceLeft"].force;
}

function removeForceLeft(obj,e) {
	LOG.write("Removing Left Force", LOG.INFO);
	if (obj.behaviorVars["removeForceLeft"] == null) {
		obj.behaviorVars["removeForceLeft"] = new Object();
		obj.behaviorVars["removeForceLeft"].force = 2;
	}

	obj.xacc -= -obj.behaviorVars["removeForceLeft"].force;
}

function stopForces(obj,e) {
	LOG.write("Stopping Forces", LOG.INFO);

	obj.xacc = 0;
	obj.yacc = 0;
	obj.zacc = 0;
}

function applyForceRight(obj, e) {
	LOG.write("Applying Right Force", LOG.INFO);

	if (obj.behaviorVars["applyForceRight"] == null) {
		obj.behaviorVars["applyForceRight"] = new Object();
		obj.behaviorVars["applyForceRight"].force = 2;
	}

	obj.xacc += obj.behaviorVars["applyForceRight"].force;
}

function removeForceRight(obj,e) {
	LOG.write("Stopping Right Force", LOG.INFO);
	if (obj.behaviorVars["removeForceRight"] == null) {
		obj.behaviorVars["removeForceRight"] = new Object();
		obj.behaviorVars["removeForceRight"].force = 2;
	}

	obj.xacc -= obj.behaviorVars["removeForceRight"].force;
}

function applyForceToward(obj, e) {
	LOG.write("Applying Toward Force", LOG.INFO);

	if (obj.behaviorVars["applyForceToward"] == null) {
		obj.behaviorVars["applyForceToward"] = new Object();
		obj.behaviorVars["applyForceToward"].force = .01;
	}

	obj.zacc += -obj.behaviorVars["applyForceToward"].force;
}

function removeForceToward(obj,e) {
	LOG.write("Stopping Toward Force", LOG.INFO);
	if (obj.behaviorVars["removeForceToward"] == null) {
		obj.behaviorVars["removeForceToward"] = new Object();
		obj.behaviorVars["removeForceToward"].force = .01;
	}

	obj.zacc -= -obj.behaviorVars["removeForceToward"].force;
}

function applyForceAway(obj, e) {
	LOG.write("Applying Away Force", LOG.INFO);

	if (obj.behaviorVars["applyForceAway"] == null) {
		obj.behaviorVars["applyForceAway"] = new Object();
		obj.behaviorVars["applyForceAway"].force = .01;
	}

	obj.zacc += obj.behaviorVars["applyForceAway"].force;
}

function removeForceAway(obj,e) {
	LOG.write("Stopping Away Force", LOG.INFO);
	if (obj.behaviorVars["removeForceAway"] == null) {
		obj.behaviorVars["removeForceAway"] = new Object();
		obj.behaviorVars["removeForceAway"].force = .01;
	}

	obj.zacc -= obj.behaviorVars["removeForceAway"].force;
}

function applyForceCW(obj, e) {
	LOG.write("Applying CW Force", LOG.INFO);

	if (obj.behaviorVars["applyForceCW"] == null) {
		obj.behaviorVars["applyForceCW"] = new Object();
		obj.behaviorVars["applyForceCW"].force = 1;
	}

	obj.rotationAcc += obj.behaviorVars["applyForceCW"].force;
}

function removeForceCW(obj, e) {
	LOG.write("Applying CW Force", LOG.INFO);

	if (obj.behaviorVars["removeForceCW"] == null) {
		obj.behaviorVars["removeForceCW"] = new Object();
		obj.behaviorVars["removeForceCW"].force = 1;
	}

	obj.rotationAcc -= obj.behaviorVars["removeForceCW"].force;
}

function applyForceCCW(obj, e) {
	LOG.write("Applying CCW Force", LOG.INFO);

	if (obj.behaviorVars["applyForceCCW"] == null) {
		obj.behaviorVars["applyForceCCW"] = new Object();
		obj.behaviorVars["applyForceCCW"].force = 1;
	}

	obj.rotationAcc -= obj.behaviorVars["applyForceCCW"].force;
}

function removeForceCCW(obj, e) {
	LOG.write("Applying CCW Force", LOG.INFO);

	if (obj.behaviorVars["removeForceCCW"] == null) {
		obj.behaviorVars["removeForceCCW"] = new Object();
		obj.behaviorVars["removeForceCCW"].force = 1;
	}

	obj.rotationAcc += obj.behaviorVars["removeForceCCW"].force;
}

function playBirdLeft(obj, e) {
	LOG.write("NowPlaying: BirdLeft");
	obj.play("BirdLeft");
}

function playBirdRight(obj, e) {
	LOG.write("NowPlaying: BirdRight");
	obj.play("BirdRight");
}

function playHelperLeft(obj, e) {
	obj.children[0].play("Walk_Left");
	obj.children[1].play("Walk_Left");
}

function playHelperRight(obj, e) {
	obj.children[0].play("Walk_Right");
	obj.children[1].play("Walk_Right");
}

function helper_ManageState(obj,e) {
	PARAMS.initializeValidation();
	obj.behaviorVars["helper_ManageState"] = PARAMS.validateVariableObject(obj.behaviorVars["helper_ManageState"], 
																		["state","previousState"],
																		[PARAMS.STRING,PARAMS.STRING],
																		["Idle1_Left",""]);

	obj.behaviorVars["helper_ManageState"].previousState = obj.behaviorVars["helper_ManageState"].state;
	var previousState = obj.behaviorVars["helper_ManageState"].previousState;

	switch(previousState) {
		case "Idle1_Right":
		case "Idle2_Right":
		case "Idle3_Right":
			if (obj.xvel != 0) {
				if (obj.xvel > 0) {
					obj.behaviorVars["helper_ManageState"].state = "Walk_Right";
				}
				if (obj.xvel < 0) {
					obj.behaviorVars["helper_ManageState"].state = "Walk_Left";
				}
			}
			else if (obj.yvel != 0 || obj.zvel != 0) {
				obj.behaviorVars["helper_ManageState"].state = "Walk_Right";
			}
		break;

		case "Idle1_Left":
		case "Idle2_Left":
		case "Idle3_Left":
			if (obj.xvel != 0) {
				if (obj.xvel > 0) {
					obj.behaviorVars["helper_ManageState"].state = "Walk_Right";
				}
				if (obj.xvel < 0) {
					obj.behaviorVars["helper_ManageState"].state = "Walk_Left";
				}
			}
			else if (obj.yvel != 0 || obj.zvel != 0) {
				obj.behaviorVars["helper_ManageState"].state = "Walk_Left";
			}
		break;

		case "Walk_Right":
			if (obj.xvel == 0 && obj.yvel == 0 && obj.zvel == 0) {
				obj.behaviorVars["helper_ManageState"].state = "Idle1_Right";
			}
		break;

		case "Walk_Left":
			if (obj.xvel == 0 && obj.yvel == 0 && obj.zvel == 0) {
				obj.behaviorVars["helper_ManageState"].state = "Idle1_Left";
			}
		break;
	}
}

function helper_ApplyState(obj,e) {
	PARAMS.initializeValidation();
	obj.behaviorVars["helper_ApplyState"] = PARAMS.validateVariableObject(obj.behaviorVars["helper_ApplyState"], 
																		["stateTransitions"],
																		[PARAMS.OBJECT],
																		[{
																			Idle1_Left: [["Idle1_Left","Idle1_Left", 200],["Idle1ToIdle1_Left","Idle1_Left",30],["Idle1ToIdle2_Left","Idle2_Left",20],["Idle1ToIdle3_Left","Idle3_Left",20]],
																			Idle2_Left: [["Idle2_Left","Idle2_Left", 200],["Idle2ToIdle1_Left","Idle1_Left",20],["Idle2ToIdle3_Left","Idle3_Left",20]],
																			Idle3_Left: [["Idle3_Left","Idle3_Left", 200],["Idle3ToIdle2_Left","Idle2_Left",20],["Idle3ToIdle1_Left","Idle1_Left",20]],
																			Idle1_Right: [["Idle1_Right","Idle1_Right", 200],["Idle1ToIdle1_Right","Idle1_Right",30],["Idle1ToIdle2_Right","Idle2_Right",20],["Idle1ToIdle3_Right","Idle3_Right",30]],
																			Idle2_Right: [["Idle2_Right","Idle2_Right", 200],["Idle2ToIdle1_Right","Idle1_Right",20],["Idle2ToIdle3_Right","Idle3_Right",20]],
																			Idle3_Right: [["Idle3_Right","Idle3_Right", 200],["Idle3ToIdle2_Right","Idle2_Right",20],["Idle3ToIdle1_Right","Idle1_Right",20]],
																			Walk_Left: [["Walk_Left","Walk_Left", 50]],
																			Walk_Right: [["Walk_Right","Walk_Right", 50]]
																		}]);

	var previousState = obj.behaviorVars["helper_ManageState"].previousState;
	var currentState = obj.behaviorVars["helper_ManageState"].state;

	if (previousState == currentState) {
		if (obj.children[0].isLastMovieFrame()) {
			var totalPercentage = 0;
			var indexChance = [];
			for (var i = 0; i < obj.behaviorVars["helper_ApplyState"].stateTransitions[currentState].length; i++) {
				totalPercentage += obj.behaviorVars["helper_ApplyState"].stateTransitions[currentState][i][2];
				indexChance[i] = totalPercentage;
			}

			var chance = Math.floor(Math.random() * totalPercentage);
			var nextAnimationIndex = 0;

			for (var j = 0; j < indexChance.length; j++) {
				if (chance < indexChance[j]) {
					nextAnimationIndex = j;
					break;
				}
			}

			var nextAnimation = obj.behaviorVars["helper_ApplyState"].stateTransitions[currentState][nextAnimationIndex][0];
			var destState = obj.behaviorVars["helper_ApplyState"].stateTransitions[currentState][nextAnimationIndex][1];

			obj.behaviorVars["helper_ManageState"].state = destState;
			obj.children[0].play(nextAnimation);
			obj.children[1].play(nextAnimation);
			//obj.behaviorVars["helper_ApplyState"].nextState = destState;
		}
	}
	else {
		obj.children[0].play(currentState);
		obj.children[1].play(currentState);
	}
}

function simplePhysicsUpdate(obj,dest) {
	obj.xvel += obj.xacc;
	obj.yvel += obj.yacc;
	obj.zvel += obj.zacc;
	obj.x += obj.xvel;
	obj.y += obj.yvel;
	obj.z += obj.zvel;
	obj.rotationVel += obj.rotationAcc;
	obj.rotation += obj.rotationVel;
	//obj.x = Math.round(obj.x);
	//obj.y = Math.round(obj.y);
	//obj.z = Math.round(obj.z);

	//LOG.write("x: " + obj.x + " y:" + obj.y + " z:" + obj.z + " xvel:" + obj.xvel + " yvel:" + obj.yvel + " zvel:" + obj.zvel, LOG.INFO);
}

function forcefulPhysicsUpdate(obj,dest) {
	obj.xvel += obj.xacc;
	obj.yvel += obj.yacc;
	obj.zvel += obj.zacc;
	obj.x += obj.xvel;
	obj.y += obj.yvel;
	obj.z += obj.zvel;
	obj.rotationVel += obj.rotationAcc;
	obj.rotation += obj.rotationVel;
	

	obj.xacc = 0;
	obj.yacc = 0;
}

function playStageClear(obj, e) {
	var track = CANVASMANAGER.getAudioAsset("StageClear");
	track.play(true);
}

function playBossStageClear(obj, e) {
	var track = CANVASMANAGER.getAudioAsset("BossStageClear");
	track.play(true);
}

function pauseStageClear(obj, e) {
	var track = CANVASMANAGER.getAudioAsset("StageClear");
	track.pause();
}

function decreaseStageClearVolume(obj, e) {
	var track = CANVASMANAGER.getAudioAsset("StageClear");
	var volume = track.getVolume();

	LOG.write("Old Volume: " + volume);

	track.setVolume(volume-10);

	LOG.write("New Volume: " + track.getVolume());
}

function increaseStageClearVolume(obj, e) {
	var track = CANVASMANAGER.getAudioAsset("StageClear");
	var volume = track.getVolume();

	LOG.write("Old Volume: " + volume);

	track.setVolume(volume+10);

	LOG.write("New Volume: " + track.getVolume());
}

function toggleTypeable(obj) {
	if (obj.behaviorVars["toggleTypeable"] == null) {
		obj.behaviorVars["toggleTypeable"] = new Object();
		obj.behaviorVars["toggleTypeable"].typeable = false;
	}

	if (obj.behaviorVars["toggleTypeable"].typeable) {
		obj.behaviorVars["toggleTypeable"].typeable = false;
	}
	else {
		obj.behaviorVars["toggleTypeable"].typeable = true;
	}
}

function typeIntoObject(obj,e) {
	if (obj.behaviorVars["toggleTypeable"] != null && obj.behaviorVars["toggleTypeable"].typeable) {
		if (KEYCODES.isKeyCodeAlphabetic(e.lastKeyCodePress)) {
			obj.setText(obj.text + e.lastKeyNamePress);
		}
		else if (e.lastKeyCodePress == KEYCODES.SPACE) {
			obj.setText(obj.text + " ");
		}
		else if (e.lastKeyCodePress == KEYCODES.BACKSPACE && obj.text.length > 0) {
			obj.setText(obj.text.slice(0,obj.text.length-1));
		}
	}
}

function toggleObjectSleepState(obj,e) {
	if (obj.awake) {
		obj.sleep();
	}
	else {
		obj.wake();
		obj.xacc = 0;
		obj.yacc = 0;
		obj.zacc = 0;
	}
	obj.isPlaying = !obj.isPlaying;
}

function toggleVideoObjectSleepState(obj,e) {
	if (obj.awake) {
		obj.sleep();
	}
	else {
		obj.wake();
		obj.xacc = 0;
		obj.yacc = 0;
		obj.zacc = 0;
	}
	obj.isPlaying = !obj.isPlaying;
}

function moveObjectInTime(obj,e) {
	/*
	if (obj.behaviorVars["moveObjectInTime"] == null) {
		obj.behaviorVars["moveObjectInTime"] = new Object();
		obj.behaviorVars["moveObjectInTime"].indexFromPresent = 0;
	}
	*/

	if (e.lastKeyCodePress == KEYCODES.TWO) {
		//obj.behaviorVars["moveObjectInTime"].indexFromPresent++;
		obj.recallEarlierMemory();
		obj.recallEarlierMemory();
	}
	if (e.lastKeyCodePress == KEYCODES.THREE) {
		//obj.behaviorVars["moveObjectInTime"].indexFromPresent--;
		obj.recallLaterMemory();
		obj.recallLaterMemory();
	}
		
	//LOG.write("index from present: " + obj.behaviorVars["moveObjectInTime"].indexFromPresent);	
	//obj.setCurrentMemoryIndex(obj.behaviorVars["moveObjectInTime"].indexFromPresent);
	
}

function moveVideoObjectInTime(obj,e) {
	if (e.lastKeyCodePress == KEYCODES.TWO) {
		obj.recallEarlierMemory();
		//obj.video.video.playbackRate = -Math.abs(obj.video.video.playbackRate);
		//obj.video.setCurrentTime(obj.currentTime);
	}
	if (e.lastKeyCodePress == KEYCODES.THREE) {
		obj.recallLaterMemory();
		//obj.video.video.playbackRate = Math.abs(obj.video.video.playbackRate);
		//obj.video.setCurrentTime(obj.currentTime);
	}
	
}

function setVolumeBasedOnZ(obj) {
	var volume = 100 - obj.globalZ()*5;
	obj.setVolume(volume);
}

function toggleObjectDebugDisplay(obj) {
	obj.toggleDebugDisplay(false);
}

function playBlock(obj) {
	obj.play();
}

function pauseBlock(obj) {
	obj.pause();
}

function unpauseBlock(obj) {
	obj.unpause();
}

function playPauseBlock(obj) {
	obj.playPause();
}

function stopBlock(obj) {
	obj.stop();
}

function toggleFontSize(obj) {
	if (obj.behaviorVars["toggleFontSize"] == null) {
		obj.behaviorVars["toggleFontSize"] = new Object();
		obj.behaviorVars["toggleFontSize"].isBig = false;
		obj.behaviorVars["toggleFontSize"].initSize = obj.size;
	}	

	if (obj.behaviorVars["toggleFontSize"].isBig) {
		obj.size = obj.behaviorVars["toggleFontSize"].initSize;
	}
	else {
		obj.size = 60;
	}

	obj.behaviorVars["toggleFontSize"].isBig = !obj.behaviorVars["toggleFontSize"].isBig;
}

function toggleCircleDrawingCommand(obj,e) {
	PARAMS.initializeValidation();
	obj.behaviorVars["toggleCircleDrawingCommand"] = PARAMS.validateVariableObject(obj.behaviorVars["toggleCircleDrawingCommand"], 
																		["originalCommands","isCircleAdded"],
																		[PARAMS.ARRAYOFOBJECT,PARAMS.BOOLEAN],
																		[obj.getDrawingCommands(),false]);
	if (obj.behaviorVars["toggleCircleDrawingCommand"].isCircleAdded) {
		obj.clearDrawingCommands();
		obj.setDrawingCommands(obj.behaviorVars["toggleCircleDrawingCommand"].originalCommands);
	}
	else {
		obj.addDrawingCommand("setFillStyle",["rgba(50,100,255,1)"]);
		obj.addDrawingCommand("beginPath");
		obj.addDrawingCommand("arc",[75,75,50,0,2*Math.PI]);
		obj.addDrawingCommand("closePath");
		obj.addDrawingCommand("fill");
	}

	obj.behaviorVars["toggleCircleDrawingCommand"].isCircleAdded = !obj.behaviorVars["toggleCircleDrawingCommand"].isCircleAdded;
}

function rotate90Degrees(obj,e) {
	obj.rotation += 90;
}
function bounceOffBoundaries(obj, dest) {
	var leftedge = obj.constraintVars["bounceOffBoundaries"].leftedge - obj.width/2;
	var rightedge = obj.constraintVars["bounceOffBoundaries"].rightedge + obj.width/2;
	var topedge = obj.constraintVars["bounceOffBoundaries"].topedge + obj.height/2;
	var bottomedge = obj.constraintVars["bounceOffBoundaries"].bottomedge - obj.height/2;

	if (obj.x < leftedge) {
		obj.x = leftedge
		obj.xvel = obj.xvel*-1;
	}
	if (obj.x > rightedge) {
		obj.x = rightedge;
		obj.xvel = obj.xvel*-1;
	}
	if (obj.y < topedge) {
		obj.y = topedge
		obj.yvel = obj.yvel*-1;
	}
	if (obj.y > bottomedge) {
		obj.y = bottomedge
		obj.yvel = obj.yvel*-1;
	}
}

function checkForCrossedBoundaries(obj, dest) {

	var leftBoundary = obj.constraintVars["checkForCrossedBoundaries"].leftMostX - obj.width/2;
	var rightBoundary = obj.constraintVars["checkForCrossedBoundaries"].rightMostX + obj.width/2;
	var topBoundary = obj.constraintVars["checkForCrossedBoundaries"].topMostY + obj.height/2;
	var bottomBoundary = obj.constraintVars["checkForCrossedBoundaries"].bottomMostY - obj.width/2;

	var leftBoundaryCrossed = false;
	var rightBoundaryCrossed = false;
	var topBoundaryCrossed = false;
	var bottomBoundaryCrossed = false;

	if (obj.x < leftBoundary) {
		leftBoundaryCrossed = true;
	}
	if (obj.x > rightBoundary) {
		rightBoundaryCrossed = true;
	}
	if (obj.y < topBoundary) {
		topBoundaryCrossed = true;
	}
	if (obj.y > bottomBoundary) {
		bottomBoundaryCrossed = true;
	}

	obj.constraintVars["checkForCrossedBoundaries"].leftBoundaryCrossed = leftBoundaryCrossed;
	obj.constraintVars["checkForCrossedBoundaries"].rightBoundaryCrossed = rightBoundaryCrossed;
	obj.constraintVars["checkForCrossedBoundaries"].topBoundaryCrossed = topBoundaryCrossed;
	obj.constraintVars["checkForCrossedBoundaries"].bottomBoundaryCrossed = bottomBoundaryCrossed;
}

function dampVelocity(obj,dest) {
	if (obj.behaviorVars["dampVelocity"] == null) {
		obj.behaviorVars["dampVelocity"] = new Object();
		obj.behaviorVars["dampVelocity"].damper = 0.2;
	}

	if (obj.xacc == 0 && obj.xvel != 0) {
		obj.xvel *= (1.00 - obj.behaviorVars["dampVelocity"].damper);
		if (Math.abs(obj.xvel) < 1) {
			obj.xvel = 0;
		}
	}

	if (obj.yacc == 0 && obj.yvel != 0) {
		obj.yvel *= (1.00 - obj.behaviorVars["dampVelocity"].damper);
		if (Math.abs(obj.yvel) < 1) {
			obj.yvel = 0;
		}
	}

	if (obj.zacc == 0 && obj.zvel != 0) {
		obj.zvel *= (1.00 - obj.behaviorVars["dampVelocity"].damper);
		if (Math.abs(obj.zvel) < 0.001) {
			obj.zvel = 0;
		}
	}
}

function limitVelocityToHome(obj,dest) {
	if (Math.abs(obj.xvel) > 0 || Math.abs(obj.yvel) > 0) {
		var xdif = (obj.homeX-obj.x);
		var ydif = (obj.homeY-obj.y);
		var mag = Math.sqrt(xdif*xdif + ydif*ydif);
		if (mag == 0) {
			mag = 0.0001;
		}

		// if (Math.abs(obj.xvel) > Math.log(mag)) {
		// 	obj.x -= (Math.abs(obj.xvel)/obj.xvel) * (Math.abs(obj.xvel) - Math.log(mag))
		// }

		// if (Math.abs(obj.yvel) > Math.log(mag)) {
		// 	obj.y -= (Math.abs(obj.yvel)/obj.yvel) * (Math.abs(obj.yvel) - Math.log(mag))
		// }
		if (mag > 1) {
			var damper = 1 - 1/mag;

			obj.xvel = obj.xvel * damper;
			obj.yvel = obj.yvel * damper;
		}
		else {
			obj.xvel = 0;
			obj.yvel = 0;
			obj.x = 0;
			obj.y = 0;
		}
	}

}

function stopIfNearHome(obj) {
	var xdif = (obj.homeX-obj.x);
	var ydif = (obj.homeY-obj.y);
	var mag = Math.sqrt(xdif*xdif + ydif*ydif);
	if (mag == 0) {
		mag = 0.0001;
	}

	if (mag < 1) {
		obj.xacc = 0;
		obj.yacc = 0;
		obj.xvel = 0;
		obj.yvel = 0;
		obj.x = obj.homeX;
		obj.y = obj.homeY;
	}
}

function forcefulPhysicsConstraint(obj) {
	obj.xacc = 0;
	obj.yacc = 0;
	obj.zacc = 0;
}