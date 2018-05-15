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
  res.render('settings', 
  {
    pageTitle: "Account Settings"
  });
};