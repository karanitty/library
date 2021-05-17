const express = require('express');
var loginRouter = express.Router();
const userData = require("../model/userData");
const bcrypt = require('bcryptjs');
function login_routers(nav){

    loginRouter.get('/',function(req,res){
        res.render('login',
        {
            title:'Log In',
            nav,
            value:''
        });
    });

    loginRouter.post('/', async (req,res) =>{
        const {email,password} = req.body;

        let user = await userData.findOne({email});
        
        if(!user){
            // window.prompt("Email or Password is incorrect");
            // await alert('Username or Password is incorrect');
            console.log("Email is incorrect");
            // return res.redirect('/login');
            return res.render('login',{
                title:'log In',
                nav,
                value:"Email ID or Password is incorrect"
            });

        }
        else{
            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                // window.prompt("Email or Password is incorrect");
                // await alert('Username or Password is incorrect');
                console.log("Password is incorrect");
                return res.render('login',{
                    title:'log In',
                    nav,
                    value:"Email ID or Password is incorrect"
                });

                // return res.redirect('/login');
            }
            else{
                req.session.isAuth = true;
                res.redirect('/home');
            }
        }

    });

    return loginRouter;
}

module.exports = login_routers;