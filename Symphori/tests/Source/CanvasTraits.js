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