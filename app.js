const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const flash = require('connect-flash')
const passport = require('passport')
const passportConfig = require('./passport')
passportConfig()

const template = require('./lib/template')
const auth = require('./lib/auth')
const db = require('./lib/db')
const secrets = require('./secrets')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: secrets.session.secret,
    store: new MySQLStore(secrets.db),
    resave: false,
    saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
    let title = '메모장'
    let authStatus = auth.Status(req, res)
    let body = template.bodyHome(title, authStatus)
    let html = template.html(body)
    res.send(html)
})

app.get('/signup', (req, res) => {
    let title = 'Sign up'
    let authStatus = auth.Status(req, res)
    let feedback = auth.feedback(req, res)
    let body = template.bodySignup(title, authStatus, feedback)
    let html = template.html(body)
    res.send(html)
})

app.post('/signup', (req, res) => {
    let post = req.body
    let email = post.email
    let nickname = post.nickname
    let password = post.password
    let password2 = post.password2
    if(password !==password2) {
        req.flash('error', 'Check password.')
        res.redirect('/signup')
    }
    db.query(`SELECT * FROM user WHERE email=?`,[email], function(err, users){
        if(err){throw err}
        if(users.length !== 0) {
            req.flash('error', 'Email already exists.')
            res.redirect('/signup')
        } else {
            bcrypt.hash(password, 11, function(err2, hash) {
                if(err2){throw err2}
                db.query(
                    `INSERT INTO user(email, password, nickname, created) 
                      VALUES(?, ?, ?, NOW())`,
                    [email, hash, nickname],
                    function(err3, results){
                        if(err3){throw err3}
                        res.redirect('/login')
                })
            })
        }
    })
})

app.get('/login', (req, res) => {
    let title = 'Login'
    let authStatus = auth.Status(req, res)
    let feedback = auth.feedback(req, res)
    let body = template.bodyLogin(title, authStatus, feedback)
    let html = template.html(body)
    res.send(html)
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if(err) {throw err}
        res.redirect('/')
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})