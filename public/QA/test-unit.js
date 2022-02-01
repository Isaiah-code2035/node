const quote = require('/lib/quote.js');
let expect = require('chai').expect;

suite('Random Quotes Test', function() {

    test('getQuotes() should return a quote', function() {
        expect(typeof quote.getQuotes() === 'string')
    })
})