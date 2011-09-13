var rd = require('../Shared/Redread.js').Redread;

rd.server = function() {
    return {
        onDisconnect: null,
        onMessage: null,

        init: function(port) {
            console.log("Starting Redread server on " + port);
            var socket = require("socket.io").listen(port);
            var that = this;

            socket.sockets.on('connection', function(socket) {
                socket.on('message', that.onMessage);
                socket.on('disconnect', that.onDisconnect);
            });
        }
    };
};

exports.Redread = rd;
