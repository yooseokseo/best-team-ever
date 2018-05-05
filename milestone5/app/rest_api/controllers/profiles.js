const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');     

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('rest_api/database/users.db');


/**
 * GET list of all of user's profile. Must be logged in.
 * After token is checked, function checks to make sure that
 * token is valid for the requested user. If so, finds the 
 * with requested name. 
 *
 * @return array of profiles if user is found, error message otherwise
 */
exports.getAllProfiles = (req, res) =>
{
  console.log("GET ALL PROFILES");
  const username = req.params.username;

  console.log('request for: '+username+'; token valid for: '+req.userData.username);
  if (req.userData.username === req.params.username)
  {
    db.all(
      'SELECT firstname, lastname, isDefault FROM accounts, \
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
  else
  {
    console.log('Token and requested username does not match\n---')
    res.status(401).json( {error: 'please log in again'} );
  }
}

/**
 * Creates new profile. 
 */
exports.newProfile = (req, res) => 
{
  console.log("CREATE NEW PROFILE");
  console.log(req.body);


  const username = req.params.username;


  console.log('request for: '+username+'; token valid for: '+req.userData.username);
  if (req.userData.username === req.params.username)
  {
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
        $account_id: req.userData.id
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
  else
  {
    console.log('Token and requested username does not match\n---')
    res.status(401).json( {error: 'please log in again'} );
  }
}

/**
 * GET profile data for an account. Must be logged in.
 * After token is checked, function checks to make sure that
 * token is valid for the requested user. If so, finds the 
 * with requested name. 
 *
 * @return profile information if found, error message otherwise
 */
exports.getProfile = (req, res) =>
{
  console.log("GET PROFILE")
  const username = req.params.username;
  const profilename = req.params.profilename.toLowerCase();

  console.log('request for: '+username+'; token valid for: '+req.userData.username);
  if (req.userData.username === req.params.username)
  {
    db.all(
      `SELECT profiles.id, firstname, lastname, gender, dob, account_id FROM accounts, 
       profiles WHERE profilename=$profilename AND profiles.account_id = accounts.id`,
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
          console.log('---');
          (rows.length > 0)? res.status(200).json(rows) :
                             res.status(404).json( 
                              {error: '\"'+profilename+'\" does not exist'} )
        }
      });
  }
  else
  {
    console.log('Token and requested username does not match\n---')
    res.status(401).json( {error: 'please log in again'} );
  }

};

