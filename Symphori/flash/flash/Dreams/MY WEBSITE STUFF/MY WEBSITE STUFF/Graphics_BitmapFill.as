package {
    import flash.display.MovieClip;
    import flash.display.BitmapData;
    import flash.display.Loader;
    import flash.net.URLRequest;
    import flash.events.Event;
    import flash.events.IOErrorEvent;
    import flash.geom.Matrix;

    public class Graphics_BitmapFill extends MovieClip {
 
        private var url:String;
        private var loader:Loader = new Loader();
		public var failed:Boolean = true;

        public function Graphics_BitmapFill(chapterNum:int, panelNum:int) {
			
			url = "Chapter" + chapterNum + "Panel" + panelNum + ".png";
            var request:URLRequest = new URLRequest(url);
            
            loader.load(request);
            loader.contentLoaderInfo.addEventListener(Event.COMPLETE, drawImage);
            loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
			loader.addEventListener(Event.ADDED, added);
			addChild(loader);
        }

        private function drawImage(event:Event):void {
			failed = false;
            /*var mySprite:MovieClip = new MovieClip();
            var myBitmap:BitmapData = new BitmapData(loader.width, loader.height, true);
  
            myBitmap.draw(loader);
            
            mySprite.graphics.beginBitmapFill(myBitmap, null, false, false);
            mySprite.graphics.drawRect(0, 0, myBitmap.width, myBitmap.height);
            mySprite.graphics.endFill();
            
            addChild(mySprite);*/
        }
 
        private function ioErrorHandler(event:IOErrorEvent):void {
            trace("Unable to load image: " + url);
			failed = true;
        }
		
		private function added(ev:Event) {
			x = -width/2;
			y = -height/2;
		}
		
		public function isFailure() {
			return failed;
		}
    }   
}
