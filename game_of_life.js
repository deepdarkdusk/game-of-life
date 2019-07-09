var game_fields       = 0;
var game_field_width  = 0;
var game_field_height = 0;

var game_timeout      = false;
var game_active_level = false;

function didi1(){
	load_level(1)

	img = document.getElementById('img1')
	var canvas = document.getElementById('canvas1');
	var context = canvas.getContext('2d');
	context.drawImage(img, 0, 0);
	img.setAttribute('crossOrigin', '');
	
	
	
	//console.log(context.getImageData(0, 0, 40, 40).data);
	//var imgData = context.getImageData(0, 0, 200, 200);


//	var i=0;
//	var state=[]
//	for(var index in state) { 
//		++i;
//		console.log(state[index],i,index); 
//		if(state[index] == 0xf6 || state[index] == 0xfb || state[index] == 0xf9 || state[index] == 0xff ) {switch_td_state( document.getElementById('game_td_'+i) )}
//	}
	//img = document.getElementById('img1')
	//var canvas = document.getElementById('canvas1');
	//var context = canvas.getContext('2d');
	//context.drawImage(img, 0, 0);
	//	console.log(context.getImageData(10, 10, 40, 40).data);

				var imgData = context.getImageData(0, 0, 20, 20);
				// invert colors
	var i;
	var j=0;
	for (i = 0; i < imgData.data.length; i += 4) {

		console.log("hello "+i)

			e=document.getElementById('game_td_'+ ++j); 
			if(e == null){ console.log("lalal"); continue }
		var summ=imgData.data[i] + imgData.data[i+1] + imgData.data[i+2];
		if(summ >= 384 ) {
			console.log("YAY "+summ)
			switch_td_state( document.getElementById('game_td_'+j) )
		} else {
			console.log("NAY "+summ)
		
		}

	}
				context.putImageData(imgData, 10, 10);

}
function didi(){


	
	

}

