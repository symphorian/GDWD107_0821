package {
	import flash.display.MovieClip;
	import flash.events.Event;
	import Graphics_BitmapFill;
	
	public class Panel extends MovieClip {
		private var pic:Graphics_BitmapFill;
		private var chapterNum:int;
		private var panelNum:int;
		public var transitionType:String;
		public var transDuration:Number;
		
		public function Panel(chNum:int,pNum:int,xPos:int,yPos:int,rot:int,trans:String,dur:Number) {
			chapterNum = chNum;
			panelNum = pNum;
			pic = new Graphics_BitmapFill(chapterNum,panelNum);
			addChild(pic);
			
			transitionType = trans;
			transDuration = dur;
			x = xPos;
			y = yPos;
			rotation = rot;
		}
		
		public function getChapterNum() {
			return chapterNum;
		}
		
		public function getPanelNum() {
			return panelNum;
		}
		
		public function isFailure() {
			return pic.isFailure();
		}
	}
}