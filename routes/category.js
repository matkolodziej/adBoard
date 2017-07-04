
var express = require("express"),
    router = express.Router();

// MODEL
var Category = require("../models/category");
var Item = require("../models/item");
// INDEX - " /category/new "
router.route("/")
    .get(function(req, res) {
        Category.find({}, function(err, parentCategory){
                if(err){
                    console.log(err);
                } else {
                    res.render("category/new", {categories:parentCategory});
                }
            });
    })
    .post(function(req, res) {
        var newCategory = {
            name: req.body.name,
            parent: {
                id: req.params.category_id,
                name: req.body.parent
            }
        };
        Category.create(newCategory, function(err, newestCategory) {
            if(!err) {
                res.redirect("/category");
            }
        });
    });

router.get("/:category_id", function(req, res) {
    Item.find({ 'category.id' : req.params.category_id }, function(err, foundItems) {
        res.render("category/show", {allItems : foundItems});
    });
});

module.exports = router;