package {
	import flash.display.Sprite;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.events.KeyboardEvent;
	import flash.events.Event;
	import flash.ui.Keyboard;
	
	public class KeyStates extends Sprite {
		
		private var stageRef;
		
		public var upNow:Boolean;
		public var downNow:Boolean;
		public var leftNow:Boolean;
		public var rightNow:Boolean;
		public var d1Now:Boolean;
		public var d2Now:Boolean;
		public var d3Now:Boolean;
		public var d4Now:Boolean;
		public var d5Now:Boolean;
		
		public var upPrev:Boolean;
		public var downPrev:Boolean;
		public var leftPrev:Boolean;
		public var rightPrev:Boolean;
		public var d1Prev:Boolean;
		public var d2Prev:Boolean;
		public var d3Prev:Boolean;
		public var d4Prev:Boolean;
		public var d5Prev:Boolean;
		
		public var upPressed:Boolean;
		public var downPressed:Boolean;
		public var leftPressed:Boolean;
		public var rightPressed:Boolean;
		public var d1Pressed:Boolean;
		public var d2Pressed:Boolean;
		public var d3Pressed:Boolean;
		public var d4Pressed:Boolean;
		public var d5Pressed:Boolean;
		
		public var upReleased:Boolean;
		public var downReleased:Boolean;
		public var leftReleased:Boolean;
		public var rightReleased:Boolean;
		public var d1Released:Boolean;
		public var d2Released:Boolean;
		public var d3Released:Boolean;
		public var d4Released:Boolean;
		public var d5Released:Boolean;
		
		private var debug:Boolean;
		private var debugText:TextField;
		
		public function KeyStates(sr) {
			stageRef = sr;
			stageRef.addEventListener(KeyboardEvent.KEY_DOWN, keyDownCallback);
			stageRef.addEventListener(KeyboardEvent.KEY_UP, keyUpCallback);
			addEventListener(Event.ENTER_FRAME, updateLoop);
			
			upNow = false;
			downNow = false;
			leftNow = false;
			rightNow = false;
			d1Now = false;
			d2Now = false;
			d3Now = false;
			d4Now = false;
			d5Now = false;
			
			upPrev = false;
			downPrev = false;
			leftPrev = false;
			rightPrev = false;
			d1Prev = false;
			d2Prev = false;
			d3Prev = false;
			d4Prev = false;
			d5Prev = false;
			
			upPressed = false;
			downPressed = false;
			leftPressed = false;
			rightPressed = false;
			d1Pressed = false;
			d2Pressed = false;
			d3Pressed = false;
			d4Pressed = false;
			d5Pressed = false;
			
			upReleased = false;
			downReleased = false;
			leftReleased = false;
			rightReleased = false;
			d1Released = false;
			d2Released = false;
			d3Released = false;
			d4Released = false;
			d5Released = false;
			
			debug = false;
			debugText = new TextField();
			debugText.width = 400;
			debugText.height = 400;
			debugText.visible = false;
			addChild(debugText);
		}
		
		private function updatePrev() {
			upPrev = upNow;
			downPrev = downNow;
			leftPrev = leftNow;
			rightPrev = rightNow;
			d1Prev = d1Now;
			d2Prev = d2Now;
			d3Prev = d3Now;
			d4Prev = d4Now;
			d5Prev = d5Now;
		}
		
		private function updateLoop(ev:Event) {
			if (!upPrev && upPrev != upNow) {
				upPressed = true;
			}
			else {
				upPressed = false;
			}
			
			if (!downPrev && downPrev != downNow) {
				downPressed = true;
			}
			else {
				downPressed = false;
			}
			
			if (!leftPrev && leftPrev != leftNow) {
				leftPressed = true;
			}
			else {
				leftPressed = false;
			}
			
			if (!rightPrev && rightPrev != rightNow) {
				rightPressed = true;
			}
			else {
				rightPressed = false;
			}
			
			if (!d1Prev && d1Prev != d1Now) {
				d1Pressed = true;
			}
			else {
				d1Pressed = false;
			}
			
			if (!d2Prev && d2Prev != d2Now) {
				d2Pressed = true;
			}
			else {
				d2Pressed = false;
			}
			
			if (!d3Prev && d3Prev != d3Now) {
				d3Pressed = true;
			}
			else {
				d3Pressed = false;
			}
			
			if (!d4Prev && d4Prev != d4Now) {
				d4Pressed = true;
			}
			else {
				d4Pressed = false;
			}
			
			if (!d5Prev && d5Prev != d5Now) {
				d5Pressed = true;
			}
			else {
				d5Pressed = false;
			}
			
			
			if (upPrev && upPrev != upNow) {
				upReleased = true;
			}
			else {
				upReleased = false;
			}
			
			if (downPrev && downPrev != downNow) {
				downReleased = true;
			}
			else {
				downReleased = false;
			}
			
			if (leftPrev && leftPrev != leftNow) {
				leftReleased = true;
			}
			else {
				leftReleased = false;
			}
			
			if (rightPrev && rightPrev != rightNow) {
				rightReleased = true;
			}
			else {
				rightReleased = false;
			}
			
			if (d1Prev && d1Prev != d1Now) {
				d1Released = true;
			}
			else {
				d1Released = false;
			}
			
			if (d2Prev && d2Prev != d2Now) {
				d2Released = true;
			}
			else {
				d2Released = false;
			}
			
			if (d3Prev && d3Prev != d3Now) {
				d3Released = true;
			}
			else {
				d3Released = false;
			}
			
			if (d4Prev && d4Prev != d4Now) {
				d4Released = true;
			}
			else {
				d4Released = false;
			}
			
			if (d5Prev && d5Prev != d5Now) {
				d5Released = true;
			}
			else {
				d5Released = false;
			}
			
			updatePrev();
			
			if (debug) {
				debugText.visible = true;
				setChildIndex(debugText,numChildren-1);
				debugText.text = "";
				debugText.appendText("Keyboard States\n\n");
				
				debugText.appendText("UP now     = " + upNow + "\n");
				debugText.appendText("DOWN now   = " + downNow + "\n");
				debugText.appendText("LEFT now   = " + leftNow + "\n");
				debugText.appendText("RIGHT now  = " + rightNow + "\n");
				debugText.appendText("UP prev    = " + upPrev + "\n");
				debugText.appendText("DOWN prev  = " + downPrev + "\n");
				debugText.appendText("LEFT prev  = " + leftPrev + "\n");
				debugText.appendText("RIGHT prev = " + rightPrev + "\n\n");
				
				
				debugText.appendText("UP pressed     = " + upPressed + "\n");
				debugText.appendText("DOWN pressed   = " + downPressed + "\n");
				debugText.appendText("LEFT pressed   = " + leftPressed + "\n");
				debugText.appendText("RIGHT pressed  = " + rightPressed + "\n");
				debugText.appendText("UP released    = " + upReleased + "\n");
				debugText.appendText("DOWN released  = " + downReleased + "\n");
				debugText.appendText("LEFT released  = " + leftReleased + "\n");
				debugText.appendText("RIGHT released = " + rightReleased + "\n");
				
				debugText.setTextFormat(new TextFormat("Courier New"));
			}
			else {
				debugText.visible = false;
			}
			
		}
		
		private function keyDownCallback(ev:KeyboardEvent) {
			updatePrev();
			switch(ev.keyCode) {
				case 38:  // Keyboard.UP
				case 87:  // Keyboard.W
				upNow = true;
				break;
				
				case 40:  // Keyboard.DOWN
				case 83:  // Keyboard.S
				downNow = true;
				break;
				
				case 37:  // Keyboard.LEFT
				case 65:  // Keyboard.A
				leftNow = true;
				break;
				
				case 39:  // Keyboard.RIGHT
				case 68:  // Keyboard.D
				rightNow = true;
				break;
				
				case 49:  // Keyboard.D1
				d1Now = true;
				trace("hi!");
				break;
				
				case 50:  // Keyboard.D2
				d2Now = true;
				break;
				
				case 51:  // Keyboard.D3
				d3Now = true;
				break;
				
				case 52:  // Keyboard.D4
				d4Now = true;
				break;
				
				case 53:  // Keyboard.D5
				d5Now = true;
				break;
				
				default:
				break;
			}
		}
		
		private function keyUpCallback(ev:KeyboardEvent) {
			updatePrev();
			switch(ev.keyCode) {
				case 38:  // Keyboard.UP
				case 87:  // Keyboard.W
				upNow = false;
				break;
				
				case 40:  // Keyboard.DOWN
				case 83:  // Keyboard.S
				downNow = false;
				break;
				
				case 37:  // Keyboard.LEFT
				case 65:  // Keyboard.A
				leftNow = false;
				break;
				
				case 39:  // Keyboard.RIGHT
				case 68:  // Keyboard.D
				rightNow = false;
				break;
				
				case 49:  // Keyboard.D1
				d1Now = false;
				break;
				
				case 50:  // Keyboard.D2
				d2Now = false;
				break;
				
				case 51:  // Keyboard.D3
				d3Now = false;
				break;
				
				case 52:  // Keyboard.D4
				d4Now = false;
				break;
				
				case 53:  // Keyboard.D5
				d5Now = false;
				break;
				
				default:
				break;
			}
		}
		
		public function toggleDebug() {
			debug = !debug;
		}
	}
}