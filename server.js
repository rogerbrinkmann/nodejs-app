const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.use(expressLayouts);
app.use(express.static('public'))

app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');
// app.set('layout', 'views/layouts/default');


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' , layout:'./layouts/side-bar'});
})

app.listen(3000);
