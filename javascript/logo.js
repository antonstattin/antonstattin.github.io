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
		//setTimeout(function(){
		    $('canvas').drawRect({
			  fillStyle: 'rgb(225, 225, 225)',
			  x: 20*wid+10, y: 20*hei+10,
			  width: 20,
			  height: 20,
			  layer: true,
			  groups: ['block']
			});
			//}, 1000);
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


// shift colors every 6sec, very artistic, artistic indeed 
var shift = false;
setInterval(function() {

	if (shift){
		$('canvas').animateLayerGroup('block',{
		  fillStyle: 'rgb(50, 51, 150)'
		},600);
		shift= false;
	}else{
			$('canvas').animateLayerGroup('block',{
			  fillStyle: 'rgb(150, 51, 50)'
			},600);

			shift=true;
	}

}, 6000);
