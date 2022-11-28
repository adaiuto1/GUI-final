const mysql = require('mysql');
const util = require('util');

// mysql connection
var pool = mysql.createPool({ //what is this
  host: process.env.MYSQL_CLOUD_HOST,
  user: process.env.MYSQL_CLOUD_USER,
  password: process.env.MYSQL_CLOUD_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB
});

module.exports = pool; // this connects to the database 

// I have no idea what I'm doing

// Creates the Entire database from scratch
// const createDatabase = async () => {
//   const DBQuery = util.promisify(DBConnection.query).bind(DBConnection);
//   try {
//       const result = await DBQuery('CREATE DATABASE IF NOT EXISTS db');
//       console.log('Successfully recreated the DB');
//   } catch (err) {
//       console.error('There was a problem recreating the DB', err);
//   }
// }


// try { // this is never called so idk
//   const useDatabaseQuery = `USE db`;

//   const userTableQuery = `
//       CREATE TABLE IF NOT EXISTS users_table (
//           user_id AUTO_INCREMENT,
//           password VARCHAR(255) NOT NULL,
//           username VARCHAR(255) NOT NULL UNIQUE, --this should have a check for '@',
//           account_type INT NOT NULL,
//           PRIMARY KEY (user_id)
//       )`;

//   const profileTableQuery = `
//       CREATE TABLE IF NOT EXISTS profiles (
//         user_id INT NOT NULL,    
//         firstname VARCHAR(255) NOT NULL,
//         lastname VARCHAR(255) NOT NULL,
//         smoker BOOLEAN DEFAULT 0,
//         petFriendly BOOLEAN DEFAULT 0,
//         bio TEXT(1023)(),
//         tag1 BOOLEAN DEFAULT 0,
//         tag2 BOOLEAN DEFAULT 0,
//         tag3 BOOLEAN DEFAULT 0,
//         tag4 BOOLEAN DEFAULT 0,
//         tag5 BOOLEAN DEFAULT 0,
//         tag6 BOOLEAN DEFAULT 0,
//         image_url VARCHAR(255),
//         FORIEGN KEY (user_id) REFERENCES users_table(user_id),
//         PRIMARY KEY (user_id)
//       )`;

//   const propertyTableQuery =`
//       CREATE TABLE IF NOT EXISTS properties (
//         property_id INT NOT NULL AUTO_INCREMENT,
//         address VARCHAR(255) NOT NULL,
//         rent INT NOT NULL,
//         capacity INT, 
//         rating INT,
//         allows_pets BOOLEAN DEFAULT 0, 
//         allows_smoking BOOLEAN DEFAULT 0, 
//         owner VARCHAR(255), --needs to be a foreign key 
//         tag0 BOOLEAN DEFAULT 0,
//         tag1 BOOLEAN DEFAULT 0,
//         tag2 BOOLEAN DEFAULT 0,
//         tag3 BOOLEAN DEFAULT 0,
//         tag4 BOOLEAN DEFAULT 0,
//         tag5 BOOLEAN DEFAULT 0,
//         tag6 BOOLEAN DEFAULT 0,
//         tag7 BOOLEAN DEFAULT 0,
//         tag8 BOOLEAN DEFAULT 0,
//         tag9 BOOLEAN DEFAULT 0,
//         distance INT NOT NULL,
//         image1 VARCHAR(255),
//         image2 VARCHAR(255),
//         image3 VARCHAR(255),
//         image4 VARCHAR(255),
//         image5 VARCHAR(255),
//       )`  
 
//   await DBQuery(useDatabaseQuery);
//   await DBQuery(userTableQuery);
//   await DBQuery(profileTableQuery);
//   console.log('Successfully created tables in the DB');
// } catch (err) {
//   console.error('Failed to create tables', err);
// }


// await Promise.all( // not entirely sure what this does
//   [
//       DBQuery(userTableQuery), // do these call all the SQL functions above?
//       DBQuery(profileTableQuery)
//   ]
// );
// console.log('Both queries successfully executed in parallel');