var Redread = require('../Shared/Redread.js').Redread;
Redread.gameObject = function(posX, posY, id, isPlayer) {
    var currentState = 0;
    var events = {};

    return {
        id: id,
        posX: posX || 0,
        posY: posY || 0,
        isPlayer: false || isPlayer,
        player: 0,

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
