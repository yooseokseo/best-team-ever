const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('rest_api/database/users.db');
const app = express();

//register a Handlebars - Seo
// views/layouts/main.handlebars will be default Layout
// all partial layouts will be at views/partials
// in order to use partial layout in main.Handlebars
// use {{>partial_layout_file_name_here}}
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Variables for linking to route files
const userRoutes = require("./rest_api/routes/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('static_files'));

// Header (don't worry about this)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes to handle requests
// This is all that really matters
// In Guo's server.js file, he gets list of all users and individual user by doing this:
// app.get('/users', (req, res) => { ... });
// app.get('/users/:userid', (req, res) => { ... });
//
// I'm doing the same thing with the code here, except that I send everything with /users
// to a route file that handles it. The code will be in rest_api/routes/users.js

// Add new router for Home page - Seo
app.get('/home', function (req, res) {
    res.render('home', {
      isHomePage : true,
      pageTitle: "Firstname Last"
    });
});

// Add new router for Add New page - Seo
// Add a flag value so that it tells whether it should generate '<-' button in navigation or not'
app.get('/addNewMed', function (req, res) {
    res.render('addNewMed', {
      backbuttonShow: true,
      pageTitle: "Add New Medicine"
    });
});

// Add new router for View All med page - Seo
app.get('/viewAllMed', function (req, res) {
    res.render('viewAllMed', {
      backbuttonShow: true,
      pageTitle: "Current Medications"
    });
});

// Add new router for View pill detail page - Seo
app.get('/viewPillDetail', function (req, res) {
    res.render('viewPillDetail', {
      backbuttonShow: true,
      pageTitle: "Medication Detail"
    });
});

// Add new router for View History page - Seo
app.get('/viewHistory', function (req, res) {
    res.render('viewHistory', {
      pageTitle: "View History"
    });
});

// Add new router for View History Date page - Seo
app.get('/viewHistoryDate', function (req, res) {
    res.render('viewHistoryDate', {
      pageTitle: "View History"
    });
});

// Add new router for View History Date Detail page - Seo
app.get('/viewHistoryDateDetail', function (req, res) {
    res.render('viewHistoryDateDetail', {
      backbuttonShow: true,
      pageTitle: "View Date Detail"
    });
});

// Add new router for View Pill History page - Seo
app.get('/viewPillHistory', function (req, res) {
    res.render('viewPillHistory', {
      backbuttonShow: true,
      pageTitle: "View Medicine History"
    });
});

// Add new router for View Profiles page - Seo
app.get('/viewProfiles', function (req, res) {
    res.render('viewProfiles', {
      pageTitle: "Manage Profiles"
    });
});

// Add new router for Add a new profile page - Seo
app.get('/addNewProfile', function (req, res) {
    res.render('addNewProfile', {
      backbuttonShow: true,
      pageTitle: "Add a New Profile"
    });
});



// Add new router for settings page - Seo
app.get('/settings', function (req, res) {
    res.render('settings', {
      pageTitle: "Settings"
    });
});

// Add new router for help page - Seo
app.get('/help', function (req, res) {
    res.render('help', {
      pageTitle: "Help"
    });
});

// Add new router for login page - Seo
app.get('/', function (req, res) {
    res.render('login');
});

// Add new router for no user profile page - Seo
app.get('/noUserProfile', function (req, res) {
    res.render('noUserProfile');
});




app.use("/users", userRoutes);


// For error handling (don't worry about this)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// For error handling (don't worry about this)
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


// To learn more about server routing:
// Express - Hello world: http://expressjs.com/en/starter/hello-world.html
// Express - basic routing: http://expressjs.com/en/starter/basic-routing.html
// Express - routing: https://expressjs.com/en/guide/routing.html


module.exports = app;
