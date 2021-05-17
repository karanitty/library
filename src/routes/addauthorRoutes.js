const express = require('express');
var addauthorRouter = express.Router();
const multer = require('multer');
var authorData = require("../model/authorData");

//Storage Definition
const storage = multer.diskStorage({
    //Destination of files
    destination:function(req,file,callback){
        callback(null, 'public/uploads')
    },


    //Add back extension
    filename:function(req,file,callback){
        callback(null,Date.now()+file.originalname);
    }
});

store  = multer({storage:storage});

function author_routers(nav){

    addauthorRouter.get('/',function(req,res){
        res.render('add_author',
        {
            title:'Add New Author',
            nav
        });
    });

    addauthorRouter.post('/add',store.single('image'),function(req,res){

        var item = {
            name: req.body.name,
            description:req.body.description,
            image:req.file.filename
        }

        var author = authorData(item);
        author.save(); //Saving to database
        res.redirect('/authors');
    });

    addauthorRouter.get('/update/:id',async(req,res)=>{
        const id = req.params.id;
        let author = await authorData.findOne({_id:id});
        // res.send("Reached book update page");
        res.render("update_author",{
            title:"Update Author",
            nav,
            author
        });
    });

    addauthorRouter.post('/update/:id',store.single('image'),async(req,res)=>{
        req.author = await authorData.findOne({_id:req.params.id});
        let author = req.author;
        author.name = req.body.name;
        author.description = req.body.description;
        author.image = req.file.filename;
        author = await author.save();
        res.redirect('/authors');
    });

    return addauthorRouter;
}

module.exports = author_routers;