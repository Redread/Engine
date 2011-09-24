var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

var leftPad = Redread.gameObject(10, 10, 'lefty');
var rightPad = Redread.gameObject(470, 10, 'righty');

leftPad.registerEvent('up', function() { this.posY -= 10; });
leftPad.registerEvent('down', function() { this.posY += 10; });
rightPad.registerEvent('up', function() { this.posY -= 10; });
rightPad.registerEvent('down', function() { this.posY += 10; });
server.addObjects(leftPad, rightPad);
server.init();
