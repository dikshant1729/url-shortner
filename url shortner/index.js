const express = require("express");
const path = require('path')
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url');
const URL = require('./models/url')
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('mongodb connected'))

app.set('view engine' , 'ejs')
app.set('views' , path.resolve('./views'))

app.use(express.json());

app.get('/test' ,async (req,res) =>{
    const allUrls = await URL.find({});
    return res.send(`
    <html>
    <head>
    <body>
    <ol>
    ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}
    </ol>
    </body>
    </head>
    </html>
    `)
})

app.use('/url' , urlRoute)

app.get('/:shortId' , async (req,res) => {
    console.log('hi')
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    } ,  { $push: {
        visitHistory: {
            timestamp: Date.now()
        }
    } }
    );
    res.redirect(entry.redirectURL)
})



app.listen(PORT , () => console.log(`server started at PORT ${PORT}`))
  