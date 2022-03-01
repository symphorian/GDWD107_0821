package {
	import flash.events.Event;
	import flash.display.MovieClip;
	
	public class FlipperWithWidth extends MovieClip {
		
		public var pic1:MovieClip;
		public var pic2:MovieClip;
		public var width1:MovieClip;
		
		public var counter:int;
		private var pic1Top:Boolean;
		
		public function FlipperWithWidth(p1:MovieClip, p2:MovieClip, w1:MovieClip) {
			pic1 = p1;
			pic2 = p2;
			width1 = w1;
			
			pic1.width = 800;
			pic2.width = 0;
			
			counter = 0;
			pic1Top = true;
			
			addEventListener(Event.ENTER_FRAME, mainLoop);
		}
		
		private function mainLoop(ev:Event) {
			switch (counter) {
				case 0:
				pic1.x = 400;
				pic2.x = 400;
				width1.x = 740;
				break;
				
				case 30:
				if (pic1Top) {
					pic1.width = 0;
					pic2.width = 0;
					pic1.x = 400 - 60;
					pic2.x = 400 + 60;
				}
				else {
					pic1.width = 0;
					pic2.width = 0;
					pic2.x = 400 - 60;
					pic1.x = 400 + 60;
				}
				counter++;
				break;
				
				case 60:
				counter = 0;
				pic1Top = !pic1Top;
				if (pic1Top) {
					pic1.width = 800;
				}
				else {
					pic2.width = 800;
				}
				break;
				
				default:
				if (counter < 30) {
					if (pic1Top) {
						pic1.width -= 800 / 30;
						pic1.x -= 2;
						
					}
					else {
						pic2.width -= 800 / 30;
						pic2.x -= 2;
					}
				}
				else {
					if (pic1Top) {
						pic2.width += 800 / 30;
						pic2.x -= 2;
					}
					else {
						pic1.width += 800 / 30;
						pic1.x -= 2;
					}
				}
				width1.x -= 680/60;
				counter++;
				break;
			}
		}
		
		public function flip() {
			if (counter == 0) {
				counter++;
			}
		}
	}
}