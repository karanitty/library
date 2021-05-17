const express = require('express');
var signupRouter = express.Router();
const bcrypt = require('bcryptjs');
var userData = require('../model/userData');

function signup_routers(nav){
    signupRouter.get('/',function(req,res){
        res.render('signup',
        {
            title:'Sign Up',
            nav,
            value:''
        });
    });

    signupRouter.post('/', async (req,res) =>{
        const {name,email,password,phone} = req.body;

        let user = await userData.findOne({email});

        if(user){
            // alert("User already exist");
            return res.render('signup',{
                title:'Sign Up',
                nav,
                value:'Email ID already exist.'
            });
        }

        const hashedPsw = await bcrypt.hash(password,12);

        user = new userData({
            name,
            email,
            password:hashedPsw,
            phone
        });

        await user.save();
        res.render('login',{
            title:'Log In',
            nav,
            value:'Registration successful. Please login to continue'
        });
    });

    return signupRouter;
}

module.exports = signup_routers;