const mysql = require('mysql');
const secrets = require('../secrets').db
const db = mysql.createConnection({
  host     : secrets.hose,
  user     : secrets.user,
  password : secrets.password,
  database : secrets.database
});
 
db.connect();

module.exports = db;