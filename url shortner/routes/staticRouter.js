const express = require("express")
const URL = require('../models/url')
const router = express.Router();
const {restrictToLoggedinUserOnly} = require('../middlewares/auth')
const urlRoute = require('../routes/url');
const userRoute = require('../routes/user')
const {handleUserLogin , handleUserSignup} = require('../controllers/user')

router.get('/' , async (req,res) =>{
    if(!req.user){
        const allUrls = await URL.find({})
        return res.render("home" , {
            urls: allUrls,
            cookie: req.cookies.uid,
            handleUserLogin: handleUserLogin,
            signuphandler: handleUserSignup
        });
    } 
    const allUrls = await URL.find({createdBy: req.user._id})
    return res.render("home" , {
        urls: allUrls
    })
})

router.get('/login' , (req,res) =>{
    return res.render('login')
})


router.get('/signup' , (req,res) =>{
    return res.render('signup')
})



router.use('/url' , restrictToLoggedinUserOnly ,urlRoute)

router.use('/user' , userRoute)

module.exports = router