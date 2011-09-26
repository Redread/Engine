Redread.gameObject = function(sprite, id) {
    return {
        // Name of the object
        id: id,

        // Sprite's state
        currentState: 0,

        // Horizontal position of the object in canvas
        posX: 0,

        // Vertical position of the object in canvas
        posY: 0,

        // Sprite object
        sprite: sprite || null,

        // Attached data
        data: {},

        draw: function() {
            this.sprite.draw(this.posX, this.posY, this.currentState);
            //Chaining purposes
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
