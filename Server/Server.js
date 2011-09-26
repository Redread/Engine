var rd = require('../Shared/Redread.js').Redread;

rd.server = function() {
    return {
        onDisconnect: function() {},
        onMessage: function() {},
        objects: {},
        configs: {},
        playerCounter: 0,

        init: function(port) {
            port = rd.wsPort || port;

            var that = this;

            var io = require("socket.io").listen(port);
            io.set('log level', 2);
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
                        break;
                    }
                }
                
                socket.on('message', function(transport) {
                    transport = JSON.parse(transport);

                    //Getting the event sent
                    if (transport.type === 'keypressed') {
                        for (var id in that.objects) {
                            var obj = that.objects[id];
                            if (obj.player === socket.id) {
                                obj.triggerEvent(transport.name);
                            }
                        }
                    }

                    if (transport.type === 'wallHit') {
                        var obj = that.objects[transport.id];
                        obj.wallsHit = transport.walls;
                        obj.posY = obj.posY - transport.stepBack.top;
                        obj.posY = obj.posY - transport.stepBack.bottom;
                        obj.posX = obj.posX - transport.stepBack.left;
                        obj.posX = obj.posX - transport.stepBack.right;
                    }

                    that.onMessage();
                });

                socket.on('disconnect', function() {
                    var disconPlayer = socket.id;
                    
                    for(i in that.objects){
                        if (that.objects[i].player == disconPlayer){
                            that.objects[i].player = 0;
                            that.playerCounter--;
                            break;
                        }
                    }
                    that.onDisconnect();
                });

                //Main server loop
                setInterval(function() {
                    if (that.playerCounter === that.configs.players) {
                        socket.broadcast.send(JSON.stringify({
                            type: "gameUpdate",
                            objects: that.objects
                        }));
                    } else {
                        socket.broadcast.send(JSON.stringify({
                            type: "gameState",
                            name: "waiting"
                        }));
                    }
                }, 1000 / 12);
            });
        },

        addObjects: function() {
            var objects = Array.prototype.slice.call(arguments); //toArray
            for (var i = 0; i < objects.length; i++) {
                this.objects[objects[i].id] = objects[i];
            };
        },

		addConfiguration: function(configuration) {
			this.configs = configuration;
		}
    };
};

exports.Redread = rd;
