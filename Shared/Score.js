/**
 * Score object 
 * 
 * 
 */
Redread.Score = function(){
    var value = 0;
    return {
        set: function(val){
            value = parseInt(val, 10);
            return this;
        },
        get: function(){
            return value;
        },
        add: function(val){
            value += parseInt(val, 10);
            return this;
        },
        save: function(){
            throw new Error("Unimplemented method");
        }
    };
};