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
		    $('canvas').drawRect({
			  fillStyle: 'rgb(0, 0, 0)',
			  x: 20*wid+10, y: 20*hei+10,
			  width: 20,
			  height: 20,
			  layer: true,
			  groups: ['block']
			});

		    $('canvas').animateLayerGroup('block',{
		  		fillStyle: 'rgb('+(165-(hei*10))+', '+ (183-(hei*10))+', '+(214-(hei*10))+')'
			},600+(total*5));
			shift= false;

		}
			   
	  total++;

      }

}


$('canvas').drawRect({
		  fillStyle: 'rgb(50, 200, 20)',
		  x: 191, y:119,
		  width: 20,
		  height: 3,
		  layer: true,
		  groups: ['foreground']
		});

$('canvas').drawRect({
		  fillStyle: 'rgb(50, 200, 20)',
		  x: 31, y:119,
		  width: 20,
		  height: 3,
		  layer: true,
		  groups: ['foreground']
		});

$('canvas').drawRect({
		  fillStyle: 'rgb(50, 200, 20)',
		  x: 51, y:139,
		  width: 20,
		  height: 3,
		  layer: true,
		  groups: ['foreground']
		});

$('canvas').drawRect({
		  fillStyle: 'rgb(50, 200, 20)',
		  x: 171, y:139,
		  width: 20,
		  height: 3,
		  layer: true,
		  groups: ['foreground']
		});

$('canvas').drawRect({
		  fillStyle: 'rgb(50, 200, 20)',
		  x: 130, y:139,
		  width: 20,
		  height: 3,
		  layer: true,
		  groups: ['foreground']
		});

$('canvas').drawRect({
		  fillStyle: 'rgb(50, 200, 20)',
		  x: 90, y:139,
		  width: 20,
		  height: 3,
		  layer: true,
		  groups: ['foreground']
		});




var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
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


		valueX = Math.floor((Math.random() * 108) + 1);
		valueY = Math.floor((Math.random() * 108) + 1);

		var roundX = roundUp(valueX/20);
		var roundY = roundUp(valueY/20);

		var check = logoTrix[((roundY-1)*11)+roundX-1];

		if(check){


			point.x = valueX;
			point.y = valueY;

			exit = false;

		}

	};


	$('canvas').removeLayer('point').drawLayers();
	$('canvas').removeLayer('spec').drawLayers();

	$('canvas').drawRect({
			  fillStyle: 'rgb(255, 219, 110)',
			  x: point.x, y: point.y,
			  width: point.size,
			  height: point.size,
			  layer: true,
			  name: 'point'
			});

	$('canvas').drawRect({
			  fillStyle: 'rgb(255, 255, 255)',
			  x: point.x+1, y: point.y-1,
			  width: 2,
			  height: 2,
			  layer: true,
			  name: 'spec'
			});



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

	if( (player.x<(point.x+5)) && (player.x>(point.x-5)) && (player.y<(point.y+5)) && (player.y>(point.y-5))){
		hit=true;
	}

	if(hit){

		
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

	player.velocityY += (gameObject.gravity*player.mass)*modifier;
	wantY += player.velocityY;

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
	$('canvas').removeLayer('player').drawLayers();
	$('canvas').removeLayer('text').drawLayers();

	$('canvas').drawRect({
			  fillStyle: 'rgb(220, 40, 40)',
			  x: player.x, y: player.y,
			  width: player.size,
			  height: player.size,
			  layer: true,
			  name: 'player'
			});

	
}


function renderScore(){

	$('canvas').drawText({
		  fillStyle: 'rgb(255,200,36)',
		  strokeWidth: 2,
		  x: 120, y: 10,
		  fontSize: 0,
		  fontFamily: 'Verdana, sans-serif',
		  layer: true,
		  name:'score',
		  text: 'Score!'
		});

	

	$('canvas').animateLayer('score', 
		{fontSize:12}, 
		10000, 
		function(){
			gameObject.score= false;
			$('canvas').removeLayer('score').drawLayers();
		});


}




// render
var render = function(){

	renderPlayer();

	if(gameObject.score){
		renderScore();	
	}



	

}


// loop

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

var then = Date.now();
spawnPoint()
main();
