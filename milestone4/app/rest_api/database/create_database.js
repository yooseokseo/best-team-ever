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

  //----------------------------------------------------------------
  //user table

  // create a new database table:
  db.run(
    "CREATE TABLE users \
    ( \
      userId INTEGER PRIMARY KEY AUTOINCREMENT, \
      username TEXT,  \
      password TEXT,  \
      email TEXT, \
      FOREIGN KEY(userId) REFERENCES profiles(userId) \
    )"
  );
  // insert 3 rows of data: 
  db.run("INSERT INTO users (username, password, email) VALUES ( 'user1', 'password', 'user1@gmail.com')");
  db.run("INSERT INTO users (username, password, email) VALUES ( 'user2', 'student', 'user2@gmail.com')");
  db.run("INSERT INTO users (username, password, email) VALUES ( 'user3', 'engineer', 'user3@gmail.com')");


  console.log('successfully created the users table in users.db');
  console.log('------------------------------------------------');
  console.log('| user name | password |');
  console.log('------------------------------------------------');
  // print them out to confirm their contents:
  db.each("SELECT userId, username, password FROM users", (err, row) => {
    console.log(row);
  });

  //-----------------------------------------------------------------------
  //profile table
  db.run(
    "CREATE TABLE profiles \
    ( \
      profileId INTEGER PRIMARY KEY AUTOINCREMENT, \
      firstName TEXT, \
      lastName TEXT, \
      dob TEXT, \
      gender TEXT, \
      isDefault INTERGER, \
      userId INTERGER \
    )"
  );

  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, userId ) VALUES ( 'Liam', 'Smith', '1987-02-21', 'male', 1, 2)");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, userId ) VALUES ( 'Philip', 'Johnson', '1980-01-17', 'male', 0, 2)");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, userId ) VALUES ( 'James', 'Brown', '1995-08-13', 'male', 0, 1)");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, userId ) VALUES ( 'Mary', 'Miller', '1975-07-03', 'female', 0, 1)");
  



  db.all("SELECT * FROM profiles, users WHERE profiles.userId = users.userId", (err, row) =>{
    console.log(row);
    console.log("--")
  });



});

db.close();
