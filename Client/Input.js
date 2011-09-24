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
    keyList: {},
	addWasd: function(str){
		if((/WASD/).test(str)){
            this.keyList[Redread.KEYS.W] = 'up';
            this.keyList[Redread.KEYS.A] = 'left';
            this.keyList[Redread.KEYS.S] = 'down';
            this.keyList[Redread.KEYS.D] = 'right';
		}
	},
	addArrows: function(str){
		if((/ARROWS/).test(str)){
            this.keyList[Redread.KEYS.UP] = 'up';
            this.keyList[Redread.KEYS.LEFT] = 'left';
            this.keyList[Redread.KEYS.DOWN] = 'down';
            this.keyList[Redread.KEYS.RIGHT] = 'right';
		}
	},
	isAccelerometer: function(str){
		return (/ACCEL/).test(str);
	},
    send: function(eventString){
        if (eventString) {
            console.info("send ",eventString);
            Redread.send(JSON.stringify({type: 'keypressed', name: eventString}));
        }
    },
	bindDirectional: function(keySet, fn){
	    this.addWasd(keySet);
	    this.addArrows(keySet);
	    this.delegate();
	},
	bindKeys: function(obj){
	    for(var i in obj){
	        this.keyList[i] = obj[i];
	    }
	},
	delegate: function(){
	    var that = this;
	    if(this.keyList){
            console.log(that.keyList);
	        window.onkeydown = function(evt) {
                var eventString = that.keyList[evt.which] || null;
                if (eventString) {
                    that.send(eventString);
                };
            };
	    }
	}
};

// Redread.Input.bindDirectional('ARROWS,WASD');
// Redread.Input.bind(KEYS.SPACE);
