//this is a library to create random quotes.
// this is to show that I can create my own personal module and export it to be imported in the main file

let quotes = [
    'You are blessed',
    'The Lord is your shepherd',
    'The Lord is with me',
    'Halleluyah Kashope',
    'Fear Not'
]

exports.getQuotes = function() {
    let idx = Math.floor(Math.random() * quotes.length);
    return quotes[idx]
}