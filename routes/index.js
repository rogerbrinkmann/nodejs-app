const express = require('express');
let router = express.Router()


router
    .route('/')
    .get((req, res) => {
        var locals = { title: 'Home', layout: 'layouts/full-width', active: 'home' };
        res.render('index', locals);
    })

router
    .route('/about')
    .get((req, res) => {
        var locals = { title: 'About', layout: 'layouts/narrow', active: 'about' };
        res.render('about', locals);
    })

router
    .route('/editor')
    .get((req, res) => {
        var locals = { title: 'Editor', layout: 'layouts/editor', active: 'editor' };
        res.render('editor', locals);
    })

module.exports = router;