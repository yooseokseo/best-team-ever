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
 * GET list of all of user's profile. Must be logged in.
 * If logged in, find the with requested name. 
 *
 * @return array of profiles if user is found, error message otherwise
 */
exports.getAllProfiles = (req, res) =>
{
  console.log("GET ALL PROFILES");
  const username = req.userData.username;


  db.all(
    'SELECT profiles.id, firstname, lastname, isDefault FROM accounts, \
     profiles WHERE username=$username AND profiles.account_id = accounts.id',
    {
      $username: username
    },
    // callback function to run when the query finishes:
    (err, rows) => {
      console.log(rows);
      console.log('---');
      if (rows.length > 0) 
      {
        res.status(200).json(rows);
      }
      else 
      {
        res.status(404).json( {error: '\"'+username+'\" does not have any profiles'} );
      }
    });

}

/**
 * Creates new profile. 
 */
exports.newProfile = (req, res) => 
{
  console.log("CREATE NEW PROFILE");
  console.log(req.body);

  db.run(
    `INSERT INTO profiles (profilename, firstName, lastName, dob, gender, isDefault, account_id) \
     VALUES ($profilename, $firstName, $lastName, $dob, $gender, $isDefault, $account_id)`,
    {
      $profilename: req.body.profilename.toLowerCase(),
      $firstName: req.body.firstName,
      $lastName: req.body.lastName,
      $dob: req.body.dob,
      $gender: req.body.gender,
      $isDefault: 0,
      $account_id: req.userData.account_id
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
        res.status(201).json( {message: "profile created", profile: req.body} );
      }
    }
  ); //end of db.run(`INSERT..`) for creating profile 

}

/**
 * GET profile data for an account. Must be logged in.
 * If logged in, find the with requested name. 
 *
 * @return profile information if found, error message otherwise
 */
exports.getProfile = (req, res) =>
{
  console.log("GET PROFILE")
  const username = req.userData.username;
  const profilename = req.params.profilename.toLowerCase();

  db.get(
    `SELECT profiles.id, firstname, lastname, gender, dob, account_id FROM accounts, 
     profiles WHERE profiles.id=$profile_id AND accounts.id = $account_id `,
    {
      $profile_id: req.params.profile_id,
      $account_id: req.userData.account_id
    },
    // callback function to run when the query finishes:
    (err, row) => 
    {
      if (err)
      {
        console.log(err);
        res.status(500).json( {error: err} );
      }
      else
      {
        console.log(row);
        console.log('---');
        row.token = getToken(username, row.account_id, row.id);

        (row)? res.status(200).json(row) :
                           res.status(404).json( 
                            {error: '\"'+profilename+'\" does not exist'} )
      }
    });
 

};

