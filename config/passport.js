const LocalStrategy = require('passport-local').Strategy
const db = require('../config/keys')
const nano = require('nano')(db.CouchURI)
const bcrypt = require('bcryptjs')
const users = nano.use('users')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {

            users.view('users', 'usernames', { key: username, 'include_docs': false })
                .then(response => {
                    if (response.rows.length==0) {
                        return done(null, false, { message: 'That username is not registered' })
                    }
                    const user = { id: response.rows[0].id, username: response.rows[0].key, password: response.rows[0].value }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        const q = {
            selector: {
                _id: { "$eq": id }
            },
            fields: ["_id", "username", "password"],
            limit: 1
        }

        users.find(q)
            .then((response, err) => {
                if (response.docs) {
                    const user = { id: response.docs[0]._id, username: response.docs[0].username, password: response.docs[0].password }
                    done(err, user)
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    })
}