
const express = require('express');
const app = express();
const fileUploadRouter = express.Router();
const multer = require('multer');
var path = require('path')

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
const upload = multer({ storage: storage });

fileUploadRouter.get('/uploadfile', function (req, res) {
  res.render(path.join(__dirname, './../views', 'upload-file'));
});
  
// Uploading a Single File
fileUploadRouter.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
    
  });
  
  //Uploading multiple files
  fileUploadRouter.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
   
    res.send(files)
    
  });

  module.exports = fileUploadRouter;