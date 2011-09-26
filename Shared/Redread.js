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
            this.socket = io.connect('ws://' + document.location.hostname + ':' + this.wsPort);
            var that = this;

            this.socket.on('connect', function() {
                
                // When client receives a message from server
                that.socket.on('message', function(message) {
                    message = JSON.parse(message);
                    switch (message.type) {
                        
                        case "gameUpdate":
                            var objects = message.objects;

                            // Iterating over each object
                            for (var id in objects) {

                                // Passing every property from the remote objects to the local objects
                                for (var i in objects[id]) {
                                    that.objects[id][i] = objects[id][i];
                                };

                            }        
                            break;
                            
                        case "gameState":
                            if (message.name === "waiting") {
                                console.log("Waiting for players");
                            }
                            break;
                    }
                    that.mainLoop(func, message);
                });
            });
        },
        
        send: function(obj){
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
                this.checkWallHit(obj);
                this.checkObjectHit(obj);
            }

            if (func !== undefined) {
                func.apply(this, [message]);
            }
        },

        checkObjectHit: function(obj) {
            for (var key in this.objects) {
                var testObj = this.objects[key];
                if (obj.id == testObj.id) {
                    continue;
                }

                var testW = testObj.sprite.states[testObj.currentState][2];
                var testH = testObj.sprite.states[testObj.currentState][3];
                var testCoord = {
                    topLeft:     [ testObj.posX        , testObj.posY ],
                    topRight:    [ testObj.posX + testW, testObj.posY ],
                    bottomLeft:  [ testObj.posX        , testObj.posY + testH ],
                    bottomRight: [ testObj.posX + testW, testObj.posY + testH ]
                };
                var width = obj.sprite.states[obj.currentState][2];
                var height = obj.sprite.states[obj.currentState][3];
                var coord = {
                    topLeft:     [ obj.posX        , obj.posY ],
                    topRight:    [ obj.posX + width, obj.posY ],
                    bottomLeft:  [ obj.posX        , obj.posY + height ],
                    bottomRight: [ obj.posX + width, obj.posY + height ]
                };

            };
        },

        checkWallHit: function(obj) {
            var width = obj.sprite.states[obj.currentState][2];
            var height = obj.sprite.states[obj.currentState][3];
            var boundaries = {
                top: 0,
                left: 0,
                right: this.canvasEl.width,
                bottom: this.canvasEl.height
            };
            var walls = {
                top: false,
                bottom: false,
                left: false,
                right: false
            };
            //used for when the step goes after the wall
            var stepBack = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            };

            if (obj.posY <= boundaries.top) {
                walls.top = true;
                stepBack.top = obj.posY - boundaries.top;
            }

            if (obj.posY + height >= boundaries.bottom) {
                walls.bottom = true;
                stepBack.bottom = (obj.posY + height) - boundaries.bottom;
            }

            if (obj.posX <= boundaries.left) {
                walls.left = true;
                stepBack.left = obj.posX - boundaries.left;
            }

            if (obj.posX + width >= boundaries.right) {
                walls.right = true;
                stepBack.right = (obj.posX + width) - boundaries.right;
            }

            this.send(JSON.stringify({
                type: 'wallHit',
                id: obj.id,
                walls: walls,
                stepBack: stepBack
            }));
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
