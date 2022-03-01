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