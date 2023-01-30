const express = require('express')
const router = express.Router()

const template = require('../lib/template')
const auth = require('../lib/auth')
const db = require('../lib/db')

router.get('*', (req, res, next) => {
    db.query(`SELECT id, title FROM topic`, (err, results) => {
        req.topicList = results;
        next();
    })
})

router.get('/', async (req, res) => {
    let title = '메모장'
    let list = await template.list(req, res)
    let authStatus = auth.Status(req, res)
    let body = template.bodyHome(title, authStatus, list)
    let html = template.html(body)
    res.send(html)
})

module.exports = router;