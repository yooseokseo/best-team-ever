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

users
--------------------------------------------------------------------------------------------------------
user-id (NUM) * primary key AUTOINCREMENT | username (TEXT) | password (TEXT) | email (TEXT) | DOB (date)


UserProfiles
---------------------------------------------------------------------------------------------------------------------------------------------------------
profile-id (NUM) * primary key AUTOINCREMENT | Firstname (TEXT) | lastname (TEXT) | DOB (date) | Gender (TEXT) | isDefault (Bool) *  integer 0 (false) and 1 (true). | user-id (FOREIGN KEY)

*/
db.serialize(() => {

  //----------------------------------------------------------------
  //account table

  // create a new database table:
  db.run(
    `CREATE TABLE accounts
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      email TEXT
    )`
  );
  // insert 3 rows of data:
  const hashedPassword = '$2a$10$HCwBZYmiL.ukBvVakPtJ6urHm/s7AXszpZRYsHZ.ppD5f8.U0/1Gy';
  db.run("INSERT INTO accounts (username, password, email) VALUES ( 'user1', '"+hashedPassword+"', 'user1@gmail.com')");
  db.run("INSERT INTO accounts (username, password, email) VALUES ( 'user2', '"+hashedPassword+"', 'user2@gmail.com')");
  db.run("INSERT INTO accounts (username, password, email) VALUES ( 'user3', '"+hashedPassword+"', 'user3@gmail.com')");


  console.log('successfully created the users table in users.db');
  console.log('------------------------------------------------');
  console.log('| user name | password |');
  console.log('------------------------------------------------');
  // print them out to confirm their contents:
  db.each("SELECT id, username, password FROM accounts", (err, row) => {
    console.log(row);
  });

  //-----------------------------------------------------------------------
  //profile table
  db.run(
    `CREATE TABLE profiles
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      dob TEXT,
      gender TEXT,
      isDefault INTERGER,
      isCurrent INTEGER,
      account_id INTEGER,
      FOREIGN KEY(account_id) REFERENCES accounts(id)
    )`
  );

  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, isCurrent, account_id ) VALUES ( 'Liam', 'Smith', '1987-02-21', 'male', 1, 1, 2)");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, isCurrent, account_id ) VALUES ( 'Philip', 'Johnson', '1980-01-17', 'male', 0, 0, 2)");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, isCurrent, account_id ) VALUES ( 'James', 'Brown', '1995-08-13', 'male', 1, 1, 1)");
  db.run("INSERT INTO profiles (firstName, lastName, dob, gender, isDefault, isCurrent, account_id ) VALUES ( 'Mary', 'Miller', '1975-07-03', 'female', 0, 0, 1)");


  db.all("SELECT * FROM profiles", (err, rows) =>
  {
    console.log(rows);
  });

  //-----------------------------------------------------------------------
  //medicine table
  db.run(
    `CREATE TABLE medicine
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      medicinename TEXT,
      dosage INTEGER,
      num_pills INTEGER,
      recurrence_hour INTEGER,
      times_per_day INTEGER,
      start_date TEXT,
      start_time TEXT,
      end_date TEXT,
      end_time TEXT,
      med_type TEXT,
      med_color TEXT,
      account_id INTEGER,
      profile_id INTEGER,
      FOREIGN KEY(account_id) REFERENCES accounts(id),
      FOREIGN KEY(profile_id) REFERENCES profiles(id)
    )`
  );

  db.run(`INSERT INTO medicine (medicinename, account_id, profile_id, med_type, med_color) VALUES ('vitaminA', 1, 3, 'split','purple')`);
  db.run(`INSERT INTO medicine (medicinename, account_id, profile_id, med_type, med_color) VALUES ('vitaminC', 1, 3, 'hole', 'green')`);
  db.run(`INSERT INTO medicine (medicinename, account_id, profile_id, med_type, med_color) VALUES ('vitaminB', 1, 4, 'circle', 'red')`);
  db.run(`INSERT INTO medicine (medicinename, account_id, profile_id, med_type, med_color) VALUES ('vitaminD', 1, 4, 'oval', 'yellow')`);
  db.run(`INSERT INTO medicine (medicinename, account_id, profile_id, med_type, med_color) VALUES ('NyQuil', 2, 1, 'split', 'blue')`);

  db.all(
    `SELECT * FROM medicine
     WHERE medicine.account_id = 1 AND medicine.profile_id = 3`, (err, rows) =>
  {
    console.log(rows);
  });


  //-----------------------------------------------------------------------
  //history table
  db.run(
    `CREATE TABLE history
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      time TEXT,
      isTaken INTEGER,
      account_id INTEGER,
      profile_id INTEGER,
      medicine_id INTEGER,
      FOREIGN KEY(account_id) REFERENCES accounts(id),
      FOREIGN KEY(profile_id) REFERENCES profiles(id),
      FOREIGN KEY(medicine_id) REFERENCES medicine(id)
    )`
  );

  db.run(`INSERT INTO history (date, time, account_id, profile_id, medicine_id) VALUES ('2018-05-29', '12:00', 1, 3, 1)`);
  db.run(`INSERT INTO history (date, time, account_id, profile_id, medicine_id) VALUES ('2018-05-30', '08:00', 1, 3, 2)`);
  db.run(`INSERT INTO history (date, time, account_id, profile_id, medicine_id) VALUES ('2018-05-21', '12:00', 1, 4, 3)`);
  db.run(`INSERT INTO history (date, time, account_id, profile_id, medicine_id) VALUES ('2018-05-31', '12:00', 1, 4, 4)`);
  db.run(`INSERT INTO history (date, time, account_id, profile_id, medicine_id) VALUES ('2018-06-02', '12:00', 2, 1, 5)`);

  db.all(`SELECT h.id, m.medicinename, h.date, h.time 
          FROM history h, medicine m 
          WHERE m.id=h.medicine_id`, (err, rows) =>
  {
    console.log(rows);
  });


});

db.close();
