const bodyParser = require('body-parser');
const express = require('express');
const quote = require('./lib/quote.js')
const formidable = require('formidable')
const credentials = require('./credentials.js')
const session = require('express-session');
const app = express();
app.use(require('body-parser')());
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());

//configure handlebars the template engine
const handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')


//use public
app.use(express.static(__dirname + '/public'))

//session for flash

app.use(function(req, res, next) {

    //transfer flash messae ad sfter delete it

    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next()

})


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



//flash messages validation
app.post('/newsletter', function(req, res) {

    let name = req.body.name || '',
        email = req.body.email || '';

    if (!email.match(VALID_EMAIL_REGEX)) {
        if (req.xhr) {
            return res.json({ error: 'Invalid name email address' })
        }

        req.session.flash = {
            type: 'Danger',
            intro: 'Validation Error',
            message: 'The email address you have enterted is not valid'
        };
        return res.redirect(303, '/newsletter/acheive')
    }


    new NewsLetterSignup({ name: name, email: email }).save(function(err) {

        if (err) {
            if (req.xhr) {
                return res.json({ error: 'Database Error' })
            }
            req.session.flash = {
                type: 'Danger',
                intro: 'Database Error',
                message: 'There was a database error. Please try again'
            };
            return res.redirect(303, '/newsletter/achieve')
        };

        if (req.xhr) {
            return res.json({ success: true })
        }
        req.session.flash = {
            type: 'success',
            intro: 'Thank you',
            message: 'You have now been signed in to our newsletter'
        }
        return res.redirect(303, '/newsletter/achieve')
    })

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
        res.redirect(303, '/thank-you')

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