var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

var boo = Redread.gameObject(10, 10, 'boo');

boo.registerKeyEvent('up', function() { this.posY -= 10; });
boo.registerKeyEvent('down', function() { this.posY += 10; });
boo.registerKeyEvent('left', function() { this.posX -= 10; });
boo.registerKeyEvent('right', function() { this.posX += 10; });
boo.registerKeyEvent('space', function() { this.posX += 10; });

server.addObjects(boo);

server.init();
