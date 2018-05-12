exports.viewAllMed = (req, res) =>
{
  const profile_id = req.params.profile_id;
  res.render('viewAllMed',
  {
    backbuttonShow: true,
    pageTitle: "Current Medications",
    profile_id: profile_id
  });
}


exports.viewPillDetail = (req, res) =>
{
  res.render('viewPillDetail',
  {
    backbuttonShow: true,
    pageTitle: "Medication Detail"
  });
};


exports.addNewMed = (req, res) =>
{
  res.render('addNewMed',
  {
    backbuttonShow: true,
    pageTitle: "Add New Medicine"
  });
};
