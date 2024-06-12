const express = require("express")
const { handleGenerateNewShortURL , handleGetAnalytics } = require('../controllers/url')
const router = express.Router();
const URL = require('../models/url')


router.post('/' , handleGenerateNewShortURL);

router.get('/analytics/:shortId' , handleGetAnalytics);

router.get('/:shortId' , async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    } ,  { $push: {
        visitHistory: {
            timestamp: Date.now()
        }
    } }
    );
    if(entry===null){
       console.log('null entry')
    }
    else {res.redirect(entry.redirectURL)}
})

module.exports = router;