/**
 * Server.GameObject
 */
var Redread = require('../Shared/Redread.js').Redread;
Redread.gameObject = function(posX, posY, id, isPlayer) {
    return {
        // Name of the object
        id: id,
        
        // Horizontal position of the object in canvas
        posX: posX || 0,

        // Vertical position of the object in canvas
        posY: posY || 0,
<<<<<<< HEAD

        // Defines if current object is a player
        isPlayer: isPlayer || false,

        // Which walls does the object has to hit on
        wallsHit: {},

        // Player's connection ID
        player: 0,

        // Sprite's state
=======
        direction: 0, // -1: left, 0: stoped, 1: right
        isPlayer: false || isPlayer,
        wallsHit: {},
        player: 0, //Player id == socket.id
>>>>>>> 47e6ad4cb886faac96b82465f0ff333c897120b7
        currentState: 0,

        // Bound events
        events: {},
        onTick: undefined,
        hitList: {},

        onObjectHit: function(obj, func) {
            this.hitList[obj.id] = func;
        },

        hit: function(obj) {
            if (this.hitList[obj.id] !== undefined) {
                this.hitList[obj.id].apply(this);
            }
        },

        tick: function() {
            if (this.onTick !== undefined) {
                this.onTick.apply(this);
            }
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
