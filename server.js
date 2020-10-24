const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.use(express.static('public'))
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.set('view engine', 'ejs');

app.listen(3000);
