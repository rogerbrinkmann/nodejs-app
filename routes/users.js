const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth')

router.use(express.urlencoded({
    extended: false
}))

// Passport config
require('../config/passport')(passport)


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

// global vars
router.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// setup couchdb connection to users - database
const db = require('../config/keys')
const nano = require('nano')(db.CouchURI)
const users = nano.use('users')


router
    .route('/login')
    .get((req, res) => {
        const locals = { title: 'Login', layout: 'layouts/narrow', active: 'login' }
        if (typeof (req.user) != 'undefined') {
            locals.username = req.user.username
            locals.isAuthenticated = req.isAuthenticated()
        }
        res.render('users/login', locals)
    })

router
    .route('/login')
    .post((req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/users/list',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next)
    })

router
    .route('/logout')
    .get((req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
    })

router
    .route('/register')
    .get((req, res) => {
        const locals = { title: 'Register', layout: 'layouts/narrow', active: 'register' }
        if (typeof (req.user) != 'undefined') {
            locals.username = req.user.username
            locals.isAuthenticated = req.isAuthenticated()
        }
        res.render('users/register', locals)
    })

router
    .route('/register')
    .post((req, res) => {
        const { username, password, password2 } = req.body
        const locals = {
            title: 'Register',
            layout: 'layouts/narrow',
            active: 'register',
            username: username,
            password: password,
            password2: password2
        }
        let errors = []

        // Check required fields
        if (!username || !password || !password2) {
            errors.push({ msg: 'Please fill in all fields' })
        }

        // Check passwords match
        if (password != password2) {
            errors.push({ msg: 'Passwords do not match' })
        }

        // Check password length
        if (password.length < 4) {
            errors.push({ msg: 'Password should be at least 4 characters long' })
        }

        if (errors.length > 0) {
            // if there are errors we pass the errors and the filled in data so far back to the form
            locals.errors = errors
            res.render('users/register', locals)
        } else {
            // Validation passed
            users.view('users', 'usernames', { key: username, 'include_docs': false })
                .then(data => {
                    if (data.rows.length > 0) {
                        errors.push({ msg: 'Username already exists, please choose another one.' })
                        locals.errors = errors
                        res.render('users/register', locals)
                    } else {
                        // the username does not exist -> add to database
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                if (err) throw err;
                                users.insert({ username: username, password: hash })
                                    .then(username => {
                                        req.flash('success_msg', 'You are now registered and can log in')
                                        res.redirect("login")
                                    })
                                    .catch(err => console.log(err))
                            })
                            if (err) throw err;
                        })
                    }
                })
                .catch((err) => {
                    errors.push(err)
                    locals.errors = errors
                    res.render('users/register', locals)
                })

        }
    })

router
    .route('/list')
    .get(ensureAuthenticated, (req, res) => {
        const locals = {
            title: 'Users',
            layout: 'layouts/side-nav',
            active: 'users',
            username: req.user.username,
            isAuthenticated: req.isAuthenticated()
        }
        users.view('users', 'usernames', { 'include_docs': false })
            .then((data) => {
                locals.data = data
                res.render('users/list', locals)
            })
            .catch((err) => {
                console.log(err)
                locals.data = null
                res.render('users/list', locals)
            })
    })

module.exports = router