require("dotenv").config();
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const path = require('path')

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req,res) => {
    res.render('client')
})

const s3 = new AWS.S3({
  accessKeyId: 'Your access key id here',
  secretAccessKey: 'Your secrete access key id here',
  region: "your bucket region here",
});
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const s3Params = {
    Bucket: "your bucket name here",
    Key: file.originalname,
    Body: fs.createReadStream(file.path),
  };

  s3.upload(s3Params, (err, data) => {
    if (err) {
      // Send a JSON response with error details
      return res.status(500).json({ error: err.message });
    }

    // Send a JSON response with the S3 data
    res.status(200).json(data);
    console.log('File uploaded successfully')
  });
});

app.listen(9000, console.log("app runniing on port 9000"));
