const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
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
app.use("/blogs", blogRoutes);

// 404 pages

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
