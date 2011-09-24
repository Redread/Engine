(function(exports) {
    var Redread = {
        wsPort: 9090,

        canvasEl: null,

        drawContext: null,

        objects: {},
        
        debug: false,
        log: function(){
            this.debug && console.log.call(arguments);
        },

        initClient: function(canvasId) {
            this.canvasEl = document.getElementById(canvasId);
            this.drawContext = this.canvasEl.getContext('2d');
        },

        start: function(func) {
            this.socket = io.connect('http://localhost:' + this.wsPort);
            var that = this;
            this.socket.on('connect', function() {
                that.socket.on('message', function(objects) {
                    objects = JSON.parse(objects);
                    for (var id in objects) {
                        that.objects[id].posX = objects[id].posX;
                        that.objects[id].posY = objects[id].posY;
                    }
                    that.mainLoop(func);
                });
            });
        },
        send:function(obj){
            console.log(obj);
            this.socket.send(obj);
        },
        mainLoop: function(func) {
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
                func.apply(this);
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
