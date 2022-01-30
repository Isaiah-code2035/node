const express = require('express');
const handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

const app = express();


//routes

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Malwark Travels')
});

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Us')
})

//customize my 404 page

app.use(function(req, res) {

    res.type('text/plain');
    res.status(404);
    res.send('404- Not found')

})

//customize my 500 page

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500- Server error')


})


app.listen(3000)
console.log('Listening to Port 3000')