const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
let blogposts = require("./seedData").blogposts;
let users = require("./seedData").users;

const app = express();

app.listen(PORT, function() {});

app.get("/", function(req, res) {
  res.json({
    0: "GET       /",
    1: "-----------------------",
    2: "GET       /blogposts",
    3: "GET       /blogposts/:id",
    4: "POST      /blogposts",
    5: "PUT       /blogposts/:id",
    6: "DELETE    /blogposts/:id",
    7: "-----------------------",
    8: "GET       /users",
    9: "GET       /users/:id",
    10: "POST     /users",
    11: "PUT      /users/:id",
    12: "DELETE   /users/:id"
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/blogposts", function(req, res) {
  res.json(blogposts);
});

app.post("/blogposts", function(req, res) {
  const newPost = {
    id: blogposts.length + 1,
    body: req.body.body,
    title: req.body.title,
    author: req.body.author,
    image_url: req.body.image_url,
    likes: 0
  };
  blogposts.push(newPost);
  res.json(blogposts);
});

app.get("/blogposts/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  const requestedPost = blogposts.find(blogpost => blogpost.id === id);

  res.json(requestedPost);
});

app.put("/blogposts/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  const requestedPost = blogposts.find(blogpost => blogpost.id === id);
  const updatedPost = Object.assign(requestedPost, req.body);

  res.json(updatedPost);
});

app.delete("/blogposts/:id", function(req, res) {
  const requestedId = parseInt(req.params.id, 10);
  blogposts = blogposts.filter(blogpost => blogpost.id !== requestedId);

  res.json({
    message: `blogpost with id ${requestedId} deleted successfully.`
  });
});

app.get("/users", function(req, res) {
  res.json(users);
});

app.post("/users", function(req, res) {
  const newUser = {
    id: users.length + 1,
    username: req.body.username,
    age: req.body.age
  };
  users.push(newUser);
  res.json(users);
});

app.get("/users/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  let requestedUser;
  users.forEach(function(element) {
    if (element.id === id) {
      requestedUser = element;
    }
  });
  res.json(requestedUser);
});

app.put("/users/:username", function(req, res) {
  // SAME CODE AS A GET /blogposts/:id REQUEST!
  let requestedUser;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === req.params.username) {
      requestedUser = users[i];
    }
  }

  requestedUser.username = req.body.username;
  requestedUser.age = req.body.age;

  res.json(requestedUser);
});

app.delete("/users/:username", function(req, res) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === req.params.username) {
      users.splice(i, 1);
    }
  }
  res.json(users);
});
