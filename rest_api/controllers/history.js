const sqlite3 = require('sqlite3');
const moment = require('moment');

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('rest_api/database/users.db');



/**
 * Helper function for sorting medicine by dates. Also formats date
 * from yyyy:mm:dd format to d:m:y (ex. 2018-05-31 to 31 May 2018)
 * Callback function after finished
 */
function sort(rows, callback)
{
	// sort medicine by date and time
	rows.sort((a, b) =>
	{
		const date1 = new Date(a.date+'T'+a.time+'Z').valueOf();
		const date2 = new Date(b.date+'T'+b.time+'Z').valueOf();
	  if (date1 < date2) return -1;
	  if (date1 > date2) return 1;
	  return 0;
	});
	console.log('sorted history: ', rows); 

	rows.forEach((e, index, array) =>
	{
		var options = { day: 'numeric', month: 'long', year: 'numeric'  };
		const formatted = new moment(e.date).format('DD MMM YYYY');
		e.date = formatted;

		if (index == array.length - 1) callback(rows);
	});
}
/**
 * GET list of all of user's profile. Must be logged in.
 * If logged in, find the with requested name. 
 *
 * Route signature: GET /profiles
 * Example call: localhost:3000/profiles
 * Expected: token
 *
 * @return 1) error 500 if error occured while searching for profile. Otherwise
 *            -> {keys -> error}
 *         2) array of profiles if found or 
 *            -> [ {keys -> id, firstName, lastName}, {..}, {..} ]
 *         3) error 404 (Not Found) if no profiles
 *            -> {keys -> error}
 */
exports.getAccountHistory = (req, res) =>
{
}

/**
 * GET list of all of user's profile. Must be logged in.
 * If logged in, find the with requested name. 
 *
 * Route signature: GET /profiles
 * Example call: localhost:3000/profiles
 * Expected: token
 *
 * @return 1) error 500 if error occured while searching for profile. Otherwise
 *            -> {keys -> error}
 *         2) array of profiles if found or 
 *            -> [ {keys -> id, firstName, lastName}, {..}, {..} ]
 *         3) error 404 (Not Found) if no profiles
 *            -> {keys -> error}
 */
exports.getProfileHistory = (req, res) =>
{
}


/**
 * GET history of certain medicine.
 *
 * Route signature: GET api/history/:profile_id/:medicine_id
 * Example call: localhost:3000/api/history/4/3
 * Expected: token
 *
 * @return 1) error 500 if error occured while searching for profile. Otherwise
 *            -> {keys -> error}
 *         2) array of medicine history if found
 *            -> [ {keys -> id, medicinename, date, time, isTaken, type, color} ]
 */
exports.getMedHistory = (req, res) =>
{
	console.log('---');
	console.log('GET MEDICINE HISTORY');

	const account_id = req.userData.account_id;
	const profile_id = req.params.profile_id;
	const medicine_id = req.params.medicine_id;

  const query = `SELECT hist.id, med.medicinename, hist.date, hist.time, 
  							        hist.isTaken, med.med_type, med.med_color, hist.medicine_id
  							 FROM history hist, medicine med
  	             WHERE hist.medicine_id=? AND 
  	             			 med.id=?           AND 
  	             			 hist.profile_id=?  AND 
  	             			 hist.account_id=?`;
	db.all(query, [medicine_id, medicine_id, profile_id, account_id], (err, rows) => 
  {
    if (err) 
    {
      console.log(err);
      res.status(500).json( {error: err} );
    }
    else
    {
    	sort(rows, (sorted) => res.status(200).json( sorted ) );
    }
  }); // end of db.all(...)

}




