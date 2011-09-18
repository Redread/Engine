var assert = require('assert');

var TestCase = {
    failed: 0,
    passed: 0,
    test: function(description, fn){
        try{
            fn();
            this.passed++;
            console.log('OK\t' + description);
        }
        catch(e){
            this.failed++;
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
    },
    summary: function(){
        console.info("========= " + this.failed + " failed, " + this.passed + " passed. " + (this.failed + this.passed) + " total =========");
    }
};
exports.TestCase = TestCase;
