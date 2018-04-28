// Node.js + Express server backend for petsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// author : Yooseok seo
//

// run this once to create the initial database as the users.db file
//   node create_database.js

// to clear the database, simply delete the users.db file:
//   rm users.db

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('users.db');
// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
/*
important ! : password should be hasing before it stores
now, just put text for testing purpose.

users
--------------------------------------------------------------------------------------------------------
user-id (NUM) * unique | username (TEXT) | password (TEXT) | email (TEXT) | DOB (date) | User_Profile-id(num)

user_Profile
---------------------------------------------------
User-Profile-id (NUM) * unique |user-id | profile-id



UserProfile
--------------------------------------------------------------------------------------------------------------
profile-id (NUM) * unique | Firstname (TEXT) | lastname (TEXT) | DOB (date) | Gender (TEXT) | isDefault (Bool)

*/
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users (username TEXT, password TEXT, email TEXT, dob TEXT)");
  // insert 3 rows of data:
  db.run("INSERT INTO users VALUES ( 'Philip', 'password', 'Philip@gmail.com', '1980-01-10')");
  db.run("INSERT INTO users VALUES ( 'John', 'student', 'John@gmail.com', '1985-06-23')");
  db.run("INSERT INTO users VALUES ( 'Carol', 'engineer', 'Carol@gmail.com', '1995-08-13')");


  console.log('successfully created the users table in users.db');
  console.log('------------------------------------------------');
  console.log('| user name | password |');
  console.log('------------------------------------------------');
  // print them out to confirm their contents:
  db.each("SELECT username, password FROM users", (err, row) => {

      console.log(row.username + '   |' + row.password);
  });
});

db.close();
