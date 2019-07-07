var express = require('express');
var router = express.Router();

var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

router.post('/upload', function (req, res) {
    if (!req.files.file) {
        res.send('No files were uploaded.');
        return;
    }
    var sampleFile;
    var exceltojson;
    sampleFile = req.files.file;
    sampleFile.mv('./uploads/' + req.files.file.name, function (err) {
        if (err) {
            console.log("eror saving");
        }
        else {
            console.log("saved");
            if (req.files.file.name.split('.')[req.files.file.name.split('.').length - 1] === 'xlsx') {
                exceltojson = xlsxtojson;
                console.log("xlxs");
            } else {
                exceltojson = xlstojson;
                console.log("xls");
            }
            try {
                exceltojson({
                    input: './uploads/' + req.files.file.name,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders: true
                }, function (err, result) {
                    if (err) {
                        return res.json({ error_code: 1, err_desc: err, data: null });
                    }
                    res.json({ error_code: 0, err_desc: null, data: result });
                    var fs = require('fs');
                    try {
                        fs.unlinkSync('./uploads/' + req.files.file.name);
                    } catch (e) {
                        //error deleting the file
                    }
                });
            } catch (e) {
                console.log("error");
                res.json({ error_code: 1, err_desc: "Corupted excel file" });
            }
        }
    });
});