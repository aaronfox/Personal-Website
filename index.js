var express = require('express');
var app = express();

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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
