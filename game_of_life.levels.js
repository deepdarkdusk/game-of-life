var game_levels = new Array(
	new Array(
		// width / height
		new Array( 200, 200 ),
		// active cells
		new Array( ),
		// level rounds
		5,
		// allowed clicks
		1,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 4; },
		// human readable level description
		"exactly 4 active cells after 5 rounds"
	),
	new Array(
		// width / height
		new Array( 30, 30 ),
		// active cells
		new Array( 340,341,342,343,344,369,375,398,406 ),
		// level rounds
		10,
		// allowed clicks
		2,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 0; },
		// human readable level description
		"no active cells after 10 rounds"
	),
	new Array(
		// width / height
		new Array( 30, 30 ),
		// active cells
		new Array( 340,341,342,343,344,369,375,398,406 ),
		// level rounds
		10,
		// allowed clicks
		2,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 8; },
		// human readable level description
		"exactly 8 active cells after 10 rounds"
	),
	new Array(
		// width / height
		new Array( 30, 30 ),
		// active cells
		new Array( 282,286,312,316,342,344,346,372,376 ),
		// level rounds
		30,
		// allowed clicks
		2,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 8; },
		// human readable level description
		"exactly 8 active cells after 30 rounds"
	),
	new Array(
		// width / height
		new Array( 30, 30 ),
		// active cells
		new Array( 32,58,59,62,839,842,843,869 ),
		// level rounds
		3,
		// allowed clicks
		4,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 9; },
		// human readable level description
		"exact 9 active cells after 3 rounds"
	),
	new Array(
		// width / height
		new Array( 10, 10 ),
		// active cells
		new Array( 28,29,30 ),
		// level rounds
		35,
		// allowed clicks
		2,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 4; },
		// human readable level description
		"exactly 4 active cells after 35 rounds"
	),
	new Array(
		// width / height
		new Array( 30, 30 ),
		// active cells
		new Array( 30,59,842,871 ),
		// level rounds
		40,
		// allowed clicks
		6,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 80; },
		// human readable level description
		"exactly 80 active cells after 40 rounds"
	),
	new Array(
		// width / height
		new Array( 40, 40 ),
		// active cells
		new Array(
			496,500,501,502,503,504,536,540,576,580,616,620,656,657,658,659,
			660,661,662,663,664,700,704,740,744,780,784,816,817,818,819,820,824
		),
		// level rounds
		20,
		// allowed clicks
		1,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 18; },
		// human readable level description
		"exactly 18 active cells after 20 rounds"
	),
	new Array(
		// width / height
		new Array( 30, 30 ),
		// active cells
		new Array( 340,341,342,343,344,369,375,398,401,406,428,436,459,465,490,491,492,493,494 ),
		// level rounds
		10,
		// allowed clicks
		2,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 15; },
		// human readable level description
		"exactly 15 active cells after 10 rounds"
	),
	new Array(
		// width / height
		new Array( 50, 30 ),
		// active cells
		new Array( 
			120,121,122,123,124,168,169,170,174,175,176,217,227,267,277,316,328,366,378,416,428,467,468,469,475,476,477,
			519,525,567,569,575,577,617,619,620,621,622,623,624,625,627,667,677,717,718,719,720,721,722,723,724,725,726,727
		),
		// level rounds
		10,
		// allowed clicks
		10,
		// living cells level goal check function 
		function() { return get_living_cells('game') < 80; },
		// human readable level description
		"less than 80 active cells after 10 rounds"
	),
	new Array(
		// width / height
		new Array( 16, 16 ),
		// active cells
		new Array(
			18,19,24,25,30,31,34,47,52,54,59,61,69,76,84,86,91,93,114,120,121,127,130,136,
			137,143,164,166,171,173,181,188,196,198,203,205,210,223,226,227,232,233,238,239
		),
		// level rounds
		8,
		// allowed clicks
		9,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 24; },
		// human readable level description
		"exactly 24 active cells after 8 rounds"
	),
	new Array(
		// width / height
		new Array( 16, 16 ),
		// active cells
		new Array( 16,31,46,47,48,120,121,136,137,209,210,211,226,241 ),
		// level rounds
		20,
		// allowed clicks
		2,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 4; },
		// human readable level description
		"exactly 4 active cells after 20 rounds"
	),
	new Array(
		// width / height
		new Array( 16, 16 ),
		// active cells
		new Array( 16,31,46,47,48,120,121,136,137,209,210,211,226,241 ),
		// level rounds
		20,
		// allowed clicks
		2,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 46; },
		// human readable level description
		"exactly 46 active cells after 20 rounds"
	),
	// final level
	new Array(
		// width / height
		new Array( 70, 20 ),
		// active cells
		new Array(
			5,6,7,11,12,16,20,23,24,25,74,80,83,86,87,89,90,93,144,146,147,150,151,152,153,156,158,160,163,164,214,217,220,223,226,
			230,233,285,286,287,290,293,296,300,303,304,305,873,874,878,882,885,886,887,890,891,897,942,945,948,952,955,960,962,967,
			1012,1015,1019,1021,1025,1026,1030,1031,1037,1082,1085,1089,1091,1095,1100,1102,1153,1154,1160,1165,1166,1167,1170,1172
		),
		// level rounds
		15,
		// allowed clicks
		1,
		// living cells level goal check function 
		function() { return get_living_cells('game') == 86; },
		// human readable level description
		"exact 86 active cells after 15 rounds"
	)
);
