var express = require("express");
var axios = require("axios");
var { Duration } = require("luxon");
var router = express.Router();
var urlParse = require("url-parse");

let Video = require("../models/video");

// GET /api/videos
router.get("/", function(req, res, next) {
  // this gives all the videos in the database as a JSON
  Video.find({})
    .then(videos => {
      res.json(videos);
    })
    .catch(err => {
      console.log("error while looking for the videos");
      res.json(err);
    });
});

// GET /api/videos/o1i72367458523dasdztr
router.get("/:id", function(req, res, next) {
  Video.findById(req.params.id)
    .then(video => {
      res.json(video);
    })
    .catch(err => {
      res.json(err);
    });
});

// POST /api/videos
router.post("/", (req, res, next) => {
  const url = urlParse(req.body.videoUrl, true);
  console.log("url", url);
  if (url.host === "www.youtube.com" && url.query.v) {
    const id = url.query.v;
    axios
      .get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          part: "snippet,contentDetails",
          key: process.env.YOUTUBE_API_KEY,
          id
        }
      })
      .then(response => {
        const video = response.data.items[0];
        console.log(video);

        return Video.create({
          owner: req.user._id,
          video_id: id,
          link: req.body.videoUrl,
          title: video.snippet.title,
          channel: video.snippet.channelTitle,
          length: Duration.fromISO(video.contentDetails.duration).as("seconds"),
          description: video.snippet.description.substring(0, 140),
          image: video.snippet.thumbnails.high.url
        });
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ error: "Invalid URL supplied!" });
  }
});

module.exports = router;
