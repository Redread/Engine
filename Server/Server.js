var rd = require('../Shared/Redread.js').Redread;

rd.server = function() {
    var loop = null;

    return {
        onDisconnect: function() {},
        onMessage: function() {},
        objects: {},

        init: function(port) {
            port = rd.wsPort || port;

            var io = require("socket.io").listen(port);
            var that = this;

            io.sockets.on('connection', function(socket) {
                socket.on('message', function(transport) {
                    var transport = JSON.parse(transport);

                    //Getting the event sent
                    if (transport.type == 'keypressed') {
                        for (var id in that.objects) {
                            var obj = that.objects[id];
                            obj.triggerEvent(transport.name);
                        }
                    }

                    that.onMessage();
                });

                socket.on('disconnect', that.onDisconnect);

                //Main server loop
                setInterval(function() {
                    socket.send(JSON.stringify(that.objects));
                }, 1000 / 60);
            });
        },

        addObjects: function() {
            var objects = Array.prototype.slice.call(arguments); //toArray
            for (var i = 0; i < objects.length; i++) {
                this.objects[objects[i].id] = objects[i];
            };
        }
    };
};

exports.Redread = rd;
