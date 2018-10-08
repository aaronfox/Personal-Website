var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    methodOverride = require('method-override'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local');
    // MongoDB Schema
    Blog           = require("./models/blog"),
    User           = require('./models/user')

mongoose.Promise = global.Promise;
var express = require('express');
var app = express();

var mongoUrl = process.env.MONGOURL || "mongodb://localhost/blog" 

mongoose.connect(mongoUrl);
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "This isn't really a secret since I'm posting this to GitHub... I should probably use process.env instead",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// NEWLY ADDED
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})
// Test blog CREATION
/*Blog.create({
    title: "Test blog 2",
    image: "http://i3.cpcache.com/product/358827496/lorem_ipsum_dog_tshirt.jpg?width=750&height=750&Filters=%5B%7B%22name%22%3A%22background%22%2C%22value%22%3A%22F2F2F2%22%2C%22sequence%22%3A2%7D%5D",
    body: "Pet Food pet supplies gimme five puppy cage food feathers food heel feathers running pet gate walk lazy dog Spike. Good Boy park lazy dog walk kibble Scooby snacks licks canary. Maine Coon Cat walk catch water dog slobber chew scratcher ID tag litter tuxedo dog house lazy cat park. Dinnertime fetch throw feathers fleas tongue lazy cat lick throw kitten parrot hamster wag tail aquarium chew heel good boy lick feathers cockatiel. Wet Nose food.",
    created: Date.now()
});*/

// Routes
var blogRoutes = require("./routes/blog");
app.use("/blog", blogRoutes);

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/blog', function(req, res) {
    res.render('pages/blog');
});

app.get('/resume', function(req, res) {
    res.render('pages/resume');
});

app.get('/rip_sir_spoonsalot', function(req, res) {
    res.render('pages/rip_sir_spoonsalot');
});

app.get('/cameron', function(req, res) {
    res.render('pages/cameron');
});

app.get('/hunger', function(req, res) {
    res.render('pages/hunger');
})

app.get('/flappy', function (req, res) {
    res.render('pages/flappy');
});

app.get('/flappy_aaron', function (req, res) {
    res.render('pages/flappy_aaron');
});

// AUTH ROUTES

//// Register form
//app.get("/register", function(req, res) {
//    res.render("pages/register");
//});
//
//// Handle sign up logic
//app.post("/register", function(req, res) {
//    var newUser = new User({username: req.body.username});
//    User.register(newUser, req.body.password, function(err, newUser) {
//        if (err) {
//            console.log(err);
//            return res.render("pages/register");
//        }
//        passport.authenticate("local")(req, res, function() {
//            res.redirect("blog/index");
//        });
//    });
//});

// Show login form
app.get("/login", function(req, res) {
    res.render("pages/login");
});

// Handle login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/blog",
    failureRedirect: "/login"
}),  function(req, res) {
//    res.send("login logic woo");
});

// Logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})

// Middleware
function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");   
}

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
