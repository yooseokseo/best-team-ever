const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3');

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('users.db');


// GET a list of all usernames
//
// To test, open this URL in your browser:
//   http://localhost:3000/users
exports.getAll = (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT username FROM users', (err, rows) => {
    console.log(rows);
    const allUsernames = rows.map(e => e.username);
    console.log(allUsernames);
    res.send(allUsernames);
  });

}

exports.getUser = (req, res) =>
{
  const nameToLookup = req.params.username;
  db.all(
    'SELECT * FROM users WHERE username=$username',
    {
      $username: nameToLookup
    },
    // callback function to run when the query finishes:
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.send({}); // failed, so return an empty object instead of undefined
      }
    });
}


// GET profile data for a user
//
// To test, open these URLs in your browser:
//   http://localhost:3000/users/Philip
//   http://localhost:3000/users/Carol
//   http://localhost:3000/users/invalidusername
exports.getProfile = (req, res) =>
{
  const username = req.params.username; // matches ':username' above
  const profilename = req.params.profilename;

  const user = fakeDatabase.find(function(e)
  {
    return e.username == username;
  });

  if (!user) //username not in system
  {
    res.send({})
  }

  const profile = user.profiles.find(e =>
  {
    return e.name == profilename;
  });

  (profile)? res.send(profile.info) : res.send({});

  console.log(username, '->', profile); // for debugging

};

/* seo -comment
Dob should be input, currently it inserts the default DOB, which is "1970-01-01" for test purpose
Token should be testing
1. it creates duplicate users with same username
2. email should be unique so that it should be check from database for the same email before inserts it.
3. username also should be check whether a username is currently used or not in database.
4. need to firgue out how to implement user profiles for each user by using realtive database model in terms of SQL language.

*/
exports.signUp = (req, res) =>
{
  db.run(
    'INSERT INTO users VALUES ($username, $password, $email, "1970-01-01")',
    // parameters to SQL query:
    {
      $username: req.body.username,
      $password: req.body.password,
      $email: req.body.email,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send({message: 'error in app.post(/users)'});
      } else {
        res.send({message: 'successfully run app.post(/users)'});
      }
    }
  );


/*
  const token = jwt.sign(
  {
    email: req.body.email,
    username: req.body.username
  }, "secret key lel", { expiresIn: "1h" } );

  console.log("token");
  console.log("token = "+token);

  res.status(200).json(
  {
    message: "Auth successful",
    token: token
    body: req.body
  });
*/
}// end of sign up

exports.testauth = (req, res, next) =>
{
  console.log("in test auth function")
  console.log(req.userData);
  res.send(req.userData);
}
