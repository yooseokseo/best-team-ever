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
  res.render('viewHistoryDateDetail', 
  {
    backbuttonShow: true,
    pageTitle: "View Date Detail"
  });
};