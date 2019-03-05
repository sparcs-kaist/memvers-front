const express = require('express');
const app = express();
const port = process.env.PORT;

function writeLog(req, res, next) {
  console.log(new Date().toString() + '\t' + req.url);
  next();
}

app.use(express.static('static'));
app.use(writeLog);
app.set('views', __dirname + '/../static/views');
app.engine('.html', require('ejs').renderFile);

app.get('/', (_, res) => {
  res.render('main.ejs');
});

[
  'login', 'passwd', 'mkml', 'forward', 'edalias', 'reset', 'nugu', 'nugus'
].forEach(path => {
  app.get('/' + path, (_, res) => {
    res.render(path + '.ejs');
  });
});

[
  'add', 'delete'
].forEach(path => {
  app.get('/wheel/' + path, (_, res) => {
    res.render(path + '.ejs');
  });
});

app.get('/reset/:serial', (req, res) => {
  res.render('reset.html');
});

app.listen(port, () => {
  console.log('The server running at port ' + port);
});
