const jwt = require('jsonwebtoken')
const secret = 'diksha@123$' || process.env.SECRET


 function setUser(user){

    const token = jwt.sign(user.toJSON(), secret)
    
    return token
 }

 function getUser(token){
   
   if(!token) return null;

    return jwt.verify(token,secret) 
 }

 module.exports = {
    setUser,
    getUser
 }