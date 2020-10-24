const express = require('express');
let router = express.Router()

router
    .route('/')
    .get((req, res) => {
        res.render('index', { title: 'Home', layout: './layouts/full-width' });
    })

router
    .route('/about')
    .get((req, res) => {
        res.render('about', { title: 'About', layout: './layouts/side-bar' });
    })

module.exports = router;