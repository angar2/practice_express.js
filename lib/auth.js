const db = require('./db')

module.exports = {
    isLoggedIn: function(req, res, next) {
        if(req.isAuthenticated()) {
            next()
        } else {
            req.flash('error', 'Please log in')
            res.redirect('/auth/login')
        }
    },
    isNotLoggedIn: function(req, res, next) {
        if(!req.isAuthenticated()) {
            next()
        } else {
            req.flash('error', 'Already loged in')
            res.redirect('/')
        }
    },
    isOwner: function(req, res, user_id) {
        if(req.user.id == user_id) {
            return true
        } else {
            return false
        }
    },
    Status: function(req, res) {
        var authStatus = `
            <a href="/auth/login">Login</a> |
            <a href="/auth/signup">Sign up</a>`
        if(req.isAuthenticated()) {
            authStatus = `${req.user.nickname} | <a href="/auth/logout">Logout</a>`
        }
        return authStatus
    },
    feedback: function(req, res) {
        let fmsg = req.flash()
        let feedback = ''
        if(fmsg.error) {
            feedback = `<p>${fmsg.error[0]}<p>`
        }
        return feedback
    }
}