const express = require('express');
const homeRouter = express.Router();

function home_routers(nav){
        homeRouter.get('/',isAuth,function(req,res){
            res.render('home.ejs',{
                nav,
                title:"Home",
            });
        });
    
    return homeRouter;
}

module.exports = home_routers;
