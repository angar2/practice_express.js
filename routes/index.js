const express = require('express');
const router = express.Router();

const template = require('../lib/template')
const auth = require('../lib/auth')

router.get('/', (req, res) => {
    let title = '메모장'
    let authStatus = auth.Status(req, res)
    let body = template.bodyHome(title, authStatus)
    let html = template.html(body)
    res.send(html)
})

module.exports = router;