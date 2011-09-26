var Redread = Redread || {};
Redread.gameObject = function(sprite, id) {
    // Name of the object
    this.id = id;

    // Sprite's state
    this.currentState = 0;

    // Horizontal position of the object in canvas
    this.posX = 0;

    // Vertical position of the object in canvas
    this.posY = 0;

    // Sprite object
    this.sprite = sprite;

    this.width = sprite.states[this.currentState][2];

    this.height = sprite.states[this.currentState][3];

    // Attached data
    this.data = {};

    this.draw = function() {
        this.sprite.draw(this.posX, this.posY, this.currentState);
        //Chaining purposes
        return this;
    };

    this.changeState = function(state) {
        this.currentState = state;
        this.width = sprite.states[this.currentState][2];
        this.height = sprite.states[this.currentState][3];
    }
};

Redread.gameObjectText = function(text, options) {
    this.draw = function() {
        Redread.Drawing.text(text, options);
        //Chaining purposes
        return this;
    }
};
