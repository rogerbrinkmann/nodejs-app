const express = require('express');
let router = express.Router()
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth')


// Express Session
router.use(session({
    secret: 'very-special-secret',
    resave: true,
    saveUninitialized: true
}))


// Passport middleware
router.use(passport.initialize())
router.use(passport.session())

// connect flash
router.use(flash())

router
    .route('/')
    .get((req, res) => {
        var locals = { title: 'Home', layout: 'layouts/full-width', active: 'home'};
        if (typeof (req.user) != 'undefined') {
            locals.username = req.user.username
            locals.isAuthenticated = req.isAuthenticated()
        }
        res.render('index', locals);
    })

router
    .route('/about')
    .get((req, res) => {
        var locals = { title: 'About', layout: 'layouts/narrow', active: 'about' };

        if (typeof (req.user) != 'undefined') {
            locals.username = req.user.username
            locals.isAuthenticated = req.isAuthenticated()
        }
        res.render('about', locals);
    })

module.exports = router;