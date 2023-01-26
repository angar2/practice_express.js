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
            <a href="/auth/login">Login</a> |
            <a href="/auth/google">Google Login</a> |
            <a href="/auth/signup">Sign up</a>`
        if(this.isLoggedIn(req, res)) {
            authStatus = `${req.user.nickname} | <a href="/auth/logout">Logout</a>`
        }
        return authStatus
    }
}