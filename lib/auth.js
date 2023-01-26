module.exports = {
    isLoggedIn: function(req, res) {
        if(req.user) {
            return true
        } else {
            return false
        }
    },
    Status: function(req, res) {
        var authStatus = `
            <a href="/login">Login</a> |
            <a href="/signup">Sign up</a>`
        if(this.isLoggedIn(req, res)) {
            authStatus = `${req.user.nickname} | <a href="/logout">Logout</a>`
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