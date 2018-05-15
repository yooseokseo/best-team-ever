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
  }, 
  (error, response, body) => 
  {
    body = JSON.parse(body);
    if (response.statusCode >= 400)
    {
      console.log(body);
      // determine type of error later
      res.render('error', 
      {
        errorStatus: response.statusCode+': '+response.statusMessage,
        errorMessage: body.error || body.message
      });
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