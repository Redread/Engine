Redread.gameObject = function(sprite, id) {
    return {
        currentState: 0,
        sprite: sprite || null,
        posX: 0,
        posY: 0,
        id: id,
        //Chaining purposes
        draw: function() {
            this.sprite.draw(this.posX, this.posY, this.currentState);
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
