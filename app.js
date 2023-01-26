const express = require('express')
const app = express()
const port = 3000
const template = require('./lib/template')

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})