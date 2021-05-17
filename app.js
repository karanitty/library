var chalk = require("chalk");
const express = require("express");
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
var app = new express();

const MongoURI = 'mongodb+srv://userone:userone@fsd.vpxw6.mongodb.net/library?retryWrites=true&w=majority';

mongoose.connect(MongoURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const store = new MongoDBSession({
    uri:MongoURI,
    collection:'mySessions'
});


app.use(
    session({
        secret:'key',
        resave:false,
        saveUninitialized:false,
        store:store
    })
);

global.isAuth = (req,res,next) => {
    if(req.session.isAuth==true){
        next();
    }
    else{
        res.redirect('/login');
    }
}


const nav = [
    {
        link:'/books',
        name:'Books'
    },
    {
        link:'/authors',
        name:'Author'
    },
];

const nav_books = [
    {
        link:'/books',
        name:'Books'
    },
    {
        link:'/authors',
        name:'Author'
    },
    {
        link:'/add_book',
        name: 'Add Book'
    }
];

const nav_authors = [
    {
        link:'/books',
        name:'Books'
    },
    {
        link:'/authors',
        name:'Author'
    },
    {
        link:'/add_author',
        name: 'Add Author'
    }
];

var homeRouter = require('./src/routes/homeRoutes')(nav);
var booksRouter = require('./src/routes/bookRoutes')(nav_books);
var authorsRouter = require('./src/routes/authorRoutes')(nav_authors);
var loginRouter = require('./src/routes/loginRoutes')(nav);
var signupRouter = require('./src/routes/signupRoutes')(nav);
var addbookRouter = require('./src/routes/addbookRoutes')(nav);
var addauthorRouter = require('./src/routes/addauthorRoutes')(nav);



app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use(express.static('./public'));
app.use('/home',homeRouter);
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/add_book',addbookRouter);
app.use('/add_author',addauthorRouter);


app.get('/',function(req,res){
    res.render('index.ejs',
    {
        title:'Library App',
        nav,
    });
});

app.post('/',function(req,res){
    req.session.destroy((err)=>{
        if(err){
            throw err;
        }
        // isAuth = false;
        // res.clearCookie('isAuth');
        res.redirect('/');
    });
    
});


app.listen(5000);