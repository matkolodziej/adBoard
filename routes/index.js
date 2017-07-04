var express = require("express"),
    router = express.Router();

// MODEL
var Category = require("../models/category");

// INDEX - " /"
router.get("/", function(req, res) {
    Category.find({}, function(err, allCategories){
        if(!err){
            res.render("index", {
                categories:allCategories
                }
            );
        }
    });
});


module.exports = router;