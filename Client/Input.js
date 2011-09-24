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
    
	bindDirectional: function(keySet, fn){
	    if(isWasd(keySet)){
	        window.onkeydown = function(evt){
	            var switchObj = {};
	            switchObj[Redread.KEYS.W]: 'up';
                switchObj[Redread.KEYS.A]: 'left';
                switchObj[Redread.KEYS.S]: 'down';
                switchObj[Redread.KEYS.D]: 'right';
	            var eventString = Redread.Utils.select(evt.which, switchObj);
	            if (eventString) {
	                Redread.send({type: 'keypress', name: eventString});
	            }
	        };
	    }
	}
};


Redread.Input.bindDirectional('ARROWS,WASD,ACCEL', function(evt){
	if (evt.left) {};
	console.log(evt);
});

Redread.Input.bind(KEYS.SPACE, function(evt){
	console.log(evt);
});
