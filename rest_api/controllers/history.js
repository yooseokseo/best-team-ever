const sqlite3 = require('sqlite3');
const moment = require('moment');

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('rest_api/database/users.db');


/**
 * Helper function for grouping array by specified keys
 */
const groupByArray = (xs, key, callback) =>
{ 
  callback( xs.reduce((rv, x) =>
  { 
    let v = key instanceof Function ? key(x) : x[key]; 
    let el = rv.find((r) => r && r[[key]] === v); 
    if (el) { el.values.push(x); } 
    else { rv.push({ [key]: v, values: [x] }); } 
    return rv; 
  }, []) ); 
}


/**
 * Helper function for sorting medicine by dates. Also formats date
 * from yyyy:mm:dd format to d:m:y (ex. 2018-05-31 to 31 May 2018)
 * Callback function after finished
 */
function sort(rows, callback)
{	
  if (rows.length > 0)
  {
    // sort medicine by date and time in ascending order
    rows.sort((a, b) =>
    {
      const date1 = new Date(a.date+'T'+a.time+'Z').valueOf();
      const date2 = new Date(b.date+'T'+b.time+'Z').valueOf();

      if (date1 < date2) return -1;
      if (date1 > date2) return 1;
      return 0;
    });

    // sort just date in desending order
    rows.sort((a, b) =>
    {
      const date1 = new Date(a.date).valueOf();
      const date2 = new Date(b.date).valueOf();

      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });

    rows.forEach((e, index, array) =>
    {
      var options = { day: 'numeric', month: 'long', year: 'numeric'  };
      const formatted = new moment(e.date).format('DD MMM YYYY');
      e.date = formatted;
      e.med_pic = e.med_type+'-'+e.med_color+'.png';

      if (index == array.length - 1) // end of array
      {
        // group medicine by date
        groupByArray(rows, 'date', (grouped) => callback(grouped) );
      }
    });
  }
  else
  {
    callback(rows);
  }
}

/**
 * GET history of all medicine for specified account.
 *
 * Route signature: GET api/history/
 * Example call: localhost:3000/api/history/
 * Expected: token
 *
 * @return 1) error 500 if error occured while searching for profile. Otherwise
 *            -> {keys -> error}
 *         2) array of medicine history sorted by date if found
 *            -> [ {keys -> date, values: [ {...}, {...}, ..] } ]
 */
exports.newHistory = (req, res) =>
{
	console.log('CREATE HISTORY');
	const start_date = req.body.start_date;
	const times_per_day = req.body.times_per_day;
	const start_time = req.body.start_time;

	if (start_date)
	{
		const timesList = 
		[
			['12:00'],
			['08:00', '20:00'],
			['09:00', '15:00', '21:00'],
			['08:00', '12:00', '16:00', '20:00']
		];
		let times = null;
		if (times_per_day)
			times = timesList[ times_per_day - 1 ];
		else if (start_time)
			times = [ start_time ];

		if (times)
		{
			times.forEach((e, index, array) =>
			{
				db.run(
		    `INSERT INTO history
		     VALUES ($id, $date, $time, $isTaken, $account_id, $profile_id, $medicine_id)`,
			    {
			      $id : null,
			      $date : start_date,
			      $time : e,
			      $isTaken : 'No',
			      $account_id : req.userData.account_id,
			      $profile_id : req.params.profile_id,
			      $medicine_id : req.medicine_id
			    }
			   );

				if (index == array.length - 1) // end of array
					res.status(201).json( {message: 'Medicine created'} );
			}); // end of forEach
		}
	}
	else
	{
		res.status(201).json( {message: 'Medicine created'} );
	}
}



/**
 * GET history of all medicine for specified profile.
 *
 * Route signature: GET api/history/:profile_id
 * Example call: localhost:3000/api/history/4
 * Expected: token
 *
 * @return 1) error 500 if error occured while searching for profile. Otherwise
 *            -> {keys -> error}
 *         2) array of medicine history sorted by date if found
 *            -> [ {keys -> date, values: [ {...}, {...}, ..] } ]
 */
exports.getProfileHistory = (req, res) =>
{
	console.log('---');
	console.log('GET PROFILE HISTORY');

	const account_id = req.userData.account_id;
	const profile_id = req.params.profile_id || req.profile.id;

  const query = `SELECT hist.id, med.medicinename, hist.date, hist.time, 
  							        hist.isTaken, med.med_type, med.med_color, hist.medicine_id
  							 FROM history hist, medicine med
  							 WHERE hist.profile_id=? AND 
  							       hist.medicine_id=med.id AND
  							       hist.account_id=?`;
	db.all(query, [profile_id, account_id], (err, rows) => 
  {
    if (err) 
    {
      console.log(err);
      res.status(500).json( {error: err} );
    }
    else
    {
    	sort(rows, (sorted) =>
      {
        if (req.profile) // request came from find profile
        {
          req.profile.medicine = sorted;
          res.status(200).json(req.profile);
        }
        else // request directly from backend
        {
          res.status(200).json( sorted );
        }
      }); 
    }
  }); // end of db.all(...)
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
 *         2) array of medicine history sorted by date if found
 *            -> [ {keys -> date, values: [ {...}, {...}, ..] } ]
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

} // end of getMedHistory()


