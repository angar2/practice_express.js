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

const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');

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

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})