const UPLOAD_PATH = 'public/'
const express = require('express');
const bodyParser = require('body-parser');
// var upload = multer({ dest: `${UPLOAD_PATH}/`}); // apply filter
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }))
var ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const fileUploadRoute = require('./routes/upload-file-using-multer');

app.use('/', express.static('views'));

app.get('/', (req, res) => {
  var sql = require("mssql");

  // config for your database
  var config = {
    user: 'sa',
    password: '@Angular8;',
    server: 'localhost',
    database: 'TestData'
  };

  // connect to your database
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(`SELECT ProductID, ProductName, Price, ProductDescription  
      FROM dbo.Products`, function (err, recordset) {

        if (err) console.log(err)

        // send records as a response
        res.send(recordset);
      });
  });
});

app.get('/upload-file', function (req, res) {
  res.sendFile(__dirname + '/views/upload-file.html');
});

app.use('/file', fileUploadRoute);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});