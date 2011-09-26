/**
* Server.GameObject
*/
var Redread = require('../Shared/Redread.js').Redread;
Redread.gameObject = function(posX, posY, id, isPlayer) {
    // Name of the object
    this.id = id;

    // Horizontal position of the object in canvas
    this.posX = posX || 0;

    // Vertical position of the object in canvas
    this.posY = posY || 0;

    // Defines if current object is a player
    this.isPlayer = isPlayer || false;

    // Which walls does the object has to hit on
    this.wallsHit = {};

    // Player's connection ID (socket.id)
    this.player = 0;

    // Sprite's state
    this.currentState = 0;

    // -1: left, 0 = stoped; 1: right
    this.direction = 0; 

    // Bound events
    this.events = {};

    // Attached data
    this.data = {};

    this.onTick = undefined;
    this.hitList = {};

    this.onObjectHit = function(obj, func) {
        this.hitList[obj.id] = func;
    },

    this.hit = function(obj) {;
        if (this.hitList[obj.id] !== undefined) {
            this.hitList[obj.id].apply(this);
        }
    },

    this.tick = function() {;
        if (this.onTick !== undefined) {
            this.onTick.apply(this);
        }
    },

    this.registerEvent = function(event, func) {
        this.events[event] = func;
        return this;
    },

    this.unregisterEvent = function(event){;
        delete this.events[event];
    },

    this.triggerEvent = function(event) {;
        if (this.events[event] !== undefined) {
            this.events[event].apply(this);
        }
        else {
            this.console.warn("Error = event " + event + " not defined.");;
        }
        return this;
    },

    this.changeState = function(state) {;
        this.currentState = state;
    }
};

exports.Redread = Redread;
