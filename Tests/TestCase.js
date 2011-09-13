var assert = require('assert');

var TestCase = {
    test: function(description, fn){
        try{
            fn();
            console.log('OK\t' + description);
        }
        catch(e){
            console.error('FAIL\t' + description + '\n  ' + e);
        }
    },
    assertEqual: function(){
        try{
            assert.equal(arguments.length >= 2, true);
        }
        catch(e){
            console.error("Error: assertEqual takes at least 2 arguments (" + arguments.length + ") provided.");
        }
        assert.equal(arguments[0], arguments[1]);
    },
    assertTrue: function(expr){
        this.assertEqual(expr, true);
    }
};
exports.TestCase = TestCase;
