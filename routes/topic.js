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

router.post('/create', (req, res) => {
    let post = req.body
    let user_id = req.user.id
    let title = post.title
    let desc = post.desc
    db.query(`INSERT INTO topic(title, description, user_id, created) VALUES(?, ?, ?, NOW())`,
        [title, desc, user_id],
        (err, result) => {
            if(err) {throw err}
            res.redirect('/')
            // res.redirect(`/topic/${result.insertId}`)
    })
})

module.exports = router