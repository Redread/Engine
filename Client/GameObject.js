<<<<<<< HEAD
=======
var Redread = Redread || {};
>>>>>>> 225ea988dc6ea56302c2cbbf44ca5d3b266bc4f0
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

    // Function retrieves data from data property
    this.getData = function(key){
        var data = this.data[key];
        if (data === undefined){
            console.warn('Data for key ' + key + ' is undefined.');
            return null;
        }
        return data;
    };
    
    this.draw = function() {
        this.sprite.draw(this.posX, this.posY, this.currentState);
        //Chaining purposes
        return this;
    }
};

Redread.gameObjectText = function(text, options) {
    if (text == null) {
        text = '';
    }
    this.draw = function() {
        Redread.Drawing.text(text, options);
        //Chaining purposes
        return this;
    }
};
