const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');     

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('rest_api/database/users.db');


function getToken(username, email)
{
  const token = jwt.sign(
  {
    username: username,
    email: email
  }, "secret key lel", { expiresIn: "1h" } );
  return token;
}

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

exports.getUserInfo = (req, res) =>
{
  console.log("getUserInfo");
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



exports.getAllProfiles = (req, res) =>
{
  console.log("GET ALL PROFILES");
  const username = req.params.username;

  db.all(
    'SELECT firstname, lastname, isDefault FROM users, profiles WHERE username=$username AND profiles.userid = users.userid',
    {
      $username: username
    },
    // callback function to run when the query finishes:
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows);
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
  console.log("GET PROFILE")
  const profilename = req.params.profilename;


  db.all(
    'SELECT firstname, lastname, isDefault FROM users, \
     profiles WHERE firstname=$profilename AND profiles.userId = users.userId',
    {
      $profilename: profilename
    },
    // callback function to run when the query finishes:
    (err, rows) => 
    {
      if (err)
      {
        console.log(err);
        res.status(500).json( {error: err} );
      }
      else
      {
        console.log(rows);
        (rows.length > 0)? res.status(200).json(rows[0]) :
                           res.status(404).json({})
      }
    });

};

/* seo -comment
Dob should be input, currently it inserts the default DOB, which is "1970-01-01" for test purpose
Token should be testing
1. it creates duplicate users with same username
2. email should be unique so that it should be check from database for the same email before inserts it.
3. username also should be check whether a username is currently used or not in database.
4. need to firgue out how to implement user profiles for each user by using realtive database model in terms of SQL language.

*/
exports.signUp = (req, res, next) =>
{
  console.log('signUp');

  const username = req.body.username;
  const email = req.body.email;
  console.log('email = '+email+'; username = '+username);
  
  db.all(
    'SELECT * FROM users WHERE username=$username OR email=$email',
    {
      $username: username,
      $email: email
    },
    // callback function to run when the query finishes:
    (err, rows) => 
    {
      if (err)
      {
        console.log(err);
        res.status(500).json( {error: err} );
      }
      else
      {
        console.log('rows.length = '+rows.length);
        console.log(rows);

        if (rows.length == 0) //valid username and email
        {
          //attempt to hash password
          bcrypt.hash(req.body.password, 10, (err, hash) =>
          {
            if (!err) //successful hash; store hashed password
            {
              const password = hash;
              db.run(
                "INSERT INTO users (username, password, email) \
                 VALUES ($username, $password, $email)",
                // parameters to SQL query:
                {
                  $username: req.body.username,
                  $password: password,
                  $email: req.body.email,
                },
                // callback function to run when the query finishes:
                (err) => 
                {
                  if (err) 
                  {
                    console.log(err);
                    res.status(500).json( {error: err} );
                  } 
                  else 
                  {
                    const token = getToken(req.body.username, req.body.email);
                    res.status(201).json( {message: "user created", token: token} );
                  }
                }
              );  

            } //end of !err
            else
            {
              return res.status(500).json( {error: err} );
            }
          }); //end of hash
        }
        else //username or email taken
        {
          res.status(409).json( {error: 'username and/or email already exists'} );
        }
      }

    });


  


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
