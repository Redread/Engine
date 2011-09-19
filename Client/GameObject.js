Redread.gameObject = function(sprite) {
    var currentState = 0;
    var sprite = sprite || null;
    
    return {
        //Chaining purposes
        draw: function(posX, posY) {
            sprite.draw(posX, posY);
            return this;
        }
    };
};
