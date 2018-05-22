const request = require('request');


exports.viewAllMed = (req, res) =>
{
  const profile_id = req.params.profile_id;

  // make call to database if post request
  if (req.method == 'POST')
  {
    const host = req.headers.origin;
    const path = '/api/profiles/'+profile_id+'/medicine';
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
        res.render('viewAllMed', 
        {
          isHomePage: true,
          pageTitle: "All Medication",
          medicineList: body.medicine,
          profile_id: body.profile_id
        });
      }
    });
  }
  else // GET request; make POST call for user in front end
  {
    res.render('viewAllMed', { url: '/viewAllMed/'+profile_id } );
  }

}


exports.viewPillDetail = (req, res) =>
{
  const medicine_id = req.params.medicine_id;

  // make call to database if post request
  if (req.method == 'POST')
  {

    const host = req.headers.origin;
    const path = '/api/medicine/'+medicine_id;
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
        res.render('viewPillDetail', 
        {
          isHomePage: true,
          pageTitle: "Medication Detail",
          medicine: body,
        });
      }
    });
  }
  else // GET request; make POST call for user in front end
  {
    res.render('viewPillDetail', { url: '/viewPillDetail/'+medicine_id } );
  }

};


exports.addNewMed = (req, res) =>
{
  res.render('addNewMed',
  {
    backbuttonShow: true,
    pageTitle: "Add New Medicine",
    profile_id: req.params.profile_id,
    shapeList: ['split', 'hole', 'circle', 'oval'],
    colorList: ['red', 'orange', 'yellow', 'green', 'blue', 
                 'purple', 'black', 'gray', 'white']
  });
};

exports.editMedicine = (req, res) =>
{
  req.body.shapeList = ['split', 'hole', 'circle', 'oval'];
  req.body.colorList = ['red', 'orange', 'yellow', 'green', 'blue', 
                        'purple', 'black', 'gray', 'white'];
  res.render('editMedicine', req.body);
}

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

