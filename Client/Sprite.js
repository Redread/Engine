/**
 * Sprite object 
 *
 * @param states Array of states, representing the possible object states on the image
 * ex.:
 * [
 * [x, y, width, height, space, quantity] //This is state 0
 * ]
 * @param image Image file to use
 */
Redread.sprite = function(states, imagePath) {
    var states = states;
    var image = new Image();
    image.src = imagePath;
    var ctx = Redread.drawContext;
    
    return {
        currentFrame: 0,

        /**
         * Drawing function
         *
         * @param state Which state to draw on the canvas
         * @param posX What is the X position to be drawn on the canvas
         * @param posY What is the Y position to be drawn on the canvas
         */
        draw: function(state, posX, posY) {
            var drawingState = states[state];
            var spriteX = drawingState[0];
            var spriteY = drawingState[1];
            var spriteW = drawingState[2];
            var spriteH = drawingState[3];
            var spriteSpace = drawingState[4];
            var stateQuantity = drawingState[5]

            //TODO: This should not be here, should be done before.
            image.onload = function() {
                ctx.drawImage(
                    image, spriteX, spriteY, spriteW, spriteH, posX, posY, spriteW, spriteH
                );
            };
        }
    }
};
