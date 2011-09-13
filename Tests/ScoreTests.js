var TestCase = require('./TestCase.js').TestCase;
var rd = require('../Shared/Score.js').Redread;

var tc = TestCase;

console.info('======= ScoreTests.js =======');

tc.test("Initial state of Score object", function(){
    var score = rd.Score();
    tc.assertEqual(score.get(), 0);
});

tc.test("Incrementing score", function(){
    var score = rd.Score();
    score.add(5);
    tc.assertEqual(score.get(), 5);
});

tc.test("Incrementing score should not consider decimal values", function(){
    var score = rd.Score();
    score.add(5.5);
    tc.assertEqual(score.get(), 5);
});

tc.test("Chaining", function(){
    var score = rd.Score();
    score.set(5).add(10).set(30);
    tc.assertEqual(score.get(), 30);
});
