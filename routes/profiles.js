const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('rest_api/database/users.db');
const request = require('request');


exports.home = (req, res) =>
{
  // make call to database if post request
  if (req.method == 'POST')
  {
    const host = req.headers.origin;
    const path = '/api/profiles/current';
    request.get(
    {
      headers: {
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+req.body.token
      },
      url: host+path,
      'json' : true
    },
    (error, response, body) =>
    {
      if (response.statusCode >= 400)
      {
        renderError('error', response, body, res);
      }
      else
      {
        // get today's medicine
        const today = body.medicine.find( e =>
        { 
          const date = new Date(e.date).setHours(0,0,0,0);
          const currentDate = new Date().setHours(0,0,0,0);
          return date.valueOf() == currentDate.valueOf();
        });

        res.render('home', 
        {
          isHomePage: true,
          pageTitle: body.firstName+' '+body.lastName,
          medicineList: (today)? [today] : [],
          id: body.id
        });
      }
    });
  }
  else // GET request
  {
    res.render('home',{ url: '/home'} );
  }
  
}

/**
 * Function for rendering all profiles
 */
exports.view = (req, res) =>
{
  // make call to database if post request
  if (req.method == 'POST')
  {
    const host = req.headers.origin;
    const path = '/api/profiles';

    request.get(
    {
      headers: 
      {
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+req.body.token
      },
      url: host+path,
      'json': true
    }, 
    (error, response, body) => 
    {
      if (response.statusCode >= 400) // some error
      {      
        renderError('error', response, body, res);
      }
      else if (body.length == 0 || !body[0]) // no profiles
      {
        res.render('noUserProfile'); 
      }
      else
      {
        res.render('viewProfiles', 
        {
          pageTitle: 'Manage Profiles',
          defaultProfile: body.pop(), // default profile is last in array
          profileList: body,
        });
      }

    }); // request callback
  }
  else // GET request; make POST call for user in front end
  {
    res.render('viewProfiles',{ url: '/viewProfiles'} );
  }

} // end of view()

/**
 * Function for rendering a specific profile
 */
exports.viewProfile = (req, res) =>
{
  // make call to database if post request
  if (req.method == 'POST')
  {
    console.log('viewProfile')
    const profile_id = req.params.profile_id;

    const host = req.headers.origin;
    const path = '/api/profiles/' + profile_id;

    request.get(
    {
      headers: {
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+req.body.token
      },
      url: host+path,
      'json' : true
    },
    (error, response, body) =>
    {
      if (response.statusCode >= 400)
      {
        renderError('error', response, body, res);
      }
      else
      {  
        // gender boolean to check the appropriate checkbox
        const male = body.gender == 'male';
        const female = body.gender == 'female';
        const other = (male || female)? '' : body.gender;

        res.render('viewProfile', {
          backbuttonShow: true,
          pageTitle: "View Profile",
          profile_id: profile_id,
          firstName: body.firstName,
          lastName: body.lastName,
          gender_male: male,
          gender_female: female,
          gender_other: other,
          default: body.isDefault == 1,
          dob: body.dob,
          token: body.token,
          id: body.id
        });
      }
    }); // end of request callback
  }
  else // GET request; make POST call for user in front end
  {
    res.render('viewProfile', { url: '/viewProfile/'+req.params.profile_id } );
  }

} // end of viewProfile()

/**
 * Function for adding new profile
 */
exports.addNewProfile = (req, res) =>
{
  res.render('addNewProfile',
  {
    backbuttonShow: true,
    pageTitle: "Add a New Profile"
  });
}; // end of addNewProfile()


/** 
 * Helper function for rendering error page; this code needed in every
 * function that makes a request, so this function prevents rewriting
 * same code
 */
function renderError(page, response, body, res)
{
  console.log(body);
  res.render(page, 
  {
    errorStatus: response.statusCode+': '+response.statusMessage,
    errorMessage: body.error || body.message
  });
}
