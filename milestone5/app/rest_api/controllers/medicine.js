const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');     

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('rest_api/database/users.db');

/**
 * GET a list of all medicine for a profile. Find medicine belonging to the
 * correct profile by checking account_id and profile_id.
 *
 * Route signature: GET /medicine
 * Example call: localhost:3000/medicine
 * Expected: token
 *
 * @return erorr 500 if error occured while searching for medicine. Otherwise
 *         return array of all of profile's medicine if any exists; if none 
 *         exists, return error 404 (Not Found)
 */
exports.getAllMedicine = (req, res) => 
{
  console.log('GET ALL MEDICINE')

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

        (rows.length > 0)?  
          res.status(200).json(rows) :
          res.status(404).json( {error: 'Profile doesn\'t have any medicine'} );
      }
    }
  ); // end of db.all(...)

} // end of getAllMedicine()




/**
 * Creates new medicine for the requested profile. Must be logged in.
 * 
 * Route signature: POST /medicine/new
 * Example call: localhost:3000/medicine/new
 * Expected: token, body {? ? ?}
 *
 * @return 1) error 500 if error occured while creating medicine. Otherwise
 *         2) created medicine 
 */
exports.newMedicine = (req, res) => 
{
  console.log("CREATE NEW MEDICINE");
  console.log('medicine to create:\n', req.body, '\n');

  const medicinename = req.body.medicinename;
  const account_id = req.userData.account_id;
  const profile_id = req.userData.profile_id;

  db.run(
    `INSERT INTO medicine (medicinename, account_id, profile_id)
     VALUES ($medicinename, $account_id, $profile_id)`,
    {
      $medicinename: medicinename,
      $account_id: account_id,
      $profile_id: profile_id
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
        console.log('Medicine created\n---');
        res.status(201).json( {profile: req.body} );
      }
    } // end of (err) =>
  ); // end of db.run(`INSERT..`) for creating medicine 

} // end of newMedicine()



/**
 * GET medicine data for profile. Must be logged in.
 * If logged in, find the with requested profile name and account name
 *
 * Route signature: GET /medicine/:medicinename/:medicine_id
 * Example call: localhost:3000/medicine/vitaminC/2
 * Expected: token
 *
 * @return 1) error 500 if error occured while searching for medicine. Otherwise
 *         2) medicine information if found or 
 *         3) error 404 (Not Found) if medicine not found
 */
exports.getMedicine = (req, res) => 
{
  console.log('GET MEDICINE');

  db.get(
    `SELECT * FROM medicine 
     WHERE id=$medicine_id 
     AND   medicinename=$medicinename
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

} // end of getMedicine()