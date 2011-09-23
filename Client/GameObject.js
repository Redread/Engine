Redread.gameObject = function(sprite, id) {
    var currentState = 0,
        sprite = sprite || null,
        posX = 0,
        posY = 0;
        
    return {
        id: id,
        //Chaining purposes
        draw: function() {
            sprite.draw(this.posX, this.posY);
            return this;
        }
    };
};

Redread.gameObjectText = function(text, options) {
    return {
        //Chaining purposes
        draw: function() {
            Redread.Drawing.text(text, options);
            return this;
        }
    };
};
