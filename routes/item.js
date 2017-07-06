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
        adtype: req.body.adtype,
        price: req.body.priceFinal,
        title: req.body.title,
        description: req.body.description,
        location: {
            city: req.body.city,
            postal: req.body.postal,
            address: req.body.address
        },
        image : req.body.image,
        contact : { 
            phone: req.body.phone,
            email: req.body.email
        },
        category: {
            id: req.params.category_id
         },
        author: {
            id: req.user._id,
            username: req.user.username 
        },
        promotion: {
            homepage: req.body.homepage,
            top: req.body.top,
            urgent: req.body.urgent,
            highlighted: req.body.highlighted
        }
    };

    Item.create(newItem, function(err, newestItem) {
        if(!err) {
            res.redirect("/");
        }
        });
    });


module.exports = router;