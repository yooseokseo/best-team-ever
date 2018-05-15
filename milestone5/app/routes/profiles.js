const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('rest_api/database/users.db');
const request = require('request');


exports.home = (req, res) =>
{
  const host = 'http://localhost:3000';
  const path = '/api/profiles/current';
  request.get(
  {
    headers: {
      'content-type' : 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer '+req.body.token
    },
    url: host+path,
  },
  (error, response, body) =>
  {
    body = JSON.parse(body);
    console.log(body);
    res.render('home', 
    {
      isHomePage: true,
      pageTitle: body.firstName+' '+body.lastName,
      medicineList: body.medicine,
      id: body.id
    });
  });
}


exports.view = (req, res) =>
{
  const host = 'http://localhost:3000';
  const path = '/api/profiles';

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
    const defaultProf = body.forEach(e => e.default == 1);
    console.log('default = ', defaultProf);
    body.forEach((e) => 
    {
      if (e.default == 1)
      {
        res.render('viewProfiles', 
        {
          pageTitle: 'Manage Profiles',
          profileList: body,
          default: e.firstName+' '+e.lastName
        });
      }
    });

    
  });

};

exports.viewProfile = (req, res) =>
{
  console.log('viewProfile')
  const profile_id = req.params.profile_id;

  const host = 'http://localhost:3000';
  const path = '/api/profiles/' + profile_id;

  request.get(
  {
    headers: {
      'content-type' : 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer '+req.body.token
    },
    url: host+path,
  },
  (error, response, body) =>
  {
    body = JSON.parse(body);

    // gender boolean to check the appropriate checkbox
    const male = body.gender == 'male';
    const female = body.gender == 'female';
    const other = (male || female)? '' : body.gender;

    res.render('viewProfile', {
      backbuttonShow: true,
      pageTitle: "View Profile",
      profile_id: profile_id,
      firstName: body.firstName,
      lastName: body.lastName,
      gender_male: male,
      gender_female: female,
      gender_other: other,
      default: body.isDefault == 1,
      dob: body.dob,
      token: body.token,
      id: body.id
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
