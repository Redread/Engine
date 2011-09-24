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
		return (/WASD/).test(str);
	},
	isArrows: function(str){
		return (/ARROWS/).test(str);
	},
	isAccelerometer: function(str){
		return (/ACCEL/).test(str);
	},
    send: function(eventString){
        console.info(eventString);
        if (eventString) {
            Redread.send({type: 'keypress', name: eventString});
        }
    },
	bindDirectional: function(keySet, fn){
	    var that = this;
	    if(isWasd(keySet) || isArrows(keySet)){
            var funKeyboard = function(evt) {
                var switchObj = {};
                if(isWasd(keySet)){
                    switchObj[Redread.KEYS.W] = 'up';
                    switchObj[Redread.KEYS.A] = 'left';
                    switchObj[Redread.KEYS.S] = 'down';
                    switchObj[Redread.KEYS.D] = 'right';
                }
                if(isArrows(keySet)){
                    switchObj[Redread.KEYS.UP] = 'up';
                    switchObj[Redread.KEYS.LEFT] = 'left';
                    switchObj[Redread.KEYS.DOWN] = 'down';
                    switchObj[Redread.KEYS.RIGHT] = 'right';
                }
                var eventString = Redread.Utils.select(evt.which, switchObj) || null;
                that.send(eventString);
            };
	        window.onkeydown = function(evt){};
	    }
	}
};

Redread.Input.bindDirectional('ARROWS,WASD,ACCEL');
Redread.Input.bind(KEYS.SPACE);
