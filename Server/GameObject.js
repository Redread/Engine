/**
 * Server.GameObject
 */
var Redread = require('../Shared/Redread.js').Redread;
Redread.gameObject = function(posX, posY, id, isPlayer) {
    return {
        id: id,
        posX: posX || 0,
        posY: posY || 0,
        isPlayer: false || isPlayer,
        player: 0,
        currentState: 0,
        events: {},

        onObjectHit: function(obj, func) {
            //TODO: Colission detection Here
            //Exeute func
        },
        
        registerEvent: function(event, func) {
            this.events[event] = func;
            return this;
        },

        triggerEvent: function(event) {
            this.events[event].apply(this);
            return this;
        },

        changeState: function(state) {
            this.currentState = state;
        }
    };
};

exports.Redread = Redread;
