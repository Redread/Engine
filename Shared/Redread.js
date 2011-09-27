(function(exports) {
    var Redread = {
        wsPort: 9090,

        canvasEl: null,

        drawContext: null,

        objects: [],

        localObjects: [],
        
        debug: true,

        log: function(){
            this.debug && console.log.call(arguments);
        },

        //ClientSide initialization
        initClient: function(canvasId) {
            this.canvasEl = document.getElementById(canvasId);
            this.drawContext = this.canvasEl.getContext('2d');
        },

        start: function(func) {
            this.socket = io.connect('ws://' + document.location.hostname + ':' + this.wsPort);
            var that = this;

            this.socket.on('connect', function() {
                that.socket.send(JSON.stringify({
                    type: 'objInfo',
                    objects: that.objects
                }));

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
                                    if (that.objects[id] !== undefined) {
                                        that.objects[id][i] = objects[id][i];
                                    }
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
            
            for (var id in this.localObjects) {
                var obj = this.localObjects[id];
                obj.draw();
            }

            for (var id in this.objects) {
                var obj = this.objects[id];
                if (message.name !== 'waiting') {
                    obj.draw();
                }
                this.checkWallHit(obj);
                this.checkObjectHit(obj);
            }

            if (func !== undefined) {
                func.apply(this, [message]);
            }
        },

        //Object collision detection
        //based on: http://www.gamedev.net/page/resources/_/reference/programming/game-programming/collision-detection/collision-detection-r735
        checkObjectHit: function(obj) {
            for (var key in this.objects) {
                var testObj = this.objects[key];
                if (obj.id == testObj.id) {
                    continue;
                }

                var testW = testObj.sprite.states[testObj.currentState][2];
                var testH = testObj.sprite.states[testObj.currentState][3];
                var testCoord = {
                    left: testObj.posX,
                    right: testObj.posX + testW,
                    top: testObj.posY,
                    bottom: testObj.posY + testH
                };

                var width = obj.sprite.states[obj.currentState][2];
                var height = obj.sprite.states[obj.currentState][3];
                var coord = {
                    left: obj.posX,
                    right: obj.posX + width,
                    top: obj.posY,
                    bottom: obj.posY + height
                };
    
                var isHitting = false;
                if (testCoord.bottom < coord.top) {
                    continue;
                }

                if (testCoord.top > coord.bottom) {
                    continue;
                }

                if (testCoord.right < coord.left) {
                    continue;
                }

                if (testCoord.left > coord.right) {
                    continue;
                }

                this.send(JSON.stringify({
                    type: 'objHit',
                    id: obj.id,
                    hit: testObj.id
                }));
            };
        },

        //Wall collision detection
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

        //Adding objects to game
        addObjects: function() {
            var objects = Array.prototype.slice.call(arguments); //toArray
            for (var i in objects) {
                this.objects[objects[i].id] = objects[i];
            };
        },

        //Adding interface objects
        addLocalObjects: function() {
            var objects = Array.prototype.slice.call(arguments); //toArray
            this.localObjects = this.localObjects.concat(objects);
            console.log('Local objects: ', objects, this.localObjects);
        },
        
        mergeObjects: function(obj1, obj2){
            for (var attr in obj2) { obj1[attr] = obj2[attr]; }
            return obj1;
        }
    };

    exports.Redread = Redread;
})(typeof global === "undefined" ? window : exports);
