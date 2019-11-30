var express = require("express");
var router = express.Router();

let User = require("../models/user");

// /api/profile/o1i72367458523dasdztr
router.get("/:id", function(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      res.json({
        userId_: user._id,
        userName: user.userName,
        favorites: user.favorites,
        follows: user.follows
      });
    })
    .catch(err => {
      console.log("error while looking for the profile");
      res.json(err);
    });
});

// api/profile/follow/fd2z389rh2983z92h3d
router.put("/follow/:id", (req, res, next) => {
  const video = req.params.id;
  const user = req.user._id;
  axios.findByIdAndUpdate(user, {
    $push: { follows: video }
  });
});

// api/profile/unfollow/fd2z389rh2983z92h3d
router.put("/unfollow/:id", (req, res, next) => {
  const video = req.params.id;
  const user = req.user._id;
  axios.findByIdAndUpdate(user, {
    $pull: { follows: video }
  });
});

module.exports = router;
