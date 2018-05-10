exports.viewAllMed = (req, res) =>
{
  res.render('viewAllMed', 
  {
    backbuttonShow: true,
    pageTitle: "Current Medications"
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

