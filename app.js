// EXPRESS
var express             = require("express"),
    app                 = express();
// MODULES
var bodyParser          = require("body-parser"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    mongoose            = require("mongoose"),
    validator           = require("express-validator"),
    flash               = require("connect-flash");

//MODELS
var User                = require("./models/user");
var item                = require("./models/item");
var Category            = require("./models/category");
//ROUTES
var indexRoutes         = require("./routes/index");
var itemRoutes          = require("./routes/item");
var userRoutes          = require("./routes/user");
var categoryRoutes      = require("./routes/category");

mongoose.connect("mongodb://localhost/argxCommerce");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(validator());
app.use(flash());

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css')); // redirect CSS bootstrap

app.use(require("express-session")({
    secret: "adBoard",
    resave: false,
    saveUninitialized: false
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/item", itemRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);


app.listen(3000, process.env.IP, function() {
    console.log("argxCommerce server started!");
});
