var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

var boo = Redread.gameObject(10, 10, 'boo', true);

boo.registerEvent('up', function() { this.posY -= 10; });
boo.registerEvent('down', function() { this.posY += 10; });
boo.registerEvent('left', function() { this.posX -= 10; });
boo.registerEvent('right', function() { this.posX += 10; });
boo.registerEvent('boo!', function() { console.log('space!', this.sprite); this.sprite.changeState(1); });

server.addObjects(boo);
server.addConfiguration({players: 1});

server.init();
