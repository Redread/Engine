/**
 * Server.GameObject
 */
var Redread = require('../Shared/Redread.js').Redread;
Redread.gameObject = function(posX, posY, id, isPlayer) {
    return {
        id: id,
        posX: posX || 0,
        posY: posY || 0,
        direction: 0, //0 - stoped, 1 - right, -1 - left
        isPlayer: false || isPlayer,
        wallsHit: {},
        player: 0, //Player id == socket.id
        currentState: 0,
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
