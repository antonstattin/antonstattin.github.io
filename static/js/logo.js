/*
####   ###  #######   ##### ###  ##  ##    ##  #     #
#   #   #	#  #  #  ##      #  #     #    #   #     #
####    # 	   #      ####   ###      #    #   #     #
#   #   #      #        ##   # ##  	  ##  ##   #     #
####   ###    ###   #####   ##   ###   ####    ##### #####


Bitskull logo script. creates a bitskull logo with html canvas
*/


//Run through and create logo with "rectangle pixels"

//the logo matrix, needs to be 9x11!
logoTrix = [0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,1,1,1,1,1,0,0,0,
				0,0,1,1,1,1,1,1,1,0,0,
				0,0,1,1,1,1,1,1,1,0,0,
				0,1,1,0,1,1,1,0,1,1,0,
				0,1,1,1,1,1,1,1,1,1,0,
				0,0,1,1,1,1,1,1,1,0,0,
				0,0,0,1,0,1,0,1,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0];

// loop and paint logo
total = 0
for (hei = 0; hei < 9; hei++) {

    for (wid=0;  wid<11; wid++)
    {

    	if(logoTrix[total]===1){
		    $('#canvas-game').drawRect({
			  fillStyle: 'rgb('+(0+(hei*10))+', '+ (200+(hei*10))+', '+(200+(hei*10))+')',
			  x: 20*wid+10, y: 20*hei+10,
			  width: 20,
			  height: 20,
			  layer: true,
			  groups: ['block']
			});

		    //$('#canvas-game').animateLayerGroup('block',{
		  	//	fillStyle: 'rgb('+(165-(hei*10))+', '+ (183-(hei*10))+', '+(214-(hei*10))+')'
			//},600+(total*5));

		}

	  total++;

      }

}


var wtext = "<strong>Hi, Bitskull makes Indie Games. Awesome stuff on the way, stay tuned.. </strong><br><i>(if you feel bored from waiting.. hit <span style='color:#d89c3a'>Enter</span> on your keyboard)</i>";

function writeText(text, i){

	if(text.length>i){
		$('#welcometext').html(text.substring(0, i));
		setTimeout(function(){
			writeText(text, i+1);
		},100);
	}


}

writeText(wtext, 0);



function cursorAnim(){
	$('#cursor').animate({
		opacity:1
	}, 500, 'swing').animate(
	{
		opacity:0
	}, 500, 'swing');

}
setInterval('cursorAnim()', 1000);


// game functionalities


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	e.preventDefault();
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	e.preventDefault();
	delete keysDown[e.keyCode];
}, false);


// Game objects
var player = {
	speed: 60, // movement in pixels per second
	x: 125,
	y: 30,
	size: 10,
	velocityY: 0,
	velocityX: 0,
	grounded: false,
	mass: 0.43,
    slide: 0.1,
    points: 0
};

var point = {
	x: 0,
	y: 0,
	size: 6
}

var gameObject = {

	gravity: 9.8,
	friction: 4,
	score: false
};




function spawnPoint(){

	var exit = true;
	while(exit){


		valueX = Math.floor((Math.random() * 228) + 1);
		valueY = Math.floor((Math.random() * 168) + 1);

		var roundX = roundUp(valueX/20);
		var roundY = roundUp(valueY/20);

		var check = logoTrix[((roundY-1)*11)+roundX-1];

		if(check){


			point.x = valueX;
			point.y = valueY;

			exit = false;

		}

	};


	$('#canvas-game').removeLayer('point').drawLayers();
	$('#canvas-game').removeLayer('spec').drawLayers();

	$('#canvas-game').drawRect({
			  fillStyle: 'rgb(255, 219, 110)',
			  x: point.x, y: point.y,
			  width: point.size,
			  height: point.size,
			  layer: true,
			  name: 'point'
			});

	$('#canvas-game').drawRect({
			  fillStyle: 'rgb(255, 255, 255)',
			  x: point.x+1, y: point.y-1,
			  width: 2,
			  height: 2,
			  layer: true,
			  name: 'spec'
			});



}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60)

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return minutes + ":" + seconds + "." + milliseconds;
}

