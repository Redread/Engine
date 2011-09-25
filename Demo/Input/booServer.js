var Redread = require('../../Server/GameObject.js').Redread;
var server = require('../../Server/Server.js').Redread.server();

var boo = Redread.gameObject(10, 10, 'boo', true);

function isBoo (state) {
    return !(state % 0);
}

boo.registerEvent('up', function() { this.posY -= 10; });
boo.registerEvent('down', function() { this.posY += 10; });
boo.registerEvent('left', function() {
    if (this.currentState < 2) {
        this.currentState += 2;
    };
    this.posX -= 10;
});
boo.registerEvent('right', function() { 
    if(this.currentState >= 2){
        this.currentState -= 2;
    }
    this.posX += 10;
});
boo.registerEvent('boo!', function() {
    
    if (isBoo(this.currentState)){
        this.currentState--;
    }
    else{
        this.currentState++;
    }
    
});

server.addObjects(boo);
server.addConfiguration({players: 1});


server.init();
