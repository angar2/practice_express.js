const passport = require('passport')
const LocalStrategy = require('passport-local')
const db = require('../lib/db')
const bcrypt = require('bcrypt')

module.exports = () => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        function(email, password, done) {
            db.query(`SELECT * FROM user WHERE email=?`,email, function(err, user) {
                user = user[0]
                if(err){throw err}
                if(user) {
                    bcrypt.compare(password, user.password, function(err2, result) {
                        if(err2){throw err2}
                        if(result){
                            return done(null, user)
                        } else {
                            return done(null, false, {
                                message: 'Invalid password.'
                            })
                        }
                    })
                } else {
                    return done(null, false, {
                        message: 'Email does not exist.'
                    })
                }
            })
        }
    ))
}