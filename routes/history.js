var express = require("express");
var router = express.Router();

let History = require("../models/history");

// GET /api/history/
router.get("/", function(req, res, next) {
  History.find({})
    .sort({ updatedAt: -1 })
    .limit(20)
    .populate("user_name")
    .populate("practiced_video")
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log("error while looking for the history");
      res.json(err);
    });
});

// POST api/history/436267434762633253
router.post("/practiced/:id", (req, res, next) => {
  History.create({
    user_name: req.user._id,
    practiced_video: req.params.id
  })
    .then(response => {
      console.log("response", response);
      res.json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
