const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')

const template = require('../lib/template')
const auth = require('../lib/auth')
const db = require('../lib/db')

router.get('/signup', auth.isNotLoggedIn, (req, res) => {
    let title = 'Sign up'
    let authStatus = auth.Status(req, res)
    let feedback = auth.feedback(req, res)
    let body = template.bodySignup(title, authStatus, feedback)
    let html = template.html(body)
    res.send(html)
})

router.post('/signup', auth.isNotLoggedIn, (req, res) => {
    let post = req.body
    let email = post.email
    let nickname = post.nickname
    let password = post.password
    let password2 = post.password2
    if(password !==password2) {
        req.flash('error', 'Check password.')
        res.redirect('/auth/signup')
    }
    db.query(`SELECT * FROM user WHERE email=?`,[email], function(err, users){
        if(err){throw err}
        if(users.length !== 0) {
            req.flash('error', 'Email already exists.')
            res.redirect('/auth/signup')
        } else {
            bcrypt.hash(password, 11, function(err2, hash) {
                if(err2){throw err2}
                db.query(
                    `INSERT INTO user(email, password, nickname, created) 
                      VALUES(?, ?, ?, NOW())`,
                    [email, hash, nickname],
                    function(err3, results){
                        if(err3){throw err3}
                        res.redirect('/auth/login')
                })
            })
        }
    })
})

router.get('/login', auth.isNotLoggedIn, (req, res) => {
    let title = 'Login'
    let authStatus = auth.Status(req, res)
    let feedback = auth.feedback(req, res)
    let body = template.bodyLogin(title, authStatus, feedback)
    let html = template.html(body)
    res.send(html)
})

router.post('/login', auth.isNotLoggedIn, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
}));

router.get('/logout', auth.isLoggedIn, (req, res) => {
    req.logout(function(err) {
        if(err) {throw err}
        res.redirect('/')
    })
})

module.exports = router;