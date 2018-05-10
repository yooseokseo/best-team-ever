exports.view = (req, res) => 
{
  res.render('viewProfiles', 
  {
    pageTitle: "Manage Profiles"
  });
};

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