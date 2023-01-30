const express = require('express')
const router = express.Router()
const path = require('path')

const template = require('../lib/template')
const auth = require('../lib/auth')
const db = require('../lib/db')

router.get('/create', auth.isLoggedIn, (req, res) => {
    let title = 'Create'
    let authStatus = auth.Status(req, res)
    let body = template.bodyCreate(title, authStatus)
    let html = template.html(body)
    res.send(html)
})

router.post('/create', auth.isLoggedIn, (req, res) => {
    let post = req.body
    let user_id = req.user.id
    let title = post.title
    let desc = post.desc
    db.query(`INSERT INTO topic(title, description, user_id, created) VALUES(?, ?, ?, NOW())`,
        [title, desc, user_id],
        (err, result) => {
            if(err) {throw err}
            res.redirect(`/topic/${result.insertId}`)
    })
})

router.get('/update/:topicId', async (req, res) => {
    let topicId = path.parse(req.params.topicId).base
    db.query(`SELECT * FROM topic WHERE id=?`,[topicId], async (err, results) => {
        if(err) {throw err}
        let title = 'Update'
        let list = await template.list(req, res)
        let authStatus = auth.Status(req, res)
        let body = template.bodyUpdate(title, results, authStatus, list)
        let html = template.html(body)
        res.send(html)
    })
})

router.post('/update', (req, res) => {
    let post = req.body
    let topic_id = post.id
    let title = post.title
    let desc = post.desc
    db.query(`UPDATE topic SET
        title=?, description=?
        WHERE id=?`,
        [title, desc, topic_id],
        (err, result) => {
            if(err) {throw err}
            res.redirect(`/topic/${topic_id}`)
    })
})

router.post('/delete', (req, res) => {
    let topic_id = req.body.id
    db.query(`DELETE FROM topic WHERE id=?`,
        [topic_id],
        (err, result) => {
            if(err) {throw err}
            res.redirect(`/`)
    })
})

router.get('/:topicId', async (req, res) => {
    let topicId = path.parse(req.params.topicId).base
    db.query(`SELECT * FROM topic WHERE id=?`,[topicId], async (err, results) => {
        if(err) {throw err}
        let user_id = results[0].user_id
        db.query(`SELECT nickname FROM user WHERE id=?`,[user_id], async (err2, nickname) => {
            if(err) {throw err}
            results[0].nickname = nickname[0].nickname
            let list = await template.list(req, res)
            let authStatus = auth.Status(req, res)
            let body = template.bodyDetail(results, authStatus, list)
            let html = template.html(body)
            res.send(html)
        })
    })
})

module.exports = router