function win(){
	total = 0
	gamestate = false;
	gameover = true;
	$('#canvas-game').removeLayer('scoretable').drawLayers();

	var scoretime = msToTime(Date.now() - timecount);

	for (hei = 0; hei < 9; hei++) {

	    for (wid=0;  wid<11; wid++)
	    {

	    	if(logoTrix[total]===1){
					$('#canvas-game').drawRect({
				  fillStyle: 'rgb('+(0+(hei*10))+', '+ (200+(hei*10))+', '+(200+(hei*10))+')',
				  x: 20*wid+10, y: 20*hei+10,
				  width: 20,
				  height: 20,
				  layer: true,
				  groups: ['block']

				});

			}

		  total++;

	      }
	}

	$('#canvas-game').removeClass('game-started-canvas');
	$('#canvas-game').addClass('game-over-canvas');

	$('#score-text').text('Good job!');
	$('#score-text').addClass('win-text');
	$('#time-score').text('Finished in ' + scoretime);
	$('#time-score-container').addClass('time-score-show');
	$('#game-info').html('Checkout more games at <a>bitskull.com</a>');

}


// we need to check each corner if it's colliding..
function checkSide(totalX, totalY, triX, triY){

	checkX = totalX + triX;
	checkY = totalY + triY;

	var roundX = roundUp(checkX/20);
	var roundY = roundUp(checkY/20);

	var check = logoTrix[((roundY-1)*11)+roundX-1];

	return check;

}


function checkCollision(wantX, wantY){

	playerWid = player.size/2;

	totalX = player.x + wantX;
	totalY = player.y + wantY;

	var leftUpCheck = checkSide(totalX, totalY, -playerWid, playerWid);
	var leftDownCheck = checkSide(totalX, totalY, -playerWid, -playerWid);
	var rightUpCheck = checkSide(totalX, totalY, playerWid, playerWid);
	var rightDownCheck = checkSide(totalX, totalY, playerWid, -playerWid);

	if(1==leftUpCheck&&leftDownCheck&&rightUpCheck&&rightDownCheck){
		player.x = player.x + wantX;
		player.y = player.y + wantY;

		player.grounded = false
	}
	else{
		player.velocityY = 0;
		player.grounded = true;
	}
}

function checkPickPoint(){

	hit = false;

	if( (player.x<(point.x+10)) && (player.x>(point.x-10)) && (player.y<(point.y+10)) && (player.y>(point.y-10))){
		hit=true;
	}

	if(hit){
		player.points++;
		if(player.points == 6){
			win();
			return
		}
		gameObject.score = true;
		spawnPoint();
	}
}


// update function
var update = function(modifier){

	// the new values we want
	wantX = 0;
	wantY = 0;

	if (38 in keysDown){ // upp

		if(player.grounded){

			//wantY -= player.speed * modifier + 10*modifier;


			player.velocityY -=player.speed * modifier + 2;

		}
	}
	if (40 in keysDown){ // down
		wantY = player.speed * modifier;

	}
	if (37 in keysDown){ // left
		wantX -= player.speed * modifier;

	}
	if (39 in keysDown){ // right
		wantX += player.speed * modifier;

	}

	if(player.velocityX != 0){
		if(player.velocityX>0){
			player.velocityX+= gameObject.friction*modifier;
		}
		else{
			player.velocityX-= gameObject.friction*modifier;
		}
	}

	// collision 1
	wantX +=player.velocityX;
	checkCollision(wantX, wantY);

	if(!player.grounded){
		player.velocityY += (gameObject.gravity*player.mass)*modifier;
		wantY += player.velocityY;
	}
	// collision 2
	checkCollision(wantX, wantY);


	// check if player is at point

	checkPickPoint();


}

//round up
function roundUp(num) {
  return Math.ceil(num)/1
}



