const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './upload' });
const mongoose = require('mongoose');
const JunkModel = require('./database'); // Assuming database.js is in the same directory as server.js
const Schema = mongoose.Schema;

const app = express();
const PORT = 3000;

// Require your database configuration file
require('./database'); // This file will handle connecting to MongoDB

// Serve static files from 'uploads' directory
app.use('/upload', express.static('upload'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const junkSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  zipcode: String,
  file: String
});

// Database schema and model setup here:
app.post('/upload', upload.single('file'), (req, res) => {
  let newEntry = new JunkModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    zipcode: req.body.zipcode,
    file: req.file.path // storing the file path in the database
  });

  newEntry.save((err, entry) => {
    if (err) {
      // If an error occurs, send a 500 error response
      return res.status(500).send(err);
    }
    // If successful, send a 200 success response
    res.status(200).send('File uploaded and data saved successfully');
  });
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
