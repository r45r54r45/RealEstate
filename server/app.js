'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

var app = (0, _express2.default)();
var port = 3000;
app.use((0, _bodyParser2.default)());
app.use((0, _cookieParser2.default)());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/', _express2.default.static(__dirname + '/../build'));
// var express = require('express')
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
// app.post('/submit', upload.single('image'), function (req, res) {
//     var db=require('./mysql');
//     var data = req.body;
//     function emptyThenNull(v){
//         if(v==''){
//             return null;
//         }else{
//             return v;
//         }
//     }
//     for(var i in data){
//         data[i]=emptyThenNull(data[i]);
//     }
//     var filename=req.file!=undefined?req.file.filename:null;
//     db.query('insert into MEASURE_PROJECT_TABLE (sex, name, phone, naver_id, foot_length, foot_width, standard_size, foot_neck_length, foot_ball_width, specification, image) values' +
//         ' (?,?,?,?,?,?,?,?,?,?,?)',[data.sex, data.name, data.phone, data.naver_id, data.foot_length, data.foot_width, data.standard_size, data.foot_neck_length, data.foot_ball_width, data.specification, filename],
//     function(err, result){
//         if(err){
//             console.log(err);
//             res.end();
//         }
//         res.json(result);
//     });
// });
// app.post('/comment',function(req, res){
//     var db=require('./mysql');
//     var data = req.body;
//     console.log(data);
//     db.query('update MEASURE_PROJECT_TABLE set like_comment=? where id=?',[data.comment, data.uid],function(err, result){
//         if(err){
//             console.log(err);
//             res.end();
//         }
//         res.json(result);
//     });
// })

app.get('/item', function (req, res) {
    var db = require('./mysql');
    if(req.query.id){
        db.query('select * from Item i join User u on i.owner = u.id where u.id=?',[req.query.id],function(err, result){
            res.json({result: result});
        });
    }else{
        res.json({result: false})
    }
});
app.get('/user', function (req, res) {
    var db = require('./mysql');
    if(req.query.id){
        db.query('select * from User where id=?',[req.query.id],function(err, result){
            res.json({result: result});
        });
    }else{
        db.query('select id, store_name from User',function(err, result){
            res.json({result: result});
        });
    }
});
app.post('/user', function (request, response) {
    var body = request.body;
    var db = require('./mysql');
    db.query('insert into User (store_name, ceo_name, login_id, login_pw, tel, phone) values (?,?,?,?,?,?)', [body.store_name, body.ceo_name, body.login_id, body.login_pw, body.tel, body.phone], function (err, result) {
        response.json({result: true});
    });
});

app.get('*', function (request, response) {
    response.sendFile(_path2.default.resolve(__dirname, '../build', 'index.html'));
});

var server = app.listen('3000', function () {
    console.log('Express listening on port', '3000');
});