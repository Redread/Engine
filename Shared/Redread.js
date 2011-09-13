var Redread = {
    canvasEl: null,

    drawContext: null,

    initClient: function(canvasId) {
        this.canvasEl = document.getElementById(canvasId);
        this.drawContext = this.canvasEl.getContext('2d');
    }
};
exports.Redread = Redread;
