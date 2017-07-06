var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware");

var passport = require("passport");

// Models
var User = require("../models/user");
var Item = require("../models/item");
// /user/register
router.get("/register", function(req, res) {
    res.render("user/register");
});
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            res.redirect("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/");
        });
    });
});

//Login - user/login
router.get("/login", function(req,res) {
    res.render("user/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/", 
    failureRedirect: "/user/login"
    }), function(req, res) {});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/profile", middleware.isLoggedIn ,function(req, res) {
    Item.find({
        'author.id': req.user._id
    }, function(err, userItems) {
            res.render("user/profile",{ userItems : userItems});
    });
});
module.exports = router;