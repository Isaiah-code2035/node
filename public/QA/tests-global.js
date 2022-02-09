const { assert } = require("chai");
const { suite } = require("mocha");

suite('Global Tests', function() {
    test('page has a valid title', function() {
        assert(document.title && document.title.match(/\s/) && document.title.toUpperCase() !== 'Todo');
    })

})
