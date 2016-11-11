var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database: 'shugazine'
// });
var connection = mysql.createConnection({
    host     : '10.32.17.63',
    user     : 'shugazine',
    password : 'shugazine123$$',
    database: 'shugazine'
});

connection.connect();

module.exports= connection;
