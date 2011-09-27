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
    P: 80,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57
};

Redread.Input = {
    MOTION_TOLERANCE: 3,
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
    addAccelerometer: function(str){
        var that = this;
        if((/ACCEL/).test(str)){
            // horizontal tilt first
        	window.ondevicemotion = function(event) {
        	    var eventString = null;
        		var ay = event.accelerationIncludingGravity.y;

        		if (Math.abs(ay) >= that.MOTION_TOLERANCE) {
        		    if (ay < 0) {
        		        eventString = 'right';
        		    }
        		    if (ay > 0) {
        		        eventString = 'left';
        		    }
        		    that.send(eventString);
        		};
    		};

            window.onkeydown = function(evt) {
                var eventString = that.keyList[evt.which] || null;
                if (eventString) {
                    that.send(eventString);
                    evt.preventDefault();
                };
            };
            
        }
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
        this.addAccelerometer(keySet);
        this.delegate();
    },
    bindKeys: function(obj){
        for(var i in obj){
            this.keyList[i] = obj[i];
        }
        this.delegate();
    },
    delegate: function(){
        var that = this;
        if(this.keyList){
            Redread.debug && console.log('Keylist', that.keyList);
            window.onkeydown = function(evt) {
                var eventString = that.keyList[evt.which] || null;
                if (eventString) {
                    that.send(eventString);
                    evt.preventDefault();
                };
            };
        }
    }
};

// Redread.Input.bindDirectional('ARROWS,WASD');
// Redread.Input.bind(KEYS.SPACE);
