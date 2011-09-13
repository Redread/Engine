var rd = require('../Shared/Redread.js').Redread;

rd.gameObject = function(posX, posY, sprite) {
    var currentState = 0;
    var events = {};
    posX = posX || 0;
    posY = posY || 0;
    sprite = sprite || null;

    return {
        onObjectHit: function(obj, hit, func) {
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

        draw: function() {
            sprite.draw(currentState, posX, posY);
            return this;
        },

        changeState: function(state) {
            currentState = state;
        }
    };
};

exports.Redread = rd;
