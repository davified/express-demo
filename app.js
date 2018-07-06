const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

let { blogposts, users } = require("./seedData");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json({
    0: "GET       /api-docs",
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

app.get("/blogposts", (req, res, next) => res.json(blogposts));

app.post("/blogposts", (req, res, next) => {
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

app.get("/blogposts/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const requestedPost = blogposts.find(blogpost => blogpost.id === id);

  if (!requestedPost) next();
  else res.json(requestedPost);
});

app.put("/blogposts/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const requestedPost = blogposts.find(blogpost => blogpost.id === id);

  if (!requestedPost) next();
  else {
    const updatedPost = { ...requestedPost, ...req.body };
    res.json(updatedPost);
  }
});

app.delete("/blogposts/:id", (req, res, next) => {
  const requestedId = Number(req.params.id);
  blogpostToDelete = blogposts.find(blogpost => blogpost.id !== requestedId);
  if (blogpostToDelete) {
    blogposts = blogposts.filter(blogpost => blogpost.id !== requestedId);
    res.status(204).json();
  } else {
    next();
  }
});

app.get("/users", (req, res, next) => res.json(users));

app.post("/users", (req, res, next) => {
  const { username, age } = req.body;

  const newUser = {
    id: users.length + 1,
    username,
    age
  };

  users = [...users, newUser];
  res.status(201).json();
});

app.get("/users/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const requestedUser = users.find(user => user.id === id);

  if (!requestedUser) {
    next();
  } else {
    res.json(requestedUser);
  }
});

app.put("/users/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const requestedUser = users.find(user => user.id === id);

  if (!requestedUser) {
    next();
  } else {
    const updatedUser = { ...requestedUser, ...req.body };
    res.json(updatedUser);
  }
});

app.delete("/users/:id", (req, res, next) => {
  const requestedId = Number(req.params.id);
  users = users.filter(user => user.id !== requestedId);

  res.status(204).json();
});

app.use((req, res, next) => {
  res.status(404).json({ message: "404 error. resource not found" });
});

module.exports = app;
