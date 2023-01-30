const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const db = require('../lib/db')
let googleCredentials = require('../config/google.json')

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: googleCredentials.web.client_id,
        clientSecret: googleCredentials.web.client_secret,
        callbackURL: googleCredentials.web.redirect_uris[0]
        },
        function(accessToken, refreshToken, profile, cb) {
            let email = profile._json.email
            let nickname = profile._json.name
            db.query(`SELECT * FROM user WHERE email=?`,[email], (err, user) => {
                if(err){throw err}
                if(user.length !== 0) {
                    user[0].google_id = profile.id 
                    cb(null, user[0])
                } else {
                    db.query(
                        `INSERT INTO user(email, nickname, google_id, created) 
                            VALUES(?, ?, ?, NOW())`,
                            [email, nickname, profile.id],
                            (err2, results) => {
                                if(err2){throw err2}
                                db.query(`SELECT * FROM user WHERE email=?`,[email], (err3, user) => {
                                    console.log(user[0])
                                    if(err3){throw err3}
                                    cb(null, user[0])
                            })
                        })
                    }
                })

        }
    ))
}