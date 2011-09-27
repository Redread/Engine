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
    this.data1 = {score: 0};

    // Function retrieves data from data property
    this.getData = function(key){
        var data = this.data1[key];
        if (data === undefined){
            console.warn('Data for key ' + key + ' is undefined.');
            return null;
        }
        return data;
    };
    
    this.getScore = function(){
        console.log('data', this.data1);
        return this.data1.score;
    };
    
    this.draw = function() {
        this.sprite.draw(this.posX, this.posY, this.currentState);
        //Chaining purposes
        return this;
    };

    this.changeState = function(state) {
        this.currentState = state;
        this.width = this.sprite.states[this.currentState][2];
        this.height = this.sprite.states[this.currentState][3];
    };
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
