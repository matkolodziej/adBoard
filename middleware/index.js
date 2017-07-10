var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/user/login");
};

middlewareObj.checkRegisterForm = function(req, res, next) {
    req.checkBody("username", "Make sure that Username field is not empty.").notEmpty();
    req.checkBody("password", "Make sure that Password field is not empty.").notEmpty();
    req.checkBody("email", "Please provide proper email.").isEmail();
    var errors = req.validationErrors();
    
    if(errors) {
        req.flash("error", errors);
        return next();
    } else {
        return next();
    }
};

middlewareObj.checkAdPostForm = function(req, res, next) {
    
    req.checkBody("title", "Please provide Title.").notEmpty();
    req.checkBody("description", "Please provide Description.").notEmpty();
    req.checkBody("city","Please provide City.").notEmpty();
    req.checkBody("postal","Please provide Postal Code.").notEmpty();
    req.checkBody("address","Please provide Street Address.").notEmpty();
    req.checkBody("email", "Enter valid email address.").isEmail();

    var errors = req.validationErrors();

    if(errors) {
        req.flash("error", errors);
        res.redirect("/item/" + req.params.category_id + "/new");
    } else {
        return next();
    }
};

module.exports = middlewareObj;