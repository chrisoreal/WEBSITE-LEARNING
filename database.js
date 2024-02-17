const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/junkHaulDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch(error => {
  console.error('Could not connect to MongoDB:', error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the MongoDB database.');
});

// Define schema
const junkSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    zipcode: String,
    file: String // This will store the file path
});

// Compile the model
const JunkModel = mongoose.model('JunkModel', junkSchema);

// Export the model so it can be used in other parts of app
module.exports = JunkModel;
