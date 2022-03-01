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