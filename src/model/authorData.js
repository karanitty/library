//Accessing Mongoose Package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb+srv://userone:userone@fsd.vpxw6.mongodb.net/library?retryWrites=true&w=majority');
// mongoose.connect('mongodb://localhost:27017/library');

//Schema definition
const schema = mongoose.Schema;


const AuthorSchema = new schema({
    name: String,
    description: String,
    image: String,
});

//Model creation
const authorData = mongoose.model('authorData',AuthorSchema);

//Export method
module.exports = authorData;

