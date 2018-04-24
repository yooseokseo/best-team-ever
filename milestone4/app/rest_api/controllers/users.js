const jwt = require("jsonwebtoken");


const fakeDatabase = require('../database/usersList.json');

// GET a list of all usernames
//
// To test, open this URL in your browser:
//   http://localhost:3000/users
exports.getAll = (req, res) => {
  let allUsernames = [];
  fakeDatabase.forEach( (e)=>{
    allUsernames.push(e.username);
  });
  console.log('allUsernames is:', allUsernames);
  res.send(allUsernames);
}

exports.getUser = (req, res) => 
{
  const username = req.params.username; // matches ':username' above
  const val = fakeDatabase.find(e => 
  {
    return e.username == username;
  });
  console.log(username, '->', val['profiles']); // for debugging
  if (val) {
    res.send(val['profiles']); 
  } else {
    res.send({}); // failed, so return an empty object instead of undefined
  }
}; 

// GET profile data for a user
//
// To test, open these URLs in your browser:
//   http://localhost:3000/users/Philip
//   http://localhost:3000/users/Carol
//   http://localhost:3000/users/invalidusername
exports.getProfile = (req, res) => 
{
  const username = req.params.username; // matches ':username' above
  const profilename = req.params.profilename;

  const user = fakeDatabase.find(function(e) 
  {
    return e.username == username;
  });

  if (!user) //username not in system
  {
    res.send({})
  }

  const profile = user.profiles.find(e =>
  {
    return e.name == profilename;
  });

  (profile)? res.send(profile.info) : res.send({});

  console.log(username, '->', profile); // for debugging

}; 


exports.signUp = (req, res) => 
{
  console.log("Sign up");
  console.log(req.body);

  const newUser = {
                    'email' : req.body.email, 
                    'password' : req.body.password,
                    'username' : req.body.username,
                    'profiles' : 
                    [
                      {
                        'name' : 'somename',
                        'info' : {'job' : 'none', 'pet' : 'none'}
                      }
                    ]
                  }
  fakeDatabase.push(newUser)

  console.log("what");

  const token = jwt.sign(
  {
    email: req.body.email,
    username: req.body.username
  }, "secret key lel", { expiresIn: "1h" } );

  console.log("token");
  console.log("token = "+token);

  res.status(200).json(
  {
    message: "Auth successful",
    token: token,
    body: req.body
  });

}

exports.testauth = (req, res, next) =>
{
  console.log("in test auth function")
  console.log(req.userData);
  res.send(req.userData);
}