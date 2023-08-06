const shortid = require("shortid");
const URL = require("../models/url")


async function handleGenerateNewShortUrl(req, res) {
  const shortId = shortid.generate(8);

    if(!req.body.url){
        res.status(401).json({error: "please pass an URL first"});
    }
    await URL.create({
        shortId: shortId,
        redirectUrl: req.body.url,
        visitHistory: [],
        createdBy: req.user._id
    });

    return res.render("home", {shortId: shortId});
//   return res.json({id: shortId});
}

async function handleGetUrl(req, res){
    const shorturl = req.params.shorturl;
    const entry = await URL.findOneAndUpdate({shortId: shorturl}, {$push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }}
    )
    
    res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res){
    const shorturl = req.params.shorturl;
    const result = await URL.findOne({shortId: shorturl});

    if(!result){
        res.status(401).json({error: "no such url exist"})
    }
    else{
        res.status(200).json({clicks: result.visitHistory.length, analytics: result});
    }
}


module.exports = {
  handleGenerateNewShortUrl,
  handleGetUrl,
  handleGetAnalytics,
};
