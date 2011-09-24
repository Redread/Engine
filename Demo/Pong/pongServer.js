var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

//posX, posY, identification, isPlayerObject
var leftPad = Redread.gameObject(10, 10, 'lefty', true);
var rightPad = Redread.gameObject(470, 10, 'righty', true);

leftPad.registerKeyEvent('up', function() { this.posY -= 10; });
leftPad.registerKeyEvent('down', function() { this.posY += 10; });
rightPad.registerKeyEvent('up', function() { this.posY -= 10; });
rightPad.registerKeyEvent('down', function() { this.posY += 10; });
server.addConfiguration({
    "players": 2
});
server.addObjects(leftPad, rightPad);
server.init();
