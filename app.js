const bodyParser = require('body-parser');
const express = require('express');
const quote = require('./lib/quote.js')
const formidable = require('formidable')
const app = express();
app.use(require('body-parser')())

//configure handlebars the template engine
const handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')


//use public
app.use(express.static(__dirname + '/public'))

//add simple form
app.get('/newsletter', function(req, res) {

    res.render('newsletter', { csrf: 'CSRF token is here' })
})


app.post('/process', function(req, res) {

    console.log('Form (from querystring): ' + req.query.form)
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.redirect(303, '/thank-you')

})


//add form with image upload

app.get('/contest/vacation-photo', function(req, res) {

    let now = new Date()

    res.render('contest/vacation-photo', {
        year: now.getFullYear(),
        month: now.getMonth()
    })

})


app.post('/contest/vacation-photo/:year/:month', function(req, res, next) {

    let form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {


        if (err) return res.redirect(303, '/error');

        console.log('received fields:')
        console.log(fields)
        console.log('received files:')
        console.log(files)
        res.render('thank-you')

    })
})





//middleware for showing tests
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();


})



//routes
app.get('/', (req, res) => {
    res.render('home')
});


//show random quotes(use without s in the view)
// let quotes = [
//     'You are blessed',
//     'The Lord is your shepherd',
//     'The Lord is with me',
//     'Halleluyah Kashope',
//     'Fear Not'
// ]


app.get('/about', (req, res) => {
    // let randomQuotes = quotes[Math.floor(Math.random() * quotes.length)]

    res.render('about', {
        quote: quote.getQuotes(),
        pageTestScript: '/qa/tests-about.js'
    })

})

//customize my 404 page

app.use(function(req, res, next) {
    res.status(404);
    res.render('404')

})

//customize my 500 page

app.use(function(err, req, res, next) {
    console.error(err.stack);

    res.status(500);
    res.render('500')


})


app.listen(3000)
console.log('Listening to Port 3000')