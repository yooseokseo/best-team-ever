exports.help = (req, res) => 
{
  res.render('help', 
  {
    pageTitle: "Help"
  });
};


exports.viewPreview = (req, res) =>
{
  res.render('');
}