/**
 * GET history of certain medicine.
 *
 * Route signature: GET api/history/:profile_id/:medicine_id
 * Example call: localhost:3000/api/history/4/3
 * Expected: token
 *
 * @return 1) error 500 if error occured while searching for profile. Otherwise
 *            -> {keys -> error}
 *         2) array of medicine history sorted by date if found
 *            -> [ {keys -> date, values: [ {...}, {...}, ..] } ]
 */
exports.getHistory = (req, res) =>
{
  console.log('---');
  console.log('GET A HISTORY');

  const account_id = req.userData.account_id;
  const history_id = req.params.history_id;

  const query = `SELECT hist.id, med.medicinename, hist.date, hist.time, 
                        hist.isTaken, med.med_type, med.med_color, hist.medicine_id
                 FROM history hist, medicine med
                 WHERE hist.id=? AND 
                       med.id=hist.medicine_id AND 
                       hist.account_id=?`;
  db.get(query, [history_id, account_id], (err, row) => 
  {
    if (err) 
    {
      console.log(err);
      res.status(500).json( {error: err} );
    }
    else
    {
      row.med_pic = row.med_type+'-'+row.med_color+'.png';
      console.log(row);
      res.status(200).json( row );
    }
  }); // end of db.all(...)

} // end of getMedHistory()



/**
 * PATCH request for editing medicine. Must be logged in.
 * Edits the medicine with the requested id and params passed in.
 * Front end will pass only the columns that user want edited and
 * this code will replace all of thost columns with new value.
 * 
 * The passed in body can contain all of the columns within medicine.
 * All are optional since users don't have to change all of them.
 *
 * Route signature: /medicine/:medicine_id
 * Example call: /medicine/5
 * Expected: token, body { optional }
 *
 * @return 1) error 500 if error occured while editing medicine. Otherwise
 *            -> {keys -> error}
 *         2) success message and medicine id
 *            -> {keys -> message, id}
 */
exports.editMedHistory = (req, res) => 
{
  console.log('---');
  console.log('EDIT HISTORY');
  const id = req.params.medicine_id;
  const account_id = req.userData.account_id;

  // to update, need to do `UPDATE medicine SET column='value', col2='value'`
  // 'str' iterates through all of the requested columns to be edited and
  // makes string for the `column='value', column2='value'`
  let str = ``;
  for (const e in req.body)
  {
    str += e+`='`+req.body[[e]]+`', `;
  }
  str = str.substring(0, str.length-2); // remove the final comma from string

  let query = `UPDATE medicine SET `+str+` WHERE id=? AND account_id=?`;
  db.all(query, [id, account_id], (err) =>
  {
    console.log('err = '+err);

    (err)? 
      res.status(500).json( {error: err} ) : 
      res.status(200).json( {message: 'Medicine edited', id: id} )

  }); // end of db.all(..) for editing
} // end of editMedicine()



/**
 * PATCH request for editing medicine. Must be logged in.
 * Edits the medicine with the requested id and params passed in.
 * Front end will pass only the columns that user want edited and
 * this code will replace all of thost columns with new value.
 * 
 * The passed in body can contain all of the columns within medicine.
 * All are optional since users don't have to change all of them.
 *
 * Route signature: /medicine/:medicine_id
 * Example call: /medicine/5
 * Expected: token, body { optional }
 *
 * @return 1) error 500 if error occured while editing medicine. Otherwise
 *            -> {keys -> error}
 *         2) success message and medicine id
 *            -> {keys -> message, id}
 */
exports.editHistory = (req, res) => 
{
  console.log('---');
  console.log('EDIT A HISTORY');
  const id = req.params.history_id;
  const account_id = req.userData.account_id;

  // to update, need to do `UPDATE medicine SET column='value', col2='value'`
  // 'str' iterates through all of the requested columns to be edited and
  // makes string for the `column='value', column2='value'`
  let str = ``;
  for (const e in req.body)
  {
    str += e+`='`+req.body[[e]]+`', `;
  }
  str = str.substring(0, str.length-2); // remove the final comma from string

  let query = `UPDATE history SET `+str+` WHERE id=? AND account_id=?`;
  db.all(query, [id, account_id], (err) =>
  {
    console.log('err = '+err);

    (err)? 
      res.status(500).json( {error: err} ) : 
      res.status(200).json( {message: 'History edited', id: id} )

  }); // end of db.all(..) for editing
} // end of editMedicine()







