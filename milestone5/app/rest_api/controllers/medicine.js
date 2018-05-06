const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');     

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('rest_api/database/users.db');

/**
 * GET a list of all users. Only show usernames of user and nothing
 * else. Obviously only used for debugging (would be a breach if you show
 * everyone all users in database). Don't need to be signed in.
 *
 * @return array of usernames of all users
 */
exports.getAllMedicine = (req, res) => 
{
  console.log('GET ALL MEDICINE')
  console.log(req.userData);

  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all(
    `SELECT * FROM medicine 
     WHERE account_id=$account_id 
     AND   profile_id=$profile_id`,
    {
      $account_id: req.userData.account_id,
      $profile_id: req.userData.profile_id
    }, 
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

        if (rows.length > 0)
        {
          res.status(200).json(rows);
        }
        else
        {
          res.status(404).json( {error: 'Profile does not have any medicine'} );
        }
      }
    });

}

/**
 * Creates new medicine. 
 */
exports.newMedicine = (req, res) => 
{
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT username FROM users', (err, rows) => {
    const allUsernames = rows.map(e => e.username);
    console.log(allUsernames);
    res.send(allUsernames);
  });

}

/**
 * GET a list of all users. Only show usernames of user and nothing
 * else. Obviously only used for debugging (would be a breach if you show
 * everyone all users in database). Don't need to be signed in.
 *
 * @return array of usernames of all users
 */
exports.getMedicine = (req, res) => 
{
  console.log('GET MEDICINE');

  db.get(
    `SELECT * FROM medicine 
     WHERE id=$medicine_id 
     AND   name=$medicinename
     AND   account_id=$account_id
     AND   profile_id=$profile_id`, 
    {
      $medicine_id: req.params.medicine_id,
      $medicinename: req.params.medicinename,
      $account_id: req.userData.account_id,
      $profile_id: req.userData.profile_id
    },
    (err, row) => 
    {
      if (err)
      {
        console.log(err);
        res.status(500).json( {error: err} );
      }
      else
      {
        console.log('medicine: ',row);
        console.log('---');
        if (row) //found profile
        {
          res.status(200).json(row);
        }
        else
        {
          const name_id = '\"'+req.params.medicinename+'\" \
                          (id: '+req.params.medicine_id+')';
          res.status(404).json( {error: name_id + ' does not exist'} );
        }
      }
    }
  );

}