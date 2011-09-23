var rd = require('../Server/Server.js').Redread;

/**
 * Test the server construction
 */
var server = rd.server();
server.onMessage = function(message) {
    console.log('message received');
};

server.onDisconnect = function() {
    console.log('Disconnected');
};

server.init();
