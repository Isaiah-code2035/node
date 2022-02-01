const { assert } = require("chai");
const { suite } = require("mocha");

suite(' "About" test page', function() {

    test('page should contain link to contact page', function() {
        assert($('a[href="/contact"]').length);
    })
})