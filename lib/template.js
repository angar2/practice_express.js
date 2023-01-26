module.exports = {
    html: function(body) {
        return `
            <!doctype html>
            <html>
            <head>
                <title>Mome</title>
                <meta charset="utf-8">
                </head>
            <body>
                ${body}
            </body>
            </html>`
    },
    bodyHome: function(title) {
        return `
        <a href="/login">Login</a>
        <a href="/signup">Sign up</a>
        <h1><a href="/">Memo</a></h1>
        <ol>
          <li><a href="/">메모장</a></li>
          <li><a href="/">낙서</a></li>
          <li><a href="/">글쓰기</a></li>
        </ol>
        <div>
            <a href="/create">Create</a>
            <a href="/update">Update</a>
            <a href="/dalete">Delete</a>
        </div>
        <div>
            <p>${title}</p>
            <p>안녕하세요!<p>
        </div>`
    },
    bodySignup: function(title) {
        return `
        <a href="/login">Login</a>
        <h1><a href="/">Memo</a></h1>
        <div>
            <p>${title}</p>
            <form action="/signup" method="post">
                <p><input type="email" name="email" placeholder="Email"><p>
                <p><input type="text" name="nickname" placeholder="Nickname"><p>
                <p><input type="password" name="password" placeholder="Password"><p>
                <p><input type="password" name="password2" placeholder="Confirm Password"><p>
                <p><input type="submit" value="Sign up"><p>
            </form>
        </div>`
    },
    bodyLogin: function(title) {
        return `
        <a href="/signup">Sign up</a>
        <h1><a href="/">Memo</a></h1>
        <div>
            <p>${title}</p>
            <form action="/login" method="post">
                <p><input type="email" name="email" placeholder="Email"><p>
                <p><input type="password" name="password" placeholder="Password"><p>
                <p><input type="submit" value="Login"><p>
            </form>
        </div>`
    }
}