var assert = require('assert');
var rd = require('../Server/GameObject.js').Redread;

var go = rd.gameObject();
/**
 * Existance
 */
assert.equal('object', typeof go);

/**
 * Key registration
 */
go.registerEvent('w', function() {
    console.log('The key w was pressed');
})

go.triggerEvent('w');
