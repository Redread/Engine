(function(exports) {
    var Redread = {
        wsPort: 9090,

        canvasEl: null,

        drawContext: null,

        objects: {},
        
        debug: true,
        log: function(){
            this.debug && console.log.call(arguments);
        },

        initClient: function(canvasId) {
            this.canvasEl = document.getElementById(canvasId);
            this.drawContext = this.canvasEl.getContext('2d');
        },

        start: function(func) {
            this.socket = io.connect('http://' + document.location.hostname + ':' + this.wsPort);
            var that = this;
            this.socket.on('connect', function() {
                that.socket.on('message', function(message) {
                    message = JSON.parse(message);
                    switch (message.type) {
                        case "gameUpdate":
                            var objects = message.objects;
                            for (var id in objects) {
                                that.objects[id].posX = objects[id].posX;
                                that.objects[id].posY = objects[id].posY;
                                if(objects[id].currentState !== undefined){
                                    that.objects[id].currentState = objects[id].currentState;
                                }
                            }        
                            break;
                        case "gameState":
                            if (message.name === "waiting") {
                                /*var message = Redread.gameObjectText("Waiting for Players.", {
                                    position: 'center'
                                });
                                that.addObjects(message);*/
                                console.log("Waiting for players");
                            }
                            break;
                    }
                    that.mainLoop(func, message);
                });
            });
        },
        
        send:function(obj){
            // console.log(obj);
            this.socket.send(obj);
        },
        
        mainLoop: function(func, message) {
            //Clear for redraw
            this.drawContext.clearRect(
                0, 
                0, 
                this.canvasEl.width, 
                this.canvasEl.height
            );

            for (var id in this.objects) {
                var obj = this.objects[id];
                obj.draw();
            }

            if (func !== undefined) {
                func.apply(this, [message]);
            }
        },

        addObjects: function() {
            var objects = Array.prototype.slice.call(arguments); //toArray
            for (var i = 0; i < objects.length; i++) {
                this.objects[objects[i].id] = objects[i];
            };
        }
    };

    exports.Redread = Redread;
})(typeof global === "undefined" ? window : exports);
