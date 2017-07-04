var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware");
// MODEL
var Item = require("../models/item");
var Category = require("../models/category")


router.get("/", function(req, res) {
    Category.find({}, function(err, allCategories){
        if(!err){
            res.render("item/category_new", {categories:allCategories});
        }
    });
});
// Details
router.get("/:item_id", function(req, res){
    Item.findById(req.params.item_id).exec(function(err, foundItem){
        if(!err) {
            res.render("item/detail", {item: foundItem});
        }
    });
});
router.route("/:category_id")
    .get(function(req, res){
        Category.findById(req.params.category_id, function(err, categoryDetail) {
            if(!err) {
                res.render("category/show", {category:categoryDetail})
            }
        });
    });
// /item/category_id/new
router.get("/:category_id/new", middleware.isLoggedIn, function(req,res) {
    // Finds in which category to add new item
    Category.findById(req.params.category_id, function(err, category) {
        res.render("item/new", {category: category});
    });
});

// /item
router.post("/:category_id", middleware.isLoggedIn, function(req, res){
    var newItem = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    author: {
        id: req.user._id,
        username: req.user.username 
    },
    category: {
        id: req.params.category_id,
        name: req.body.categoryName// Not working to be implemented as long there is ID it's minor.
    }
    };
    Item.create(newItem, function(err, newestItem) {
        if(!err) {
            res.redirect("/shop");
        }
        });
    });


module.exports = router;