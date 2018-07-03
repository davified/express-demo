const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

let blogposts = require("./seedData").blogposts;
let users = require("./seedData").users;

const app = express();

app.listen(PORT, function() {});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
  const { body, title, author, image_url, likes = 0 } = req.body;

  if (!(author && (title || body))) {
    res.status(400).json({
      message: "author and either body or title are required"
    });

    return;
  }

  const newPost = {
    id: blogposts.length + 1,
    body,
    title,
    author,
    image_url,
    likes
  };

  blogposts = [...blogposts, newPost];

  res.status(201).json();
});

app.get("/blogposts/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  const requestedPost = blogposts.find(blogpost => blogpost.id === id);

  if (!requestedPost) {
    res.status(404).json();
    return;
  }

  res.json(requestedPost);
});

app.put("/blogposts/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  const requestedPost = blogposts.find(blogpost => blogpost.id === id);

  if (!requestedPost) {
    res.status(404).json();
    return;
  }

  const updatedPost = Object.assign(requestedPost, req.body);

  res.json(updatedPost);
});

app.delete("/blogposts/:id", function(req, res) {
  const requestedId = parseInt(req.params.id, 10);
  blogposts = blogposts.filter(blogpost => blogpost.id !== requestedId);

  res.status(204).json();
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
  res.status(201).json();
});

app.get("/users/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  const requestedUser = users.find(user => user.id === id);

  if (!requestedUser) {
    res.status(404).json();
    return;
  }

  res.json(requestedUser);
});

app.put("/users/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  const requestedUser = users.find(user => user.id === id);

  if (!requestedUser) {
    res.status(404).json();
    return;
  }

  const updatedUser = Object.assign(requestedUser, req.body);

  res.json(updatedUser);
});

app.delete("/users/:id", function(req, res) {
  const requestedId = parseInt(req.params.id, 10);
  users = users.filter(user => user.id !== requestedId);

  res.status(204).json();
});
