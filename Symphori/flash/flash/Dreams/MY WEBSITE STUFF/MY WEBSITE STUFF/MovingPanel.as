package {
	import flash.display.MovieClip;
	import flash.net.URLRequest;
    import flash.media.Sound;
	import Graphics_BitmapFill;
	import gs.TweenLite;
	import gs.easing.*
	
	public class MovingPanel extends Panel {
		
		public var moodName:String;
		public var moodMusic:Sound;
		
		public function MovingPanel(chNum:int,pNum:int,xPos:int,yPos:int,rot:int,trans:String,dur:Number,mood:String) {
			super(chNum,pNum,xPos,yPos,rot,trans,dur);
			
			moodName = mood;
			moodMusic = new Sound();
			
			if (moodName != "") {
				var myURL:URLRequest = new URLRequest(moodName + ".mp3");
				moodMusic.load(myURL);
			}
			
			switch(transitionType) {
				case "toss":
				trace("toss Transition Identified");
				x = Math.random()*1000-100;
				y = 900;
				rotation = Math.random()*60-30;
				TweenLite.to(this, transDuration, {x:xPos, y:yPos, rotation:rot, ease:Quint.easeOut});
				break;
		
				case "drop":
				trace("drop Transition Identified");
				rotation = Math.random()*60-30;
				scaleX = 2.5;
				scaleY = 2.5;
				TweenLite.to(this, transDuration, {scaleX:1, scaleY:1, rotation:rot});
				break;
		
				case "fade":
				trace("fade Transition Identified");
				alpha = 0;
				TweenLite.to(this, transDuration, {alpha:1, ease:Quint.easeOut});
				break;
		
				case "drift":
				trace("drift Transition Identified");
				x -= 300;
				y -= 160;
				rotation = rot + 10;
				scaleX = 1.3;
				scaleY = 1.5;
				TweenLite.to(this, transDuration, {scaleX:1.0, ease:Quint.easeOut, overwrite:0});
				TweenLite.to(this, transDuration/3.0, {x:"500", y:"100", scaleY:1.3, rotation:"-15", overwrite:0});
				TweenLite.to(this, transDuration/3.0, {delay: 1, x:"-300", y:"50", scaleY:1.1, rotation:"10",  overwrite:0});
				TweenLite.to(this, transDuration/3.0, {delay: 2, x:"100", y:"10", scaleY:1, rotation:"-5",  overwrite:0});
				break;
		
				default:
				trace("Invalid Transition Argument");
				break;
			}
		}
	}
}