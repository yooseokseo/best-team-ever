const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');     

// use this library to interface with SQLite databases: https://github.com/mapbox/node-sqlite3
const db = new sqlite3.Database('rest_api/database/users.db');

/**
 * GET a list of all users. Only show usernames of user and nothing
 * else. Obviously only used for debugging (would be a breach if you show
 * everyone all users in database). Don't need to be signed in.
 *
 * @return array of usernames of all users
 */
exports.getAllMedicine = (req, res) => 
{
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT username FROM users', (err, rows) => {
    const allUsernames = rows.map(e => e.username);
    console.log(allUsernames);
    res.send(allUsernames);
  });

}

/**
 * Creates new medicine. 
 */
exports.newMedicine = (req, res) => 
{
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT username FROM users', (err, rows) => {
    const allUsernames = rows.map(e => e.username);
    console.log(allUsernames);
    res.send(allUsernames);
  });

}

/**
 * GET a list of all users. Only show usernames of user and nothing
 * else. Obviously only used for debugging (would be a breach if you show
 * everyone all users in database). Don't need to be signed in.
 *
 * @return array of usernames of all users
 */
exports.getMedicine = (req, res) => 
{
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT username FROM users', (err, rows) => {
    const allUsernames = rows.map(e => e.username);
    console.log(allUsernames);
    res.send(allUsernames);
  });

}