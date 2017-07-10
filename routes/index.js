var express = require("express"),
    router = express.Router();

// MODEL
var Category    = require("../models/category");
var Item        = require("../models/item");
// INDEX - " /"
router.get("/", function(req, res) {
    Category.find({}, function(err, allCategories){
        if(!err){
            Item.find({
                'promotion.top': 'true'
            }, function(err, topItems) {
                res.render("index", {
                    categories:allCategories,
                    topItems: topItems
                });
            });
        }
    });
});


module.exports = router;