// this function draws the control pannel
function draw_panel( id ) {
	var outer_div = document.createElement("div");
	outer_div.id = id + "_panel";

	var step_button = document.createElement("input");
	step_button.type  = "submit";
	step_button.value = "step";
	step_button.setAttribute ( "onclick", "javascript: execute_step('"+ id +"');" );

	outer_div.appendChild( step_button );

	return outer_div;

}
// this function draws the playing field
function draw_field( id, width, height ) {
	if( width * height > 2500 ) {
		if( ! confirm( "Resizing to fields larger than 2500 cells can slow down your PC or will freeze your browser. Do you really wan't to proceed?" ) ) return;
	}
	
	// unset current content
	while( document.getElementById(id).firstChild ) {
		document.getElementById(id).removeChild( document.getElementById(id).firstChild );
	}

	// store width and height in global vars
	game_field_width  = width;
	game_field_height = height;

	// start creating the playing field table
	var table = document.createElement("table");
	table.id  = id + "_panel";
	table.setAttribute("cellpadding", 0);
	table.setAttribute("cellspacing", 0);

	var i = 0;
	for( var y = 0; y < height; y++  ) {
		// start new table row
		var tr = document.createElement("tr");
		
		for( var x = 0; x < width; x++ ) {
			i++;
			var td = document.createElement("td");
			td.className    = "fgu";
			td.id           = id + "_td_" + i;
			// td.title        = i;

			var img = document.createElement("img");
			img.setAttribute ( "onclick", "javascript: switch_td_state( document.getElementById('"+ id +"_td_"+ i +"'), true );" );
			img.src       = "game_of_life.png";
			img.className = "fields_game_img"

			td.appendChild( img );
			tr.appendChild( td );
		
		}

		table.appendChild( tr );

	}

	game_fields = i;

	return table;
}
function switch_td_state( element, click ) {
	// if riddle mode is active, we have to check if the player still has an placeable cell left
	if( game_active_level !== false && click == true && element.className == "fgu" ) {
		var clicks = document.getElementById('game_panel_clicks');
		if( clicks.value > 0 ) {
			clicks.value--; 

		// if the player has none cell left to activate
		// leave this function
		} else {
			// alert("You have no cells left!");
			return false;

		}
				
	// if riddle mode is active, the player can only activate cells
	// he cannot deactivate any cell
	} else if( game_active_level !== false && click == true ) {
		return false;

	}

	// change cell status
	if( element.className == "fgc" ) {
		var _class = "fgu";
	} else {
		var _class = "fgc";
	}
	element.className = _class;

	// in riddle mode, we have "push" the start button because the player will not see it
	if( game_active_level !== false && click == true ) {
		if( clicks.value == 0 ) {
			// alert("You have no cells left!");
			var x = function() {
				eval( document.getElementById('game_panel_start').getAttribute("onclick") );
			}
			window.setTimeout( x, 500 );
		}
	}

}
function execute_step( id ) {
	var cells  = new Array;
	for( var i = 1; i <= game_fields; i++ ) {
		// first we have to determine which cells are connected to the active cell
		var neighbors = new Array;
		neighbors[0] = ( parseInt(i) - parseInt(game_field_width) );      // upper center
		neighbors[1] = ( parseInt(i) - parseInt(game_field_width) - 1 );  // upper left
		neighbors[2] = ( parseInt(i) - parseInt(game_field_width) + 1 );  // upper right
		neighbors[3] = ( parseInt(i) + 1 );                               // right
		neighbors[4] = ( parseInt(i) - 1 );                               // left
		neighbors[5] = ( parseInt(i) + parseInt(game_field_width) - 1 );  // lower left
		neighbors[6] = ( parseInt(i) + parseInt(game_field_width) + 1 );  // lower right
		neighbors[7] = ( parseInt(i) + parseInt(game_field_width) );      // lower center
		neighbors[8] = parseInt(i);                                       // active cell

		// we need to sort these cells out that have to be in the same row to be connected
		// if the outer cell is in an other row than the inner cell, the outer cell will be
		// set to -1 and so it remains unchecked
		var overflow = new Array(
			new Array( 8, 3 ), 
			new Array( 8, 4 ), 
			new Array( 0, 1 ), 
			new Array( 0, 2 ), 
			new Array( 7, 5 ),
			new Array( 7, 6 )
		);
		for( var j in overflow ) {
			var row1 = Math.floor( neighbors[overflow[j][0]] / parseInt(game_field_width) - 0.00000000001 );
			var row2 = Math.floor( neighbors[overflow[j][1]] / parseInt(game_field_width) - 0.00000000001 );

			if( row1 != row2 ) {
				neighbors[overflow[j][1]] = -1;

			}

		}

		var connected = 0;

		// checking an living cell
		if( document.getElementById( id + "_td_" + i ).className == "fgc" ) {
			// check all 8 neighbors for active cells
			for( var j = 0; j < 8; j++ ) {
				if( 
					neighbors[j] > 0 &&
					neighbors[j] <= game_fields &&
					document.getElementById( id + "_td_" + neighbors[j] ).className == "fgc"
				) {
					connected++;
					
				}
				
			}
			// cell dies if it has less than 2 or more than 3 active neighbors
			if( connected < 2 || connected > 3 ) {
				cells[i] = i;

			} 


		// checking an dead cell
		} else {
			for( var j = 0; j < 8; j++ ) {
				if( 
					neighbors[j] > 0 &&
					neighbors[j] <= game_fields &&
					document.getElementById( id + "_td_" + neighbors[j] ).className == "fgc"
				) {
					connected++;
					
				}
				
			}
			// cell lives if it has exactly 3 living neighbors
			if( connected == 3 ) {
				cells[i] = i;

			} 
			

		}

	}

	// count changed fields
	var changes = 0;
	for( var i = 1; i <= game_fields; i++ ) {	
		if( cells[i] != undefined ) {
			changes++;
		}

	}

	// switch cell state of changed
	for( var i in cells ) {	
		var cell = document.getElementById( id +"_td_"+ cells[i] );
		if( cells[i] != undefined ) {
			switch_td_state( cell );
		}

	}

	return changes;
}
// die schleife
function step_loop( id, timeout ) {
	if( timeout < 100 ) {
		alert( 'The Timout has to be at least 100 milliseconds.' );
		return;
	}

	/* 
	 * this shouldn't be needed anymore, since the player can't see the start button
	 *
	if( game_active_level !== false ) {
		if( document.getElementById('game_panel_clicks').value > 0 ) {
			alert( 'You have to use all clicks.' );
			return;
		}
	}
	*/

	// switch start button to stop button
	document.getElementById(id+'_panel_start').value = 'stop';
	document.getElementById(id+'_panel_start').setAttribute( "onclick", "window.clearTimeout(game_timeout); game_timeout = false; document.getElementById('game_panel_rounds').value = 0; step_loop('"+ id +"', 100, 0);" );

	var steps = document.getElementById(id+'_panel_rounds');
	if( steps.value > 0 ) {
		// if no changes where made in the round we set
		// the remaining rounds (steps) to zero
		if( ! execute_step(id) ) {
			steps.value = 0;

		// if changes where made in this round we decrement
		// the steps value
		} else {
			steps.value--;

		}

		// start next round after "timeout" milliseconds
		game_timeout = window.setTimeout('step_loop("'+ id +'", '+ timeout +');', timeout);
		document.getElementById('game_panel_living_cells').value = get_living_cells( "game" );

	// if there are no more rounds left
	} else {
		// set game_timeout to false
		game_timeout = false;

		// switch stop button to start button
		document.getElementById(id+'_panel_start').value  = 'start';
		document.getElementById(id+'_panel_start').setAttribute( "onclick", "javascript: step_loop( 'game', document.getElementById('game_panel_timeout').value, document.getElementById('game_panel_rounds').value );" );

		// if player is in riddle mode we have to check
		// wheter the level was passed or failed
		if( game_active_level !== false ) {
			check_level();
		
		}
	}

}
// this function randomizes the cells on the playing field
function randomize_cells(id) {
	reset_cells(id);
	for( var i = 1; i <= game_fields; i++ ) {	
		if( ( Math.random() * 100 ) > ( Math.random() * 20 + 70 ) ) {
			var cell = document.getElementById( id +"_td_"+ i );
			switch_td_state( cell );
		}

	}

	alert('Cells have been randomized.');
	
}
// this function resets all cells to be inactive
function reset_cells(id) {
	for( var i = 1; i <= game_fields; i++ ) {	
		document.getElementById( id +"_td_"+ i ).className = "fgu";

	}
	
	alert('All cells have been resetted.');

}
// this function returns the count of living cells
function get_living_cells(id) {
	var count = 0;
	for( var i = 1; i <= game_fields; i++ ) {	
		if( document.getElementById( id +"_td_"+ i ).className == "fgc" ) {
			count++;
		}

	}
	return count;
	
}
// this function returns the coordinates of all active cells
function get_living_cell_coordinates() {
	var count = 0;
	var cells = new Array();
	for( var i = 1; i <= game_fields; i++ ) {	
		if( document.getElementById( "game_td_"+ i ).className == "fgc" ) {
			cells[count++] = i;
		}

	}
	return cells;
	
}

