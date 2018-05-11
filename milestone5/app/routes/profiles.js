exports.view = (req, res) => 
{
  console.log(req.params);

  res.render('viewProfiles', 
  {
    pageTitle: "Manage Profiles"
  });
};

exports.viewProfile = (req, res) =>
{
  console.log('viewProfile')
  const profile_id = req.params.profile_id;
  const account_id = req.params.account_id;
  console.log(req.params);
  res.render('viewProfile', {
    account_id: account_id,
    profile_id: profile_id
  });
}

exports.addNewProfile = (req, res) => 
{
  res.render('addNewProfile', 
  {
    backbuttonShow: true,
    pageTitle: "Add a New Profile"
  });
};

exports.noUserProfile = (req, res) => {
   res.render('noUserProfile');
};