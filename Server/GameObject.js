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
            //TODO: Colision detection Here
        },
        
        registerEvent: function(event, func) {
            this.events[event] = func;
            return this;
        },

        triggerEvent: function(event) {
            if (this.events[event] !== undefined) {
                this.events[event].apply(this);
            }
            else {
                console.warn("Error: event " + event + " not defined.");
            }
            return this;
        },

        changeState: function(state) {
            this.currentState = state;
        }
    };
};

exports.Redread = Redread;
