
const express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/', require('./routes').index);

var port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Node.js listening on port ' + port)
})