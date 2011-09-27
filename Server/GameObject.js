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

    // Height of the object, informed by client
    this.height = 0;

    // Width of the object, informed by client
    this.width = 0;

    // Defines if current object is a player
    this.isPlayer = isPlayer || false;

    // Which walls the object currently hits
    this.wallsHit = {};

    // Player's connection ID (socket.id)
    this.player = 0;

    // Sprite's state
    this.currentState = 0;

    // -1: left, 1: right
    // -1: bottom, 1: top
    // 0: stopped
    this.direction = {
        horizontal: 0,
        vertical: 0
    }; 

    // Bound events
    this.events = {};

    // Attached data
    this.data = {};

    this.onTick = undefined;
    this.hitList = {}

    this.onObjectHit = function(obj, func) {
        this.hitList[obj.id] = func;
    },

    this.hit = function(objId) {;
        if (this.hitList[objId] !== undefined) {
            this.hitList[objId].apply(this);
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
        } else {
            console.warn("Error = event " + event + " not defined.");;
        }

        return this;
    },

    this.changeState = function(state) {;
        this.currentState = state;
    }
};

exports.Redread = Redread;
