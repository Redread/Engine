var rd = require('../Shared/Redread.js').Redread;

rd.server = function() {
    return {
        //User defined functions
        onDisconnect: function() {},
        onMessage: function() {},
        //gameObject list
        objects: {},
        //Game configuration
        configs: {},
        //Players currently pariticpating
        playerCounter: 0,

        interval: null,

        initialGameState: null,

        init: function(port) {
            port = rd.wsPort || port;

            var that = this;
            this.initialGameState = this.clone(this.objects);

            var io = require("socket.io").listen(port);
            io.set('log level', 2); //Info only

            io.sockets.on('connection', function(socket) {
                //Assigns a player number to player object
                for (var id in that.objects) {
                    if (that.configs.players <= that.playerCounter) {
                        break;
                    }
                    
                    var obj = that.objects[id];
                    if (obj.player == 0 && obj.isPlayer == true) {
                        that.playerCounter++;
                        obj.player = socket.id;
                        that.initialGameState[id].player = socket.id;
                        break;
                    }
                }
                
                socket.on('message', function(transport) {
                    transport = JSON.parse(transport);

                    //Getting the event sent
                    switch(transport.type) {
                        case 'keypressed':
                            for (var id in that.objects) {
                                var obj = that.objects[id];
                                if (obj.player === socket.id) {
                                    obj.triggerEvent(transport.name);
                                }
                            }
                            break;

                        case 'wallHit':
                            var obj = that.objects[transport.id];
                            obj.wallsHit = transport.walls;
                            /*
                            obj.posY = obj.posY - transport.stepBack.top;
                            obj.posY = obj.posY - transport.stepBack.bottom;
                            obj.posX = obj.posX - transport.stepBack.left;
                            obj.posX = obj.posX - transport.stepBack.right;*/
                            break;

                        case 'objHit':
                            var obj = that.objects[transport.id];
                            obj.hit(transport.hit);
                            break;

                        case 'objInfo':
                            var clientObjects = transport.objects;
                            for (var key in clientObjects) {
                                var client = clientObjects[key];
                                that.objects[client.id].width = client.width;
                                that.objects[client.id].height = client.height;
                            };
                            break;

                        default:
                            console.warn('Unknow transport received, of type: ' + transport.type);
                            break;
                    }

                    that.onMessage();
                });

                //Removing player
                socket.on('disconnect', function() {
                    var disconPlayer = socket.id;
                    
                    for (i in that.objects) {
                        if (that.objects[i].player == disconPlayer){
                            that.objects[i].player = 0;
                            that.initialGameState[i].player = 0;
                            that.playerCounter--;
                            break;
                        }
                    }

                    if (that.playerCounter < that.configs.players) {
                        that.gameReset();
                    }

                    that.onDisconnect();
                });
            });

            //Main server loop
            this.interval = setInterval(function() {
                if (that.playerCounter === that.configs.players) {
                    for (var key in that.objects) {
                        var obj = that.objects[key];
                        obj.tick();
                    };

                    io.sockets.send(JSON.stringify({
                        type: "gameUpdate",
                        objects: that.objects
                    }));
                } else {
                    io.sockets.send(JSON.stringify({
                        type: "gameState",
                        name: "waiting"
                    }));
                }
            }, 1000 / 30);
        },

        gameReset: function() {
            this.objects = this.clone(this.initialGameState);
        },

        //Simplified version of the code found on
        //http://stackoverflow.com/questions/728360/copying-an-object-in-javascript/728694#728694
        clone: function(obj) {
            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            // Handle Array
            if (obj instanceof Array) {
                var copy = [];
                for (var i = 0; i < obj.length; ++i) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }

            // Handle Object
            if (obj instanceof Object) {
                var copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        copy[attr] = this.clone(obj[attr]);
                    }
                }
                return copy;
            }
        },

        addObjects: function() {
            var objects = Array.prototype.slice.call(arguments); //toArray
            for (var i = 0; i < objects.length; i++) {
                this.objects[objects[i].id] = objects[i];
            };
        },

		config: function(configuration) {
			this.configs = configuration;
		}
    };
};

exports.Redread = rd;
