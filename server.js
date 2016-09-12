// 1. SETTING UP THE DEPENDENCIES
var express = require('express')
var bodyParser = require('body-parser')

var port = 3000

// 2. INSTANTIATING THE APP
var app = express()

app.listen(port, function () {
  console.log('your app is ready at port 3000!')
})

// mounting sub-app: view engine (ejs)
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('homepage')
})

// 3.3 setting up body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// res.send('whatever'), res.render('ejs-filename'),
// res.json({key: "value"}),

var blogposts = [
  {
    title: 'this is my FIRST blogpost',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {
    title: 'this is my SECOND blogpost',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {
    title: 'this is my THIRD blogpost',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
]

app.get('/blogposts', function (req, res) {
  res.json(blogposts)
})

app.get('/blogposts/:id', function (req, res) {
  console.log(req.params.id)
  var id = req.params.id
  res.json(blogposts[id])
})

var users = [ {id: 0, username: 'david-tan', age: 28}, {id: 1, username: 'tang-wei', age: 50}, {id: 2, username: 'jonathan', age: 90}, {id: 3, username: 'yvonne', age: 20},]

// localhost:3000/users
// localhost:3000/users/2

app.get('/users', function(req, res) {
  res.json(users)
})

app.get('/users/:id', function(req, res) {
  var id = req.params.id
  var requestedUser
  users.forEach(function(element) {
    if (element.id == id) {
      requestedUser = element
    }
  })
  res.json(requestedUser)
})

app.post('/users', function(req, res) {
  console.log(req)
  var newUser = {
    id: users.length + 1,
    username: req.body.username,
    age: req.body.age
  }
  users.push(newUser)
  res.json(users)
})

app.post('/blogposts', function(req, res) {
  // your code here
})
