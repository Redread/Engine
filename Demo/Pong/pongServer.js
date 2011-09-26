var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

var leftPad = Redread.gameObject(10, 10, 'lefty', true);
var rightPad = Redread.gameObject(470, 10, 'righty', true);

leftPad.registerEvent('up', function() {
    if (this.wallsHit.top === false) {
        this.posY -= 8;
    }
});
leftPad.registerEvent('down', function() {
    if (this.wallsHit.bottom === false) {
        this.posY += 8;
    }
});
rightPad.registerEvent('up', function() { 
    if (this.wallsHit.top === false) {
        this.posY -= 8; 
    }
});
rightPad.registerEvent('down', function() {
    if (this.wallsHit.bottom === false) {
        this.posY += 8;
    }
});
server.addObjects(leftPad, rightPad);
server.addConfiguration({
    "players": 2
});
server.init();
