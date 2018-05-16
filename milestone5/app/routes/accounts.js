const request = require('request');

exports.login = (req, res) => 
{
  res.render('login');
};

exports.signup = (req, res) =>
{
  res.render('')
}



exports.getAccountInfo = (req, res) =>
{
  res.render('')
}

exports.editAccountInfo = (req, res) => 
{
  res.render('editAccountInfo', 
  {
    pageTitle: "Edit Info"
  });
};

exports.changePassword = (req, res) => 
{
  res.render('changePassword', 
  {
    pageTitle: "Change Password"
  });
};

exports.deleteAccount = (req, res) =>
{
  res.render('')
}



exports.settings = (req, res) => 
{
  const host = 'http://localhost:3000';
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