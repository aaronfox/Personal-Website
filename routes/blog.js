var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");

// Here, "/" is equal to "blog"
router.get("/", function(req, res) {
    // Retrieve blogs from database
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err + "\nHI AARON");
            res.redirect("/");
        } else {
            res.render("pages/blog/index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
router.get("/new", function(req, res) {
    res.render("pages/blog/new");
});

// CREATE ROUTE
router.post("/", function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render("pages/blog/new");
        } else {
            res.redirect("/blog");
        }
    });
});

// SHOW ROUTE
router.get("/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blog");
        } else {
            res.render("pages/blog/show", {blog: foundBlog});
        }
    });
});

module.exports = router;