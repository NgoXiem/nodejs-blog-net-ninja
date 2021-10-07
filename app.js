const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
// espress app
const app = express();
// connect to MongoDB
const dbURI =
  "mongodb+srv://xiemngo_01:23031995@cluster0.qaws3.mongodb.net/nodejs-stoicism?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((error) => console.log(error));
// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// home
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// about
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "All Blogs",
        blogs: result,
      });
    })
    .catch((error) => console.log(error));
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => console.log(error));
});
// create

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((error) => console.log(error));
});

// delete
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => console.log(error));
});

// 404 pages

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
