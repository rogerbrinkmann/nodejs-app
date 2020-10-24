const express = require('express');
const router = express.Router()

router
    .route('/login')
    .get((req, res) => {
        res.render('users/login', { title: 'Login', layout: './layouts/narrow' });
    })

router
    .route('/register')
    .get((req, res) => {
        res.render('users/register', { title: 'Register', layout: './layouts/narrow' });
    })


module.exports = router;