// this function loads an level
// to start the game simply run this function with level 1
// eg: load_level(1);
function load_level(level) {
	// if the level is found, load it and apply it
	if( game_levels[(level-1)] != undefined ) {
		game_active_level = (level-1);
		// resize playing field
		var playing_field = draw_field("game", game_levels[game_active_level][0][0], game_levels[game_active_level][0][1]);
		document.getElementById('game').appendChild( playing_field );

		// activate cells
		for( var i in game_levels[game_active_level][1] ) {
			document.getElementById('game_td_' + game_levels[game_active_level][1][i] ).className = "fgc";

		}

		document.getElementById('game_panel_rounds').value         = game_levels[game_active_level][2];
		document.getElementById('game_panel_rounds').readOnly      = "readonly";
		document.getElementById('game_panel_clicks').value         = game_levels[game_active_level][3];
		document.getElementById('game_panel_level_goal').innerHTML = game_levels[game_active_level][5];
		document.getElementById('game_panel_active_level').value   = ( game_active_level + 1 );
		document.getElementById('game_panel_living_cells').value   = get_living_cells( "game" );

		alert('Level '+level+' loaded. Have Fun!');

		return true;

	// if the level is not found we display the game ends message
	} else {
		alert('Congratulation! You have mastered all challenges!<br />GAME OVER! <a href="javascript: void(0);" onclick="javascript: load_level(1);">Click here to restart this game!</a>');

		return false;

	}
}
function check_level() {
	if( game_levels[game_active_level] != undefined ) {
		if( game_levels[game_active_level][4]() ) {
			alert('Level '+( game_active_level +1 )+' has been solved! Congratulations!');
			window.setTimeout( "load_level( "+( game_active_level +2 )+" )", 2500 );

		} else {
			alert('You failed solving level '+( game_active_level +1 )+'! Try Again!');
			window.setTimeout( "load_level( "+( game_active_level +1 )+" )", 1500 );

		}

	} else {
		alert('There is an Error.');				
	}

	return;

}

function switch_mode( element ) {
	window.clearTimeout( game_timeout );
	game_active_level = false;
	game_timeout      = false;
	
	document.getElementById('game_panel_rounds').value = 100;

	var start_button = document.getElementById('game_panel_start');
	start_button.value = "start";
	start_button.setAttribute( "onclick", "javascript: step_loop( 'game', document.getElementById('game_panel_timeout').value, document.getElementById('game_panel_rounds').value );")

	if(true || element.value == "sandbox" ) {
		element.value = "riddle";
		document.getElementById('game_panel_menu_sandbox').style.display = 'inline';
		document.getElementById('game_panel_menu_riddle').style.display  = 'none';
		document.getElementById('game_panel_rounds').readOnly            = false;

		alert( "Switched to Sandbox-Mode!" );
	} else {
didi();
		element.value = "sandbox";

		document.getElementById('game_panel_menu_sandbox').style.display = 'none';
		document.getElementById('game_panel_menu_riddle').style.display  = 'inline';

		load_level(1);

	}

}
function set_message( msg ) {
	document.getElementById('game_message').innerHTML = msg;

}
function alert( msg ) {
	set_message( msg );

}

