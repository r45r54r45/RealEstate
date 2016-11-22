var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'e34e43E34!',
    database: 'db'
});
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database: 'test'
// });
connection.connect();

module.exports= connection;
