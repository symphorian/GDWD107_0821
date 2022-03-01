package {
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	
	[Embed(source="C:\\WINDOWS\\Fonts\\Hymmnos.ttf", fontFamily="Hymn")]
	public class HymmnosTextField extends TextField {
		
		
		//var HymmnosEmbedded:Class;
		
		//var hymmnosEmbeddedFont:Font = new HymmnosEmbedded();
		
		public function HymmnosTextField() {
			super();
		}
		
		public function setHymmnosFormat(size:int,centered:Boolean=true) {
			//this.setTextFormat(new TextFormat(hymmnosEmbeddedFont.fontName,size,0,null,null,null,null,null,TextFormatAlign.CENTER));
			this.setTextFormat(new TextFormat("Hymn",size,0,null,null,null,null,null,TextFormatAlign.CENTER));
		}
	}
	
}