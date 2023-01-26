const express = require('express')
const app = express()
const port = 3000
const template = require('./lib/template')

app.get('/', (req, res) => {
  res.send(template.html())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})