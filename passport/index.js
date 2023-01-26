const passport = require('passport')
const local = require('./local')
const db = require('../lib/db')
const bcrypt = require('bcrypt')

module.exports = function () {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });
    
    passport.deserializeUser(function(id, done) {
        db.query(`SELECT * FROM user WHERE id=?`,id, function(err, user){
            if(err){throw err}
            done(null, user)
        })
    });

    local()
}