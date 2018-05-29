const request = require('request');


exports.viewHistory = (req, res) => 
{
  res.render('viewHistory', 
  {
    pageTitle: "View History"
  });
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
        console.log(body);
        res.render('viewPillHistory', 
        {
          isHomePage: true,
          pageTitle: "Medication History",
          medicine: body,
          med_pic: body[0].med_type+'-'+body[0].med_color+'.png',
          medicinename: body[0].medicinename
        });
      }
    });
  }
  else // GET request; make POST call for user in front end
  {
    res.render('viewPillDetail', { url: '/viewPillDetail/'+medicine_id } );
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