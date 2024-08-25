const shortid = require("shortid")
const URL = require('../models/url'); 
const { cookie } = require("express/lib/response");
async function handleGenerateNewShortURL(req , res){
      const body = req.body;
      if(!body.url) return res.status(400).json({error: 'url is required'})
      const shortID = shortid();

      const existingURL = await URL.findOne({ redirectURL: body.url });
      if (existingURL) {
          return res.status(400).json({ error: 'URL already exists' });
      }
      
      await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
      });

      return res.render("home" , {
        id: shortID,
        urls: await URL.find({createdBy: req.user._id}),
        cookie  : req.cookies.uid,
    });
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length , 
        analytics: result.visitHistory
    })
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}