const express = require('express');
const app = express();


//configure handlebars the template engine
const handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')



//routes

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/about', (req, res) => {
    res.render('about')
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