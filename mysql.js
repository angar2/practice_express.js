var mysql = require('mysql');
var secrets = require('./secrets').db
var connection = mysql.createConnection({
  host     : secrets.hose,
  user     : secrets.user,
  password : secrets.password,
  database : secrets.database
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();