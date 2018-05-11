const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('rest_api/database/users.db');

exports.view = (req, res) =>
{
  console.log(req.params);

  res.render('viewProfiles',
  {
    pageTitle: "Manage Profiles"
  });
};

exports.viewProfile = (req, res) =>
{
  console.log('viewProfile')
  const profile_id = req.params.profile_id;
  const account_id = req.params.account_id;
  console.log(req.params);

  db.get(
    `SELECT * FROM accounts,
     profiles WHERE profiles.id = $profile_id AND accounts.id = $account_id`,
    {
      $profile_id: profile_id,
      $account_id: account_id
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
        console.log('profile: ',row);
        //console.log(row.firstName);
        //console.log(row.lastName);
        console.log(row.dob);


        res.render('viewProfile', {
          backbuttonShow: true,
          pageTitle: "View Profile",
          account_id: account_id,
          profile_id: profile_id,
          firstName: row.firstName,
          lastName: row.lastName,
          dob: row.dob
        });
        /*
        if (row) //found profile
        {
          row.token = getToken(username, account_id, profile_id);
          req.profile = row;
          next();
          //res.status(200).json(row);
        }
        else
        {
          res.status(404).json( {error: 'Profile id '+profile_id+' does not exist'} );
        }
        */
      }

    } // end of (err, row) =>
  ); // end of db.get(..)




}

exports.addNewProfile = (req, res) =>
{
  res.render('addNewProfile',
  {
    backbuttonShow: true,
    pageTitle: "Add a New Profile"
  });
};

exports.noUserProfile = (req, res) => {
   res.render('noUserProfile');
};
