const express = require("express");
const { handleGenerateNewShortUrl, handleGetUrl, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/:shorturl", handleGetUrl);
router.get("/analytics/:shorturl", handleGetAnalytics);

module.exports = router;
