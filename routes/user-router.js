const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const UserModel = require("../models/user-model");
const router = express.Router();

router.get("/signup", (req, res, next) => {
    if (req.user) {
        res.redirect("/");
        return;
    }
    res.render("user-views/signup-page");
});

router.post("/process-signup", (req, res, next) => {
    if (req.body.signupPassword.length < 8
    ) {
        res.locals.errorMessage = "Password must be at least 8 characters.";
        res.render("user-views/signup-page");
        return;
    }
    UserModel.findOne({ email: req.body.signupEmail })
      .then((userFromDb) => {
          if (userFromDb !== null) {
              res.locals.errorMessage = "Email is taken.";
              res.render("user-views/signup-page");
              return;
          }
          const salt = bcrypt.genSaltSync(10);
          const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);
          const theUser = new UserModel({
              email:    req.body.signupEmail,
              encryptedPassword: scrambledPassword
          });
          return theUser.save();
      })
      .then(() => {
          res.redirect("/");
      })
      .catch((err) => {
          next(err);
      });
});

router.get("/login", (req, res, next) => {
    if (req.user) {
        res.redirect("/");
        return;
    }

    res.render("user-views/login-page");
});

router.post("/process-login", (req, res, next) => {
    UserModel.findOne({ email: req.body.loginEmail })
      .then((userFromDb) => {
          if (userFromDb === null) {
              res.locals.errorMessage = "Email incorrect.";
              res.render("user-views/login-page");
              return;
          }
          const isPasswordGood = bcrypt.compareSync(req.body.loginPassword, userFromDb.encryptedPassword);
          if (isPasswordGood === false) {
              res.locals.errorMessage = "Password incorrect.";
              res.render("user-views/login-page");
              return;
          }
          req.login(userFromDb, (err) => {
              if (err) {
                  next(err);
              }
              else {
                  res.redirect("/");
              }
          });
      })
      .catch((err) => {
          next(err);
      });
});
router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
});
module.exports = router;
