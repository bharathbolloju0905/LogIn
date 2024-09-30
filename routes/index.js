var express = require('express');
var router = express.Router();
const userModel = require("../models/user")

const passport = require('passport');
const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function (req, res) {
  res.render('index',{error:req.flash("error")});
});
router.get('/signup', function (req, res) {
  res.render('signup');
});

router.post("/submit",  (req, res) => {
  const userdata =  new userModel({
    username: req.body.username,
    email: req.body.email,
  });
  userModel.register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function (){
        res.redirect("/home")
      })
    })
})
router.get("/home", isLoggedIn, function (req, res) {
  res.render("home");
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/",
  failureFlash: true
}),(req,res)=>{});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  })
})

function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/");
}

module.exports = router;
