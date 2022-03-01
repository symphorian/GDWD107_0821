function PongViewModel() {
	// Normal Properties
	this.balls = {};
	this.balls["ball1"] = {xvel:1, yvel:1, colCheck:false, points:100};
	this.balls["ball2"] = {xvel:0.75, yvel:0.75, colCheck:false, points:50 };

	this.upKeyDown = false;
	this.downKeyDown = false;

	// Observable Properties
	this.player1 = ko.observable("");
	this.player2 = ko.observable("");

	this.score1 = ko.observable(0);
	this.score2 = ko.observable(0);

	// Computed Properties
	this.player1ScoreKey = ko.computed(function() {
		var completeMatchKey = this.player1() + "_" + this.player2() + ".score1";
		var partialMatchKey = this.player2() + "_" + this.player1() + ".score1";
		if (localStorage[completeMatchKey] != undefined) 
			return completeMatchKey;
		else if (localStorage[partialMatchKey] != undefined)
			return partialMatchKey;
		else {
			localStorage[completeMatchKey] = 0;
			return completeMatchKey;
		}
	}, this);

	this.player2ScoreKey = ko.computed(function() {
		var completeMatchKey = this.player1() + "_" + this.player2() + ".score2";
		var partialMatchKey = this.player2() + "_" + this.player1() + ".score2";
		if (localStorage[completeMatchKey] != undefined) 
			return completeMatchKey;
		else if (localStorage[partialMatchKey] != undefined)
			return partialMatchKey;
		else {
			localStorage[completeMatchKey] = 0;
			return completeMatchKey;
		}
	}, this);

	// Methods
	this.syncScore1 = function() {
		this.score1(localStorage[this.player1ScoreKey()]);
	}

	this.syncScore2 = function() {
		this.score2(localStorage[this.player2ScoreKey()]);
	}

	this.incrementScore1 = function(inc) {
		localStorage[this.player1ScoreKey()] = parseInt(localStorage[PONGVIEWMODEL.player1ScoreKey()]) + inc;
		this.syncScore1();
	}

	this.incrementScore2 = function(inc) {
		localStorage[this.player2ScoreKey()] = parseInt(localStorage[PONGVIEWMODEL.player2ScoreKey()]) + inc;
		this.syncScore2();
	}

	this.computeIntersection = function (l1p1,l1p2,l2p1,l2p2) {
		var x1 = l1p1.x;
		var x2 = l1p2.x;
		var x3 = l2p1.x;
		var x4 = l2p2.x;
		var y1 = l1p1.y;
		var y2 = l1p2.y;
		var y3 = l2p1.y;
		var y4 = l2p2.y;

		var x = (((x1*y2 - y1*x2)*(x3 - x4)) - (x1 - x2)*(x3*y4 - y3*x4)) / (((x1 - x2)*(y3 - y4)) - ((y1 - y2)*(x3 - x4)));
		var y = (((x1*y2 - y1*x2)*(y3 - y4)) - (y1 - y2)*(x3*y4 - y3*x4)) / (((x1 - x2)*(y3 - y4)) - ((y1 - y2)*(x3 - x4)));

		return {x:x, y:y};
	}

	this.computeDistance = function (p1,p2) {
		if (p1 == undefined || p2 == undefined) {
			return 100000000;
		}
		var xmag = p2.x - p1.x;
		var ymag = p2.y - p1.y;
		return Math.sqrt((xmag*xmag) + (ymag*ymag));
	}

	this.ballMoveComplete = function () {
		var x = $(this).css("left").replace("px","");
		var y = $(this).css("bottom").replace("px","");

		var xvel = PONGVIEWMODEL.balls[$(this).attr("id")].xvel;
		var yvel = PONGVIEWMODEL.balls[$(this).attr("id")].yvel;

		var p1x = $("#paddle1").css("left").replace("px","");
		var p1y = $("#paddle1").css("bottom").replace("px","");
		var p2x = $("#paddle2").css("left").replace("px","");
		var p2y = $("#paddle2").css("bottom").replace("px","");

		var width = $(window).width() - $(this).width();
		var height = $(window).height() - $(this).height();

		var tl = {x:0,y:height};
		var bl = {x:0,y:0};
		var tr = {x:width,y:height};
		var br = {x:width,y:0};
		
		var p1t = {x:Math.round($("#paddle1").width()/2),y:height};
		var p1b = {x:Math.round($("#paddle1").width()/2),y:0};
		var p2t = {x:width - Math.round($("#paddle2").width()/2),y:height};
		var p2b = {x:width - Math.round($("#paddle2").width()/2),y:0};

		var op = {x:Math.round(x),y:Math.round(y)};
		var opp = {x:Math.round(x)+xvel,y:Math.round(y)+yvel};

		var pop1 = {x:Math.round($("#paddle1").width()/2),y:Math.round(p1y)};
		var pop2 = {x:width - Math.round($("#paddle2").width()/2),y:Math.round(p2y)};

		if (PONGVIEWMODEL.balls[$(this).attr("id")].colCheck) {
			PONGVIEWMODEL.balls[$(this).attr("id")].colCheck = false;
			var pHitMag = PONGVIEWMODEL.computeDistance(op,pop1);
			if (pHitMag < Math.round($("#paddle1").width()/2)) {
				PONGVIEWMODEL.balls[$(this).attr("id")].xvel *= -1;
				$(this).animate({left:$(this).css("left")}, 0, PONGVIEWMODEL.ballMoveComplete);
				return;
			}

			pHitMag = PONGVIEWMODEL.computeDistance(op,pop2);
			if (pHitMag < Math.round($("#paddle2").width()/2)) {
				PONGVIEWMODEL.balls[$(this).attr("id")].xvel *= -1;
				$(this).animate({left:$(this).css("left")}, 0, PONGVIEWMODEL.ballMoveComplete);
				return;
			}
		}

		if (x == 0) {
			$("#goal1").finish();
			$("#goal1").animate({left:"0px"}, 500, "linear");
			$("#goal1").animate({left:"0px"}, 1000, "linear");
			$("#goal1").animate({left:"-100px"}, 1000, "linear");
			
			var points = PONGVIEWMODEL.balls[$(this).attr("id")].points;
			var set = false;
			$({ degree: 0 }).animate({ degree: 360 }, {
				duration: 360,
				step: function(now) { 
					$("#score2").css({"-webkit-transform": "rotateY(" + now + "deg)"});
					if (now > 270 && !set) {
						PONGVIEWMODEL.incrementScore2(points);
						set = true;
					}
				}
			});
		}
		if (x == $(window).width() - $(this).width()) {
			$("#goal2").finish();
			$("#goal2").animate({right:"0px"}, 500, "linear");
			$("#goal2").animate({right:"0px"}, 1000, "linear");
			$("#goal2").animate({right:"-100px"}, 1000, "linear");
			
			var points = PONGVIEWMODEL.balls[$(this).attr("id")].points;
			var set = false;
			$({ degree: 0 }).animate({ degree: 360 }, {
				duration: 360,
				step: function(now) { 
					$("#score1").css({"-webkit-transform": "rotateY(" + now + "deg)"});
					if (now > 270 && !set) {
						PONGVIEWMODEL.incrementScore1(points);
						set = true;
					}
				}
			});
		}


		var horizontalIntersection;
		var paddleIntersection;
		if (xvel > 0) {
			horizontalIntersection = PONGVIEWMODEL.computeIntersection(op, opp, tr, br);
			paddleIntersection = PONGVIEWMODEL.computeIntersection(op, opp, p2t, p2b);
		}
		else {
			horizontalIntersection = PONGVIEWMODEL.computeIntersection(op, opp, tl, bl);
			paddleIntersection = PONGVIEWMODEL.computeIntersection(op, opp, p1t, p1b);
		}

		var verticalIntersection;
		if (yvel > 0) {
			verticalIntersection = PONGVIEWMODEL.computeIntersection(op, opp, tl, tr);
		}
		else {
			verticalIntersection = PONGVIEWMODEL.computeIntersection(op, opp, bl, br);
		}

		var speed = Math.sqrt(xvel*xvel + yvel*yvel);
		var hmag = PONGVIEWMODEL.computeDistance(op,horizontalIntersection);
		var vmag = PONGVIEWMODEL.computeDistance(op,verticalIntersection);
		var pmag = PONGVIEWMODEL.computeDistance(op,paddleIntersection);
		
		if (hmag <= vmag) {
			if (pmag <= hmag && pmag != 0) {
				PONGVIEWMODEL.balls[$(this).attr("id")].colCheck = true;
				$(this).animate({left: paddleIntersection.x + "px", bottom: paddleIntersection.y + "px"}, pmag/speed, "linear", PONGVIEWMODEL.ballMoveComplete);
			}
			else {
				PONGVIEWMODEL.balls[$(this).attr("id")].xvel *= -1;
				PONGVIEWMODEL.balls[$(this).attr("id")].colCheck = false;
				$(this).animate({left: horizontalIntersection.x + "px", bottom: horizontalIntersection.y + "px"}, hmag/speed, "linear", PONGVIEWMODEL.ballMoveComplete);
			}
		}
		else {
			if (pmag <= vmag && pmag != 0) {
				PONGVIEWMODEL.balls[$(this).attr("id")].colCheck = true;
				$(this).animate({left: paddleIntersection.x + "px", bottom: paddleIntersection.y + "px"}, pmag/speed, "linear", PONGVIEWMODEL.ballMoveComplete);
			}
			else {
				PONGVIEWMODEL.balls[$(this).attr("id")].yvel *= -1;
				PONGVIEWMODEL.balls[$(this).attr("id")].colCheck = false;
				$(this).animate({left: verticalIntersection.x + "px", bottom: verticalIntersection.y + "px"}, vmag/speed, "linear", PONGVIEWMODEL.ballMoveComplete);
			}
		}
	}

	this.startPong = function() {
		var p1 = $("#player1");
		if ($("#player1").val() != "" && $("#player2").val() != "") {

			$("#dialog").hide();

			$(window).on("mousemove", function(e) {
				$("#paddle2").css("bottom", $(window).height()-e.pageY + "px");
			});

			$(window).on("keydown", function(e) {
				var dist;
				if (e.which == 38 && !this.upKeyDown) {
					this.upKeyDown = true;
					dist = $(window).height() - Math.round($("#paddle1").css("bottom").replace("px",""));
					console.log(dist);
					$("#paddle1").animate({bottom:$(window).height()}, dist*0.5, "linear");
				}
				if (e.which == 40 && !this.downKeyDown) {
					this.downKeyDown = true;
					dist = Math.round($("#paddle1").css("bottom").replace("px",""));
					console.log(dist);
					$("#paddle1").animate({bottom:0}, dist*0.5, "linear");
				}
			});

			$(window).on("keyup", function(e) {
				if (e.which == 38 && this.upKeyDown) {
					this.upKeyDown = false;
					$("#paddle1").stop();
				}
				if (e.which == 40 && this.downKeyDown) {
					this.downKeyDown = false;
					$("#paddle1").stop();
				}
			});

			this.syncScore1();
			this.syncScore2();

			$("#ball1").animate({left:$("#ball1").css("left")}, 0, this.ballMoveComplete);
			$("#ball2").animate({left:$("#ball2").css("left")}, 0, this.ballMoveComplete);
		}
	};
}

var PONGVIEWMODEL = new PongViewModel();
ko.applyBindings(PONGVIEWMODEL);