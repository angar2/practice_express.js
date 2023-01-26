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
    let body = template.bodyHome(title)
    let html = template.html(body)
    res.send(html)
})

app.get('/signup', (req, res) => {
    let title = 'Sign up'
    let body = template.bodySignup(title)
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
        res.write("<script>alert('Check password')</script>")
        res.write("<script>window.location='/signup'</script>")
    }
    db.query(`SELECT * FROM user WHERE email=?`,[email], function(err, users){
        if(err){throw err}
        if(users.length !== 0) {
            res.write("<script>alert('The email already exists')</script>")
            res.write("<script>window.location='/signup'</script>")
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
    let body = template.bodyLogin(title)
    let html = template.html(body)
    res.send(html)
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})