//Accessing Mongoose Package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb+srv://userone:userone@fsd.vpxw6.mongodb.net/library?retryWrites=true&w=majority');
// mongoose.connect('mongodb://localhost:27017/library');

//Schema definition
const schema = mongoose.Schema;

const BookSchema = new schema({
    title: String,
    author: String,
    genre: String,
    image: String,
    description: String
});

//Model creation
var bookData = mongoose.model('bookData',BookSchema);

module.exports = bookData;