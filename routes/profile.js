var express = require("express");
var router = express.Router();

let User = require("../models/user");

// // /api/projects
// router.get('/', function (req, res, next) {

//   // we're in express land !! ()
//   Project.find({ owner: req.user._id }).then((projects) => {
//     res.json(projects)
//   })
// // });

// userName: String,
//   email: String,
//   password: String,
//   favorites : [ {type: Schema.Types.ObjectId, ref: 'Video'}],
//   follows: [{ type: Schema.Types.ObjectId, ref: 'User'}]

// /api/profile/    <= should show users own profile
router.get("/", function(req, res, next) {
  User.findById(req.user._id).then(user => {
    res.json({
      userName: user.userName,
      email: user.email,
      favorites: user.favorites,
      follows: user.follows
    });
  });
  console.log("req.user = " + req.user);
});

// /api/profile/o1i72367458523dasdztr
router.get("/:id", function(req, res, next) {
  User.findById(req.params.id).then(user => {
    if (req.user._id === req.params.id) {
      res.json({isUser:true});
    } else {
      res.json({
        userName: user.userName,
        favorites: user.favorites,
        follows: user.follows,
        isUser:false
      });
    }
  });
  console.log("req.user = " + req.user);
  console.log("req.params.id = " + req.params.id);
});

module.exports = router;
