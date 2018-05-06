const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');     

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('rest_api/database/users.db');


/**
 * Helper function for generating JWT token based on useranme
 *
 * @param {username} username to put in token; used for authentication; REQUIRED
 * @param {account_id} id to put in token; used for finding account; REQUIRED
 * @param {profile_id} used for finding profile; OPTIONAL
 * @param {password} used for resetting password; OPTIONAL
 *
 * @return JWT token
 */
function getToken(username, account_id, profile_id, password)
{
  const token = { username: username, account_id: account_id };
  
  // add profile_id and/or password to token if not undefined
  (profile_id == undefined)? {} : token.profile_id = profile_id;
  (password == undefined)? {} : token.password = password;


  return jwt.sign(token, "secret key lel", { expiresIn: "1h" } );
}

/**
 * GET a list of all accounts. Only show usernames of user and nothing
 * else. Obviously only used for debugging (would be a breach if you show
 * everyone all accounts in database). Don't need to be signed in.
 *
 * @return array of usernames of all users
 */
 /**
 * GET list of all accounts. Only show usernames of user and nothing
 * else. Obviously only used for debugging (would be a breach if you show
 * everyone all accounts in database). Don't need to be signed in.
 *
 * Route signature: GET /accounts
 * Example call: localhost:3000/profiles
 * Expected: none
 *
 * @return 1) error 500 if error occured while searching for accounts. Otherwise
 *            -> {keys -> error}
 *         2) array of all accounts
 *            -> [ list of all accounts ]
 */
exports.getAllAccounts = (req, res) => 
{
  console.log('GET ALL ACCOUNTS');

  db.all(`SELECT username FROM accounts`, (err, rows) => 
  {
    if (err)
    {
      console.log(err);
      res.status(500).json( {error: err} );
    }
    else
    {
      const allUsernames = rows.map(e => e.username);
      console.log(allUsernames);
      res.status(200).json(allUsernames);
    }
    
  });

} // end of getAllAccounts()


 /**
 * Creates an account. If the inputted username and email doesn't exist,
 * create new account with the information and generate JWT token with
 * username.
 *
 * Route signature: POST /accounts/signup
 * Example call: localhost:3000/accounts/signup
 * Expected: body {username, email, password}
 *
 * @return 1) error 500 if error occured while creating account or hashing password
 *            -> {keys -> error}
 *         2) new token if valid username and/or email
 *            -> {keys -> message, token}
 *         3) error 409 (Conflict) if username and/or email already taken
 *            -> {keys -> error}
 */
exports.signup = (req, res) =>
{
  console.log('SIGNUP');

  const username = req.body.username;
  const email = req.body.email;
  
  db.all(
    `SELECT * FROM accounts WHERE username=$username OR email=$email`,
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
        console.log('Username and/or email already exists: ',rows.length != 0);
        if (rows.length == 0) //valid username and email
        {
          //attempt to hash password
          bcrypt.hash(req.body.password, 10, (err, hash) =>
          {
            if (!err) //successful hash; store hashed password
            {
              const password = hash;
              db.run(
                `INSERT INTO accounts (username, password, email) 
                 VALUES ($username, $password, $email)`,
                {
                  $username: username,
                  $password: password,
                  $email: email,
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
                    // find id of the newly created account
                    const query = "SELECT * FROM accounts WHERE username=?";
                    db.get(query, username, (err, account) =>
                    {
                      console.log('created account: ',account);
                      const token = getToken(username, account.id);
                      res.status(201).json( {message: "Account created", token: token} );
                    });
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
    }
  ); // end of db.all(...)

} // end of signup()


/**
 * Logs user in. First checks if user with the requested username
 * exists. If so, check if the password (after hashing it) is correct.
 * If so, create token with username.
 *
 * Route signature: POST /accounts/login
 * Example call: localhost:3000/accounts/login
 * Expected: body {username, password}
 *
 * @return 1) error 500 if error occured while searching for account. Otherwise
 *            -> {keys -> error}
 *         2) token if correct username and password, or 
 *            -> {keys -> message, token}
 *         3) error error 401 (Unauthorized) if incorrect password, or
 *            -> {keys -> error}
 *         3) error 404 (Not Found) if account with that username doesn't exist
 *            -> {keys -> error}
 */
exports.login = (req, res) =>
{
  console.log('LOGIN');

  const username = req.body.username;
  const password = req.body.password;

  db.all(
    `SELECT * FROM accounts WHERE username=$username`,
    {
      $username: username
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
        if (rows.length != 0) //found user
        {
          //check if password is correct
          bcrypt.compare(password, rows[0].password, (err, result) =>
          {
            if (err || !result)
            {
              console.log("Incorrect password")
              res.status(401).json( {error: "incorrect password"} );
            }
            if (result)
            {
              console.log("Log in successful");
              const token = getToken(username, rows[0].id );
              res.status(200).json( {message: "Logged in", token: token} );
            }

          });
        }
        else //user not found; doesn't exist or incorrect username
        {
          res.status(404).json( {error: '\"'+username+'\" does not exist'} );
        }
      }
    } // end of (err, row) =>
  ); // end of db.all(..)

} // end of login()


/**
 * Gets account's info (username, email, password). Must be logged in
 * If logged in, find the account info. 
 *
 * Route signature: GET /accounts/info
 * Example call: localhost:3000/accounts/info
 * Expected: token
 *
 * @return 1) error 500 if error occured while searching for account. Otherwise
 *            -> {keys -> error}
 *         2) account info if found, or
 *            -> {keys -> id, username, password, email}
 *         3) error 404 (Not Found) if account does not exist
 *            -> {keys -> error}
 * @return user's info if requested user exists, error message otherwise
 */
exports.getAccountInfo = (req, res) =>
{
  console.log("GET ACCOUNT INFO");
  const username = req.userData.username;

  db.all(
    `SELECT * FROM accounts WHERE username=$username`,
    {
      $username: username
    },
    // callback function to run when the query finishes:
    (err, rows) => 
    {
      if (rows.length > 0) 
      {
        console.log(rows[0]);
        console.log('---');
        res.status(200).json(rows[0]);
      } 
      else 
      {
        res.status(404).json( {error: '\"'+username+'\" does not exist'} );
      }
    }
  ); // end of db.all(..)

} // end of getAccountInfo()