const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT

function writeLog(req, res, next) {
  console.log(new Date().toString() + '\t' + req.url)
  next()
}

app.use(express.static(__dirname + '/../dist'))
app.use(writeLog)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log('The server running at port '+ port)
})