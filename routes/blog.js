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
            res.render("pages/blog/index", {blogs: blogs, currentUser: req.user});
        }
    });
});

// NEW ROUTE
router.get("/new", isLoggedin, function(req, res) {
    res.render("pages/blog/new");
});

// CREATE ROUTE
router.post("/", isLoggedin, function(req, res) {
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

// EDIT ROUTE
router.get("/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blog");
        } else {
            res.render("pages/blog/edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
router.put("/:id", function(req, res) {
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
       if (err) {
           res.redirect("/blog");
       } else {
           res.redirect("/blog/" + req.params.id);
       }
   }) 
});

// DELETE ROUTE
router.delete("/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/blog");
        } else {
            res.redirect("/blog");
        }
    });
});


// Middleware
function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");   
}
module.exports = router;