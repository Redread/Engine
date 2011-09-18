(function(exports) {
    var Redread = {
        canvasEl: null,

        drawContext: null,

        objects: [],

        initClient: function(canvasId) {
            this.canvasEl = document.getElementById(canvasId);
            this.drawContext = this.canvasEl.getContext('2d');
        },

        start: function(func) {
            var animate = window.requestAnimationFrame || 
                          window.webkitRequestAnimationFrame || 
                          window.mozRequestAnimationFrame    || 
                          window.oRequestAnimationFrame      || 
                          window.msRequestAnimationFrame     || 
                          function(callback) {
                              window.setTimeout(callback, 1000 / 60);
                          };

            this.mainLoop(animate, func);
        },

        mainLoop: function(frameReq, func) {
            var that = this;
            frameReq(function() {
                //Clear for redraw
                that.drawContext.clearRect(
                    0, 
                    0, 
                    that.canvasEl.width, 
                    that.canvasEl.height
                );

                //Get data from server and update objects
                //TODO: Testing only
                for (var i = 0; i < that.objects.length; i++) {
                    var obj = that.objects[i];
                    obj.draw(
                        obj.posX,
                        obj.posY
                    );
                }

                func.apply(that);
                that.mainLoop(frameReq, func);
            });
        },

        addObjects: function() {
            this.objects = Array.prototype.slice.call(arguments); //toArray
        }
    };

    exports.Redread = Redread;
})(typeof global === "undefined" ? window : exports);
