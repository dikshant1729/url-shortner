const express = require("express")
const URL = require('../models/url')
const router = express.Router();
const {restrictToLoggedinUserOnly} = require('../middlewares/auth')
const urlRoute = require('../routes/url');
const userRoute = require('../routes/user')

router.use('/user' , userRoute)

router.get('/login' , (req,res) =>{
    return res.render('login')
})

router.get('/logout' , async (req,res) =>{
    res.clearCookie('uid')
    return res.redirect("/")
})

router.get('/signup' , (req,res) =>{
    return res.render('signup')
})

router.use('/url' , restrictToLoggedinUserOnly ,urlRoute)

router.get('/' , async (req,res) =>{
    if(!req.user){
        const allUrls = await URL.find({})
        return res.render("home" , {
            urls: allUrls,
            cookie: null,
        });
    } 
    const allUrls = await URL.find({createdBy: req.user._id})
    const token = req.cookies.uid;
    return res.render("home" , {
        urls: allUrls,
        cookie: token,
    })
})

module.exports = router