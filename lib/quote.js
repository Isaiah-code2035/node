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