/*
 * Files for serving and rendering all extra stuff
 * Functions:
 * - help - renders the help page
 */

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