const express = require('express')
const app = express();

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

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});