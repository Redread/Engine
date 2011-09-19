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
        // If text is a function, executes it and grabs its result
        if (typeof text == 'function') {
            text = text();
        };
        
        options = options || {};
        options = {
            font: options.font || '20pt sans-serif',
            x: options.x || '0',
            y: options.y || '20',
            color: options.color || '#eee',
            stroke: options.stroke || '1',
            position: options.position || '',
            textBaseline: options.textBaseline || 'alphabetic'
        };
        
        var ctx = Redread.drawContext;
        var oldctx = {
            fillStyle: ctx.fillStyle,
            strokeStyle: ctx.strokeStyle,
            lineWidth: ctx.lineWidth,
            font: ctx.font,
            textBaseline: ctx.textBaseline
        };

        ctx.fillStyle = options.color;
        ctx.font = options.font;
        // Ensures that lowercase p or q doesn't stay out of the box
        ctx.textBaseline = options.textBaseline;
        
        if (options.position) {
            var coords = this.parsePosition(text, options);
            options.x = coords.x;
            options.y = coords.y;
        };

        ctx.fillText(text, options.x, options.y);
        if (options.stroke > 0) {
            ctx.lineWidth = options.stroke;
            ctx.strokeText(text, options.x, options.y);
        }
        
        // Returning old values to context
        this.oldContext2Context(oldctx, ctx);
    },
    
    /**
     * Parses position just like in CSS. Only words allowed for now
     * Examples: 'top left', 'center', 'right bottom'
     */
    parsePosition: function(text, options){
        // Regex for matching position values
        var regexSingle = /^top|bottom|left|right|center$/,
            regexDouble = /^(top|bottom|center) (left|right|center)$/;

        if (regexSingle.test(options.pos) && regexDouble.test(options.pos)){
            throw new Error('Bad position "' + pos + '"');
        }

        var ctx = Redread.drawContext,
            pos = options.position,
            
            txtWidth = ctx.measureText(text).width,
            txtHeight = parseInt(options.font, 10),
            
            canvasWidth = ctx.canvas.width,
            canvasHeight = ctx.canvas.height,
            
            x = 0,
            y = txtHeight;
            
        // Todo: Fix double 'center'.
        if (pos == 'center center') {
            pos = 'center';
        };
        words = pos.split(' ');

        for(var i in words){
            switch(words[i]){
                case 'top':
                    y = txtHeight;
                    break;
                case 'bottom':
                    y = canvasHeight;
                    break;
                case 'left':
                    x = 0;
                    break;
                case 'right':
                    x = canvasWidth - txtWidth;
                    break;
                case 'center':
                    if(words.length === 1){
                        x = canvasWidth/2 - txtWidth/2;
                        y = canvasHeight/2 + txtHeight/2;
                    }
                    else if(i === 0) {
                        y = canvasHeight/2 - txtHeight/2;
                    }
                    else if(i === 1){
                        x = canvasWidth/2 - txtWidth/2;
                    }
                    break;
            }
        }
        
        return {x: x, y: y};
    }
};



