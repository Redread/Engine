var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

var leftPad = new Redread.gameObject(10, 100, 'lefty', true);
var rightPad = new Redread.gameObject(470, 100, 'righty', true);
var ball = new Redread.gameObject(250, 150, 'ball');
ball.direction.horizontal = (Math.random() > 0.5) ? 1 : -1;
var ballSpeed = 3;
ball.onTick = function() {
    if (this.direction.horizontal === 1) {
        this.posX += ballSpeed;
    } else if (this.direction.horizontal === -1) {
        this.posX -= ballSpeed;
    }

    if (this.wallsHit.top || this.wallsHit.bottom) {
        this.direction.vertical *= -1; //reverse
    }

    if (this.direction.vertical === 1) {
        this.posY -= ballSpeed;
    } else if (this.direction.vertical === -1) {
        this.posY += ballSpeed;
    }
};

ball.onObjectHit(leftPad, function() {
    this.direction.horizontal = 1;

    var leftCenter = (leftPad.posY + leftPad.height) / 2;
    var ballCenter = (ball.posY + ball.height) / 2;
    if (ballCenter > leftCenter) {
        this.direction.vertical = -1;
    } else {
        this.direction.vertical = 1;
    }
});

ball.onObjectHit(rightPad, function() {
    this.direction.horizontal  = -1;

    var rightCenter = (rightPad.posY + rightPad.height) / 2;
    var ballCenter = (ball.posY + ball.height) / 2;
    if (ballCenter > rightCenter) {
        this.direction.vertical = -1;
    } else {
        this.direction.vertical = 1;
    }
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