function renderPlayer(){
	$('#canvas-game').removeLayer('player').drawLayers();
	$('#canvas-game').removeLayer('text').drawLayers();

	$('#canvas-game').drawRect({
			  fillStyle: 'rgb(220, 40, 40)',
			  x: player.x, y: player.y,
			  width: player.size,
			  height: player.size,
			  layer: true,
			  name: 'player'
			});
}


function renderScore(){


	gameObject.score= false;
	$('#canvas-game').drawText({
		  fillStyle: 'rgb(255,200,36)',
		  strokeWidth: 2,
		  x: 110, y: 70,
		  fontSize: 0,
		  fontFamily: 'Verdana, sans-serif',
		  layer: true,
		  name:'score',
		  text: 'Score!'
		});

	$('#canvas-game').animateLayer('score',
		{
		fontSize: 20},
		1000,
		function(){
			$('#canvas-game').removeLayer('score').drawLayers();
		});

	$('#canvas-game').removeLayer('scoretable').drawLayers();
	$('#canvas-game').drawText({
		  fillStyle: 'rgb(255,200,36)',
		  strokeWidth: 2,
		  x: 110, y: 10,
		  fontSize: 12,
		  fontFamily: 'Verdana, sans-serif',
		  layer: true,
		  name:'scoretable',
		  text: 'points: ' + player.points
		});

}




// render
var render = function(){

	if (gamestate){
		renderPlayer();

		if(gameObject.score){
			renderScore();
		}
	}
	else{
		return
	}
}

function startGame(){

	// loop and paint logo
	total = 0
	for (hei = 0; hei < 9; hei++) {

	    for (wid=0;  wid<11; wid++)
	    {

	    	if(logoTrix[total]===1){
			    $('#canvas-game').drawRect({
				  fillStyle: 'rgb('+(165-(hei*10))+', '+ (183-(hei*10))+', '+(214-(hei*10))+')',
				  x: 20*wid+10, y: 20*hei+10,
				  width: 20,
				  height: 20,
				  layer: true,
				  groups: ['block']
				});

			}

		  total++;

	      }

	}


	$('#canvas-game').drawRect({
			  fillStyle: 'rgb(50, 200, 20)',
			  x: 191, y:119,
			  width: 20,
			  height: 3,
			  layer: true,
			  groups: ['foreground']
			});

	$('#canvas-game').drawRect({
			  fillStyle: 'rgb(50, 200, 20)',
			  x: 31, y:119,
			  width: 20,
			  height: 3,
			  layer: true,
			  groups: ['foreground']
			});

	$('#canvas-game').drawRect({
			  fillStyle: 'rgb(50, 200, 20)',
			  x: 51, y:139,
			  width: 20,
			  height: 3,
			  layer: true,
			  groups: ['foreground']
			});

	$('#canvas-game').drawRect({
			  fillStyle: 'rgb(50, 200, 20)',
			  x: 171, y:139,
			  width: 20,
			  height: 3,
			  layer: true,
			  groups: ['foreground']
			});

	$('#canvas-game').drawRect({
			  fillStyle: 'rgb(50, 200, 20)',
			  x: 130, y:139,
			  width: 20,
			  height: 3,
			  layer: true,
			  groups: ['foreground']
			});

	$('#canvas-game').drawRect({
			  fillStyle: 'rgb(50, 200, 20)',
			  x: 90, y:139,
			  width: 20,
			  height: 3,
			  layer: true,
			  groups: ['foreground']
			});

	spawnPoint();


}


// loop

// The main game loop
var main = function () {

	if (!gameover){
		if ((13 in keysDown)&&!gamestate){

			$('#canvas-game').addClass('game-started-canvas');
			timecount = Date.now();
			gamestate=true
			startGame();

			then = Date.now();
		}

		if(gamestate){

			var now = Date.now();
			var delta = now - then;

			update(delta / 1000);
			render();

			then = now;

		}

		// Request to do this again ASAP
		requestAnimationFrame(main);
	}
};

var gameover = false;
var gamestate = false;
var then = 0;
var timecount = 0;

main();
