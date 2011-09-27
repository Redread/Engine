var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

var mario = new Redread.gameObject(50, 350, 'mario', true);

var flyTime = 15;
var fallTime = 15;
var lastTick = 0;

mario.onTick = function() {
    if (this.direction.vertical === 1) {
        this.posY -= 5;
        if (lastTick >= flyTime) {
            this.direction.vertical = -1;
            this.changeState(5);
            lastTick = 0;
        } else {
            lastTick++;
        }
    }

    if (this.direction.vertical === -1) {
        this.posY += 5;
        if (lastTick >= fallTime) {
            this.direction.vertical = 0;
            this.changeState(0);
            lastTick = 0;
        } else {
            lastTick++;
        }
    }

    if (this.direction.horizontal === 0 &&
        this.direction.vertical === 0 &&
        !this.isDucked) {
        this.changeState(0);
    }

    this.direction.horizontal = 0;
    this.isDucked = false;
};

mario.registerEvent('up', function() {
    this.changeState(4);
    if (this.direction.vertical == 0) {
        this.direction.vertical = 1;
    }
});

mario.registerEvent('down', function() {
    this.changeState(1);
    this.isDucked = true;
});

mario.registerEvent('left', function() {
    this.changeState(3);
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
