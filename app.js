const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const flash = require('connect-flash')
const passport = require('passport')
const passportConfig = require('./passport')
passportConfig()
const secrets = require('./secrets')

const indexRouter = require('./routes/index.js')
const authRouter = require('./routes/auth.js')

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

app.use('/', indexRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
    res.status(404).send('Not Found.')
});

app.use((err, req, res, next) => {
    console.error(error.stack)
    res.status(500).send('Internal Server Error.')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})