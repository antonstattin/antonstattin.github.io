/*
####   ###  #######   ##### ###  ##  ##    ##  #     #
#   #   #	#  #  #  ##      #  #     #    #   #     #
####    # 	   #      ####   ###      #    #   #     #
#   #   #      #        ##   # ##  	  ##  ##   #     #   
####   ###    ###   #####   ##   ###   ####    ##### ##### 

					   #######
					  #########
					  #########
				    ### ##### ###
					#############
					  #########
					    # # #   

Bitskull logo script. creates a bitskull logo with html canvas
*/


//Run through and create logo with "rectangle pixels"

//the logo matrix, needs to be 9x11!
logoTrix = [0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,1,1,1,1,1,0,0,0,
			0,0,1,1,1,1,1,1,1,0,0,
			0,0,1,1,1,1,1,1,1,0,0,
			0,1,1,1,1,1,1,1,1,1,0,
			0,1,1,1,0,1,0,1,1,1,0,
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
				  fillStyle: 'rgb(10, 10, 10)'
				},50 + (total*2));
		}else{
			$('canvas').drawRect({
			  fillStyle: '#000',
			  x: 20*wid+10, y: 20*hei+10,
			  width: 20,
			  height: 20
			});
		}
			   
	  total++;

      }

}


// shift colors every 1sec, very artistic, artistic indeed 
var shift = false;
setInterval(function() {

	if (shift){
		
		var timeOffset =  Math.floor((Math.random() * 200) + 1);
		$('canvas').animateLayerGroup('block',{
		  fillStyle: 'rgb(173, 62, 62)'
		},(800+timeOffset));
		shift= false;
	}else{
			var timeOffset =  Math.floor((Math.random() * 200) + 1);
			$('canvas').animateLayerGroup('block',{
			  fillStyle: 'rgb(255, 97, 0)'
			},(800+timeOffset));

			shift=true;
	}

}, 500);
