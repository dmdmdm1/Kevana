var express = require("express");
var router = express.Router();

let User = require("../models/user");

// /api/profile/o1i72367458523dasdztr
router.get("/:id", function(req, res, next) {
  User.findById(req.params.id).then(user => {
      res.json({
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

module.exports = router;
