/**
 * Drawing object
 * 
 * 
 */
Redread.Drawing = {
    Position: {},
    Direction: {},
    Angle: {},
    
    oldContext2Context: function(oldctx, ctx){
        for(x in oldctx){
            ctx[x] = oldctx[x];
        }
    },
    text: function(text, options){
        options = options || {};
        options = {
            font: options.font || '50pt Impact',
            x: options.x || '0',
            y: options.y || '0',
            color: options.color || '#eee',
            stroke: options.stroke || '1'
        };
        
        var ctx = Redread.drawContext;
        var oldctx = {
            fillStyle: ctx.fillStyle,
            strokeStyle: ctx.strokeStyle,
            lineWidth: ctx.lineWidth,
            font: ctx.font
        };
        console.log("measure text: ", ctx.measureText(text));

        ctx.fillStyle = options.color;
        ctx.font = options.font;
        console.log("ctx: ", ctx);

        ctx.fillText(text, options.x, options.y);
        if (options.stroke > 0) {
            ctx.lineWidth = options.stroke;
            ctx.strokeText(text, options.x, options.y);
        }
        
        // Returning old values to context
        this.oldContext2Context(oldctx, ctx);
    }
};



