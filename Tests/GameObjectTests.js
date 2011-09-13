var assert = require('assert');
var rd = require('../Shared/GameObject.js').Redread;

var go = rd.gameObject();
/**
 * Existance
 */
assert.equal('object', typeof go);

/**
 * Key registration
 */
go.registerKeyEvent('w', function() {
    console.log('The key w was pressed');
})

go.triggerEvent('w');
