var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

var leftPad = Redread.gameObject(10, 100, 'lefty', true);
var rightPad = Redread.gameObject(470, 100, 'righty', true);
var ball = Redread.gameObject(250, 150, 'ball');
ball.direction = (Math.random() > 0.5) ? 1 : -1;
ball.onTick = function() {
    if (this.direction === 1) {
        this.posX += 1;
    } else if (this.direction === -1) {
        this.posX -= 1;
    }
};

ball.onObjectHit(leftPad, function() {
    this.direction = 1;
});

ball.onObjectHit(rightPad, function() {
    this.direction = -1;
});

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
server.addObjects(leftPad, rightPad, ball);
server.config({
    "players": 2
});
server.init();
