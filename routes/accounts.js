const request = require('request');

exports.login = (req, res) => 
{
  res.render('login');
};

exports.signup = (req, res) =>
{
  res.render('')
}




exports.changePassword = (req, res) => 
{
  res.render('changePassword', 
  {
    pageTitle: "Change Password"
  });
};


exports.settings = (req, res) => 
{
  // make call to database if post request
  if (req.method == 'POST')
  {
    const host = req.headers.origin;
    const path = '/api/accounts/info';

    request.get(
    {
      headers: 
      {
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
        res.render('settings', 
        {
          pageTitle: "Account Settings",
          email: body.email,
          username: body.username,
          id: body.id
        });
      }

    });
  }
  else // GET request; make POST call for user in front end
  {
    res.render('settings',{ url: '/settings'} );
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