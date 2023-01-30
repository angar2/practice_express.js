const db = require('./db')

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
    list: async function(req, res) {
        let list = ''
        let topicList = req.topicList
        for(let i = 0; i < topicList.length; i++) {
            let id = topicList[i].id
            let title = topicList[i].title
            list = list + `<li><a href='/topic/${id}'>${title}</a></li>`
        }
        return list
    },
    bodyHome: function(title, authStatus, list) {
        return `
        <div>${authStatus}</div>
        <h1><a href="/">Memo</a></h1>
        <ol>
            ${list}
        </ol>
        <div>
            <a href="/topic/create">Create</a>
        </div>
        <div>
            <p>${title}</p>
            <p>안녕하세요!<p>
        </div>`
    },
    bodySignup: function(title, authStatus, feedback) {
        return `
        <div>${authStatus}</div>
        <h1><a href="/">Memo</a></h1>
        <div>
            <p>${title}</p>
            <form action="/auth/signup" method="post">
                <p><input type="email" name="email" placeholder="Email"></p>
                <p><input type="text" name="nickname" placeholder="Nickname"></p>
                <p><input type="password" name="password" placeholder="Password"></p>
                <p><input type="password" name="password2" placeholder="Confirm Password"></p>
                <p><input type="submit" value="Sign up"></p>
                ${feedback}
            </form>
        </div>`
    },
    bodyLogin: function(title, authStatus, feedback) {
        return `
        <div>${authStatus}</div>
        <h1><a href="/">Memo</a></h1>
        <div>
            <p>${title}</p>
            <form action="/auth/login" method="post">
                <p><input type="email" name="email" placeholder="Email"></p>
                <p><input type="password" name="password" placeholder="Password"></p>
                <p><input type="submit" value="Login"></p>
                ${feedback}
            </form>
        </div>`
    },
    bodyCreate: function(title, authStatus) {
        return `
        <div>${authStatus}</div>
        <h1><a href="/">Memo</a></h1>
        <div>
            <p>${title}</p>
            <form action="/topic/create" method="post">
                <p><input type="text" name="title" placeholder="Title"></p>
                <p><textarea type="text" name="desc" placeholder="Description"></textarea></p>
                <p><input type="submit" value="Create"></p>
            </form>
        </div>`
    },
    bodyDetail: function(results, authStatus, list) {
        let topic_id = results[0].id
        let title = results[0].title
        let desc = results[0].description
        let created = results[0].created
        let nickname = results[0].nickname
        return `
        <div>${authStatus}</div>
        <h1><a href="/">Memo</a></h1>
        <ol>
            ${list}
        </ol>
        <div>
            <a href="/topic/create">Create</a>
            <a href="/topic/update/${topic_id}">Update</a>
            <form action="/topic/delete" method="post">
                <input type="hidden" name="id" value="${topic_id}" />
                <input type="submit" value="Delete" />
            </form>
        </div>
        <div>
            <p>${title}</p>
            <p>${desc}<p>
            <p>${nickname} | ${created}<p>
        </div>`
    },
    bodyUpdate: function(title, results, authStatus, list) {
        let topicId = results[0].id
        let topicTitle = results[0].title
        let topicDesc = results[0].description
        return `
        <div>${authStatus}</div>
        <h1><a href="/">Memo</a></h1>
        <ol>
            ${list}
        </ol>
        <div>
            <p>${title}</p>
            <form action="/topic/update" method="post">
                <input type="hidden" name="id" value="${topicId}">
                <p><input type="text" name="title" placeholder="Title" value="${topicTitle}"></p>
                <p><textarea type="text" name="desc" placeholder="Description">${topicDesc}</textarea></p>
                <p><input type="submit" value="Update"></p>
            </form>
        </div>`
    }
}