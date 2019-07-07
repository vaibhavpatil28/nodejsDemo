const UPLOAD_PATH = 'public/'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
// var upload = multer({ dest: `${UPLOAD_PATH}/`}); // apply filter
var upload = multer({ dest: 'public/' });
const crypto = require('crypto');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


const storage = multer.diskStorage({
  destination: 'some-destination',
  filename: function (req, file, callback) {
  }
});

crypto.pseudoRandomBytes(16, function (err, raw) {
  if (err) return callback(err);

  callback(null, raw.toString('hex') + path.extname(file.originalname));
});



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

app.post('/', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    const host = req.host;
    const filePath = req.protocol + "://" + host + '/' + req.file.path;
    console.log('filePath', filePath);
    return res.send({
      success: true
    })
  }
});

app.listen(3000, () => {
  console.log('Example app listening on port 8000!')
});