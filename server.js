// 1. SETTING UP THE DEPENDENCIES
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var port = process.env.PORT || 3000

// 2. INSTANTIATING THE APP
var app = express()

app.listen(port, function () {
  console.log('your app is ready at port 3000!')
})

// mounting sub-app: view engine (ejs)
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.json({
    0: 'GET    /',
    1: '-----------------------',
    2: 'GET    /blogposts',
    3: 'GET    /blogposts/:id',
    4: 'POST   /blogposts',
    5: 'PUT    /blogposts/:id',
    6: 'DELETE    /blogposts/:id',
    7: '-----------------------',
    8: 'GET    /users',
    9: 'GET    /users/:id',
    10: 'POST    /users',
    11: 'PUT    /users/:id',
    12: 'DELETE    /users/:id'
  })
})

app.use(cors())

// 3.3 setting up body-parser
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

// res.send('whatever'), res.render('ejs-filename'),
// res.json({key: "value"}),

var blogposts = [
  {
    id: 1,
    title: 'this is my FIRST blogpost',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {
    id: 2,
    title: 'this is my SECOND blogpost',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {
    id: 3,
    title: 'this is my THIRD blogpost',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
]

app.get('/blogposts', function (req, res) {
  res.json(blogposts)
})

app.get('/blogposts/:id', function (req, res) {
  var id = req.params.id
  var requestedPost
  for (var i = 0; i < blogposts.length; i++) {
    if (blogposts[i].id == id) {
      requestedPost = blogposts[i]
    }
  }
  res.json(requestedPost)
})

app.put('/blogposts/:id', function (req, res) {
  // SAME CODE AS A GET /blogposts/:id REQUEST!
  var id = req.params.id
  var requestedPost
  for (var i = 0; i < blogposts.length; i++) {
    if (blogposts[i].id == id) {
      requestedPost = blogposts[i]
    }
  }

  // this part is different. we extract the contents of the req.body object, and update the requestedPost object accordingly.
  requestedPost.title = req.body.title
  requestedPost.body = req.body.body

  res.json(blogposts)
})

app.put('/users/:username', function (req, res) {
  // SAME CODE AS A GET /blogposts/:id REQUEST!
  var requestedUser
  for (var i = 0; i < users.length; i++) {
    if (users[i].username == req.params.username) {
      requestedUser = users[i]
    }
  }

  requestedUser.username = req.body.username
  requestedUser.age = req.body.age

  res.json(requestedUser)
})

app.delete('/users/:username', function (req, res) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].username == req.params.username) {
      users.splice(i, 1)
    }
  }
  res.json(users)
})

var users = [
  {id: 0, username: 'david-tan', age: 28},
  {id: 1, username: 'tang-wei', age: 50},
  {id: 2, username: 'jonathan', age: 90},
  {id: 3, username: 'yvonne', age: 20}]

// localhost:3000/users
  // localhost:3000/users/2

app.get('/users', function (req, res) {
  res.json(users)
})

app.get('/users/:id', function (req, res) {
  var id = req.params.id
  var requestedUser
  users.forEach(function (element) {
    if (element.id == id) {
      requestedUser = element
    }
  })
  res.json(requestedUser)
})

app.post('/users', function (req, res) {
  console.log(req)
  console.log(req.body)
  var newUser = {
    id: users.length + 1,
    username: req.body.username,
    age: req.body.age
  }
  users.push(newUser)
  res.json(users)
})

app.post('/blogposts', function (req, res) {
  console.log(req.body)
  var newPost = {
    id: blogposts.length + 1,
    body: req.body.body,
    title: req.body.title
  }
  blogposts.push(newPost)
  res.json(blogposts)
})
