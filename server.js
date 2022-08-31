let staticPath = process.argv[2]
let port = process.argv[3]

var express = require('express')
var app = express()
app.use(express.static(staticPath));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/', function (req, res) {
  console.log('DEBUG_LOG:req', req);
  res.send('Welcome!')
})
app.listen(port)