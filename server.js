const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const JunkModel = require('./database'); // Assuming database.js is in the same directory as server.js
const Schema = mongoose.Schema;

const app = express();
const PORT = 3000;
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB here...
mongoose.connect('mongodb://localhost:27017/junkHaulDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB!'))
.catch(error => console.error('Could not connect to MongoDB: ', error));

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
    address: req.body.address,
    zipcode: req.body.zipcode,
    file: req.file.path // storing the file path in the database
  });
 
  const JunkModel = mongoose.model('Junk', junkSchema);
  
  newEntry.save((err, entry) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Data saved successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
