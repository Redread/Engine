/**
 *	
*/
Redread = Redread || {};

Redread.KEYS = {
	SPACE: 32,
	ENTER: 13,
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	W: 87,
	A: 65,
	S: 83,
	D: 68,
	P: 80
};

Redread.Input = {
	isWasd: function(str){
		return /WASD/.test(str);
	},
	isArrows: function(str){
		return /ARROWS/.test(str);
	},
	isAccelerometer: function(str){
		return /ACCEL/.test(str);
	},
	bind: function(key, fn){}
};


Redread.Input.bind('ARROWS', function(evt){
	var speed = 20;
	if (evt.left) {};
	console.log(evt);
});

Redread.Input.bind(KEYS.SPACE, function(evt){
	console.log(evt);
});
