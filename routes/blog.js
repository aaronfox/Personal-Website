var express = require("express");
var router = express.Router();
// Here, "/" is equal to "blog"
router.get("/beginning", function(req, res) {
    res.render("pages/blog/beginning");
 });

router.get("/adventures_in_europe", function (req, res) {
    res.render("pages/blog/adventures_in_europe");
});

router.get("/algorithms", function (req, res) {
    res.render("pages/blog/algorithms");
});

router.get("/life_update_2018", function (req, res) {
    res.render("pages/blog/life_update_2018");
});


module.exports = router;

// Note: To add a blog post: do the following
// Create a new blog EJS post under views/pages/blog/<your_post_here.ejs>
// Update route in blog.js by adding a new router.get(...) ABOVE the module.exports = router line
// Update the route leading to it in views/pages/blog.ejs
