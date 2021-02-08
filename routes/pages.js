const express = require('express');
let router = express.Router()
const { ensureAuthenticated } = require('../config/auth')


// setup couchdb connection to users - database
const db = require('../config/keys')
const nano = require('nano')(db.CouchURI)
const pages = nano.use('pages')

router.use(express.urlencoded({
    extended: false
}))

router
    .route('/edit')
    .get(ensureAuthenticated, (req, res) => {
        var locals = { title: 'Editor', layout: 'layouts/full-width', active: 'edit' };
        if (typeof (req.user) != 'undefined') {
            locals.username = req.user.username
            locals.isAuthenticated = req.isAuthenticated()
        }
        res.render('pages/edit', locals);
    })

router
    .route('/save')
    .post(ensureAuthenticated, (req, res) => {

        var locals = { title: 'List Pages', layout: 'layouts/full-width', active: 'list-pages' };
        if (typeof (req.user) != 'undefined') {
            locals.username = req.user.username
            locals.isAuthenticated = req.isAuthenticated()
        }
        pages.insert(req.body)
            .then(() => {
                pages.view('pages', 'titles', { include_docs: false })
                    .then((data) => {
                        locals.pages = data.rows
                        res.render('pages/list-pages', locals);
                    })
            })
            .catch((err) => {
                console.log(err)
                res.render('pages/list-pages', locals);
            })
    })

router
    .route('/list')
    .get(ensureAuthenticated, (req, res) => {
        var locals = { title: 'List Pages', layout: 'layouts/narrow', active: 'list-pages' };
        if (typeof (req.user) != 'undefined') {
            locals.username = req.user.username
            locals.isAuthenticated = req.isAuthenticated()
        }
        pages.view('pages', 'titles', { include_docs: false })
            .then((data) => {
                locals.pages = data.rows
                res.render('pages/list-pages', locals)
            })
            .catch((err) => {
                console.log(err)
                res.render('pages/list-pages', locals)
            })
    })

router
    .route('/page')
    .get(ensureAuthenticated, (req, res) => {
        var locals = { layout: 'layouts/full-width', active: 'list-pages' };
        if (typeof (req.user) != 'undefined') {
            locals.username = req.user.username
            locals.isAuthenticated = req.isAuthenticated()
        }
        pages.get(req.query.id)
            .then((doc) => {
                locals.title = doc.pagetitle
                locals.htmlData = doc.htmlData
                res.render('pages/page', locals)
            })
            .catch((err) => {
                console.log(err)
                locals.title = 'Page Not Found'
                locals.htmlData = 'The page can not'
                res.render('pages/page', locals)
            })
    })

module.exports = router;
