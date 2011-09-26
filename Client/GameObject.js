var Redread  = {};
Redread.gameObject = function(sprite, id) {
    // Name of the object
    this.id = id,

    // Sprite's state
    this.currentState = 0;

    // Horizontal position of the object in canvas
    this.posX = 0;

    // Vertical position of the object in canvas
    this.posY = 0;

    // Sprite object
    this.sprite = sprite || null;

    // Attached data
    this.data = {};

    this.draw = function() {
        this.sprite.draw(this.posX, this.posY, this.currentState);
        //Chaining purposes
        return this;
    }
};

Redread.gameObjectText = function(text, options) {
    this.draw = function() {
        Redread.Drawing.text(text, options);
        //Chaining purposes
        return this;
    }
};
