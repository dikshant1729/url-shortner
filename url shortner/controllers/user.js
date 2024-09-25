const User = require('../models/user')
const {v4: uuidv4} = require('uuid')
const {setUser} = require('../service/auth')
async function handleUserSignup(req,res){
    const {name , email , password} = req.body;
    const user = await User.create({
        name,
        email,
        password
    })
    const token = setUser(user)
    res.cookie('uid' , token)
    // const allUrls = await URL.find({createdBy: req.user._id})
    return res.render("home" , {
        cookie: token,
        urls: [],
    })
}

async function handleUserLogin(req,res){
    const {email , password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)return res.render('login' , {
        error: "Invalid Username or Password"
    })

    const token = setUser(user)
    res.cookie('uid' , token)
  
    return res.redirect("/")
}

async function handleUserLogout(req,res){
    res.clearCookie('uid')
    return res.redirect("/")
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}