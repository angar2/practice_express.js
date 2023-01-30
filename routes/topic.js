const express = require('express');
const router = express.Router();

const template = require('../lib/template')
const auth = require('../lib/auth')
const db = require('../lib/db')

router.get('/create', (req, res) => {
    let title = 'Create'
    let authStatus = auth.Status(req, res)
    let body = template.bodyCreate(title, authStatus)
    let html = template.html(body)
    res.send(html)
})

module.exports = router