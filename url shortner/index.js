const express = require("express");
const path = require('path')
const cookieParser = require('cookie-parser')
const { connectToMongoDB } = require('./connect')

const { checkAuth } = require('./middlewares/auth')
const staticRoute = require('./routes/staticRouter')


const app = express();
const PORT = process.env.PORT || 8001;
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/short-url';

connectToMongoDB(mongoURL)
.then(() => console.log('mongodb connected'))

app.set('view engine' , 'ejs')
app.set('views' , path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())



app.use('/' , checkAuth , staticRoute)



app.listen(PORT , () => console.log(`server started at PORT ${PORT}`))
  