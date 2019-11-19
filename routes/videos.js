var express = require('express');
var router = express.Router();

let Video = require('../models/video')

// GET /api/videos
router.get('/', function (req, res, next) {
    console.log("/api/videos is called")
    // this gives all the videos in the database as a JSON
  Video.find({}).then((videos) => {
    res.json(videos)
  }).catch(err => {
      console.log("error while looking for the videos")
    res.json(err);
  })
});


// GET /api/videos/o1i72367458523dasdztr
router.get('/:id', function (req, res, next) {
    console.log("single video request GET is called: " + req.params.id)
  Video.findById(req.params.id).then((video) => {
    console.log("video: " + video)
      res.json(video)
  }).catch(err => {
    res.json(err);
  })
});

// POST /api/videos
router.post('/', (req, res, next) => {
  console.log('I am here.')

  // WIP: this should take a link (in req.body.title), query the youtube API, single out what we need
  // so we can use it in the step below

  
  Video.create({
      owner : "5dd015c1eb56242e6d92f92f",
      video_id: "UEEsdXn8oG8",
      link: "https://www.youtube.com/watch?v=UEEsdXn8oG8",
      title: "!Wake Up Yoga - 11 Minute Morning Yoga Practice - Yoga With Adriene",
      channel: "Yoga With Adriene",
      length: 693
/* 
    owner: req.user._id ,
  link: String,
  title : String,
  channel: String,
length: Number */
  })
    .then(response => {
      // { _id: '1283t2iu3t427g', title: 'Abc', description: 'Whatever' }
      // res.json(response);
      res.json({ message: 'video created' })
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;
