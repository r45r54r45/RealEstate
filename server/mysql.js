var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'e34e43E34!',
    database: 'db'
});

connection.connect();

module.exports= connection;
