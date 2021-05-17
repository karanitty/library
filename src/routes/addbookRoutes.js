const express = require('express');
var addbookRouter = express.Router();
const multer = require('multer');
var bookData = require("../model/bookData");

//storage Definition
const storage = multer.diskStorage({
    //destination for files
    destination:function(req,file,callback){
        callback(null, 'public/uploads');
    },
    
    //add back extension
    filename:function(req,file,callback){
        callback(null,Date.now()+ file.originalname);
    },
});

store  = multer({storage:storage});


function book_routers(nav){

    addbookRouter.get('/',function(req,res){
        res.render('add_book',
        {
            title:'Add New Book',
            nav
        });
    });

    addbookRouter.post('/add',store.single('image'),function(req,res){
        
        var item={
            title:req.body.title,
            author:req.body.author,
            genre:req.body.genre,
            image:req.file.filename,
            description:req.body.description
        }
        var book = bookData(item);
        book.save(); //saving to database
        res.redirect('/books');
    });

    addbookRouter.get('/update/:id',async(req,res)=>{
        const id = req.params.id;
        let book = await bookData.findOne({_id:id});
        // res.send("Reached book update page");
        res.render("update_book",{
            title:"Update Book",
            nav,
            book
        });
    });

    addbookRouter.post('/update/:id',store.single('image'),async(req,res)=>{
        req.book = await bookData.findOne({_id:req.params.id});
        let book = req.book;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.image = req.file.filename;
        book.description = req.body.description;
        book = await book.save();
        // console.log(book._id);
        res.redirect('/books');
        // try{
        //     book = await book.save();
        //     res.redirect('books');
        // }catch(error){
        //     console.log(error);
        //     res.redirect('/updatebook/${book._id}',{navbar,
        //         login,
        //         title:"Update Book",
        //         book:book})
        // }
        
    });

    return addbookRouter;
}

module.exports = book_routers;