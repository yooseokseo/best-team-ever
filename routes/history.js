const request = require('request');


/**
 * Render page with list of all profiles; clicking on any of the profiles
 * will redirect to page with history for that profile
 */
exports.viewHistory = (req, res) => 
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
        res.render('viewHistory', 
        {
          pageTitle: "View History",
          defaultProfile: body.pop(),
          profileList: body,
        });

      }

    }); // request callback
  }
  else // GET request; make POST call for user in front end
  {
    res.render('viewHistory',{ url: '/viewHistory'} );
  }
  
};


/**
 * View all medicine for specific profile 
 */
exports.viewProfileHistory = (req, res) => 
{
  const profile_id = req.params.profile_id;

  // make call to database if post request
  if (req.method == 'POST')
  {

    const host = req.headers.origin;
    const path = '/api/profiles/'+profile_id+'/history';
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
        res.render('viewProfileHistory', 
        {
          isHomePage: true,
          pageTitle: "Medication History",
          medicine: body,
        });
      }
    });
  }
  else // GET request; make POST call for user in front end
  {
    res.render('viewPillDetail', { url: '/viewProfileHistory/'+profile_id } );
  }
};


exports.viewHistoryDate = (req, res) => 
{
  res.render('viewHistoryDate', 
  {
    pageTitle: "View History"
  });
};


exports.viewHistoryDateDetail = (req, res) => 
{
  res.render('viewHistoryDateDetail',
  {
    backbuttonShow: true,
    pageTitle: "View Date Detail"
  });
};


/**
 * View specific history/reminder
 */
exports.viewHistoryDetail = (req, res) =>
{
  const history_id = req.params.history_id;

  // make call to database if post request
  if (req.method == 'POST')
  {

    const host = req.headers.origin;
    const path = '/api/history/'+history_id;
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
        res.render('viewHistoryDetail', 
        {
          body,
          isHomePage: true,
          pageTitle: "History Detail",
        });
      }
    });
  }
  else // GET request; make POST call for user in front end
  {
    res.render('viewHistoryDetail', { url: '/viewHistoryDetail/'+history_id } );
  }

};

/**
 * View all history for specific medicine
 */
exports.viewPillHistory = (req, res) => 
{
  const profile_id = req.params.profile_id;
  const medicine_id = req.params.medicine_id;

  // make call to database if post request
  if (req.method == 'POST')
  {

    const host = req.headers.origin;
    const path = '/api/history/'+profile_id+'/'+medicine_id;
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
        const val = body[0].values[0];
        res.render('viewPillHistory', 
        {
          isHomePage: true,
          pageTitle: val.medicinename+ " History",
          medicine: body,
          medicinename: val.medicinename,
          med_pic: val.med_pic
        });
      }
    });
  }
  else // GET request; make POST call for user in front end
  {
    res.render('viewPillDetail', { url: '/viewPillHistory/'+profile_id+'/'+medicine_id } );
  }
};


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