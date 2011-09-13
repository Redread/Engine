var rd = require('../Shared/Redread.js').Redread;

rd.Score = function(){
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
        }
    };
};
exports.Redread = rd;