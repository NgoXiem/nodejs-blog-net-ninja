const express = require("express");

// espress app
const app = express();

// register view engine
app.set("view engine", "ejs");

// listen for requests
app.listen(3000);

// home
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

// about
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// create

app.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 pages

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
