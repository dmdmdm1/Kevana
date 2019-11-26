var express = require("express");
var router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const sendEmail = require("../config/sendgrid");

// /api/auth/checkuser
router.get("/checkuser", (req, res, next) => {
  if (req.user) {
    res.json({ userDoc: req.user });
  } else {
    res.json({ userDoc: null });
  }
});

// /api/auth/signup
router.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security reasons."
    });
    return;
  }

  User.findOne({ email }).then(foundUser => {
    if (foundUser) {
      res.status(400).json({ message: "Email taken. Choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      email: email,
      password: hashPass
    });

    aNewUser.save().then(newUser => {
      sendEmail(newUser.email, "Stranger");
      req.login(newUser, err => {
        res.status(200).json(newUser);
      });
    });
  });
});

// /api/auth/login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

// /api/auth/logout

router.get("/logout", function(req, res) {
  req.logout();
  res.json({ message: "user logged out " });
});

module.exports = router;
