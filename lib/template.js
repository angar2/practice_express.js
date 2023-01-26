module.exports = {
    html: function() {
      return `
        <!doctype html>
        <html>
          <head>
            <title>Mome</title>
            <meta charset="utf-8">
            </head>
          <body>
            <a href="/author">Author</a>
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
                <p>안녕하세요!<p>
            </div>
          </body>
        </html>`
    }
}