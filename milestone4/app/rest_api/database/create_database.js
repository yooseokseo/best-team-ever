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
user-id (NUM) * primary key AUTOINCREMENT | username (TEXT) | password (TEXT) | email (TEXT) | DOB (date)


UserProfiles
---------------------------------------------------------------------------------------------------------------------------------------------------------
profile-id (NUM) * primary key AUTOINCREMENT | Firstname (TEXT) | lastname (TEXT) | DOB (date) | Gender (TEXT) | isDefault (Bool) *  integer 0 (false) and 1 (true). | user-id (FOREIGN KEY)

*/
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users (userid INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT, password TEXT, email TEXT, dob TEXT)");
  // insert 3 rows of data:
  db.run("INSERT INTO users (username, password, email, dob) VALUES ( 'Philip', 'password', 'Philip@gmail.com', '1980-01-10')");
  db.run("INSERT INTO users (username, password, email, dob) VALUES ( 'John', 'student', 'John@gmail.com', '1985-06-23')");
  db.run("INSERT INTO users (username, password, email, dob) VALUES ( 'Carol', 'engineer', 'Carol@gmail.com', '1995-08-13')");

  console.log('successfully created the users table in users.db');
  console.log('------------------------------------------------');
  console.log('| user name | password |');
  console.log('------------------------------------------------');
  // print them out to confirm their contents:
  db.each("SELECT userid, username, password FROM users", (err, row) => {

      console.log( 'userID: '+row.userid + '   username: ' + row.username + '  password: ' + row.password);
  });

  db.run("CREATE TABLE profiles (profileId INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, dob TEXT, gender TEXT, isDefault INTERGER, userId INTERGER, FOREIGN KEY(userId) REFERENCES users(userId))");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, userId ) VALUES ( 'Liam', 'Smith', '1987-02-21', 'male', 1, 2)");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, userId ) VALUES ( 'Philip', 'Johnson', '1980-01-17', 'male', 0, 2)");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, userId ) VALUES ( 'James', 'Brown', '1995-08-13', 'male', 0, 1)");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, userId ) VALUES ( 'Mary', 'Miller', '1975-07-03', 'female', 0, 1)");
  db.each("SELECT * FROM profiles, users WHERE profiles.userid = users.userid", (err, row) =>{
    console.log(row);
  });


});

db.close();
