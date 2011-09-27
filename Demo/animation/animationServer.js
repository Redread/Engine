var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

var mario = new Redread.gameObject(50, 50, 'mario', true);

var flyTime = 2000;
var fallTime = 2000;
var lastTick = new Date().getTime();

mario.onTick = function() {
    var now = (new Date().getTime());

    if (this.direction.vertical === 1) {
        this.posY -= 3;
        if (now - lastTick > flyTime) {
            this.changeState(4);
        }
    }

    if (this.direction.vertical === -1) {
        this.posY += 3;
        if (now - lastTick > fallTime) {
            this.changeState(0);
        }
    }

    if (this.direction.horizontal === 0 &&
        this.direction.vertical === 0 &&
        !this.isDucked) {
        this.changeState(0);
    }

    lastTick = now;
    this.direction.horizontal = 0;
    this.isDucked = false;
};

mario.registerEvent('up', function() {
    this.changeState(3);
    this.direction.vertical = 1;
});

mario.registerEvent('down', function() {
    this.changeState(1);
    this.direction.vertical = 0;
    this.isDucked = true;
});

mario.registerEvent('left', function() {
    this.changeState(2);
    this.posX -= 2;
    this.direction.horizontal = -1;
});

mario.registerEvent('right', function() {
    this.changeState(2);
    this.posX += 2;
    this.direction.horizontal = 1;
});

server.addObjects(mario);
server.config({
    "players": 1
});
server.init();
