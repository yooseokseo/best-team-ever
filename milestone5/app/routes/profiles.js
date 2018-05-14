const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('rest_api/database/users.db');
const request = require('request');

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
  const profile_id = req.body.profile_id;
  console.log('requested profile id = '+req.body.profile_id);

  request.get(
  {
    headers: {
      'content-type' : 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer '+req.body.token
    },
    url: 'http://localhost:3000/api/profiles/'+profile_id,
  },
  (error, response, body) =>
  {
    body = JSON.parse(body);
    console.log(body.firstName+' '+body.lastName+' '+body.dob+' '+body.gender);
    res.render('viewProfile', {
      backbuttonShow: true,
      pageTitle: "View Profile",
      profile_id: profile_id,
      firstName: body.firstName,
      lastName: body.lastName,
      dob: body.dob
    });
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
