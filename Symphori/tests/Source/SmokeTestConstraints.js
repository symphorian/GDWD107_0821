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