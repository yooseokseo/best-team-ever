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
      'SELECT firstname, lastname, isDefault FROM users, \
       profiles WHERE username=$username AND profiles.userid = users.userid',
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
          res.status(404).json( {error: '\"'+username+'\" does not exist'} );
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
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT username FROM users', (err, rows) => {
    const allUsernames = rows.map(e => e.username);
    console.log(allUsernames);
    res.send(allUsernames);
  });

}

/**
 * GET profile data for a user. Must be logged in.
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
  const profilename = req.params.profilename;

  console.log('request for: '+username+'; token valid for: '+req.userData.username);
  if (req.userData.username === req.params.username)
  {
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
          console.log('---');
          (rows.length > 0)? res.status(200).json(rows[0]) :
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

