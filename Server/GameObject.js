var Redread = require('../Shared/Redread.js').Redread;
Redread.gameObject = function(posX, posY) {
    var currentState = 0;
    var events = {};
    posX = posX || 0;
    posY = posY || 0;

    return {
        onObjectHit: function(obj, func) {
            //TODO: Colission detection Here
            //Exeute func
        },
        
        registerKeyEvent: function(event, func) {
            events[event] = func;
            return this;
        },

        triggerEvent: function(event) {
            events[event].apply(this);
            return this;
        },

        changeState: function(state) {
            currentState = state;
        }
    };
};

exports.Redread = Redread;
