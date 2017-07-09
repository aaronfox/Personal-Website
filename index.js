var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    // MongoDB Schema
    Blog          = require("./models/blog");

mongoose.Promise = global.Promise;
var express = require('express');
var app = express();

var mongoUrl = process.env.MONGOURL || "mongodb://localhost/blog" 
mongoose.connect(mongoUrl);
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


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

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
