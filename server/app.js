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
var multer = require('multer')
var upload = multer({dest: 'image/'})
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
app.use('/img', _express2.default.static(__dirname + '/../image'));

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
app.post('/login', function(req, res){
    var db = require('./mysql');
    db.query("select id from User where login_id=? and login_pw=?",[ req.body.login_id, req.body.login_pw], function(err, result){
      if(result.length===0){
          res.json({result: false});
      } else{
          res.json({result: true, userId: result[0].id});
      }
    })
});
app.post('/item', upload.array('image'), function (req, res) {
    var db = require('./mysql');
    var data = req.body;
    if (req.query.id) {
        db.query('insert into Item ' +
            ' (type, owner, title, location, produced_area, real_area, floor, total_floor, room, toilet, specification, available, j_price, m_price, b_price, w_price)' +
            'values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data.type, req.query.id, data.title, data.location, data.produced_area, data.real_area, data.floor, data.total_floor, data.room, data.toilet, data.specification, data.available, data.j_price || null, data.m_price || null, data.b_price || null, data.w_price || null], function (err, result) {
            let id = result.insertId;
            for (let key in req.files) {
                let dat = req.files[key];
                db.query("insert into Image (url, item) values (?,?)", [dat.filename, id], function (err, result) {

                })
            }
            res.json({result: true});
        });
    } else {
        res.json({result: false})
    }
});
function toInt(string) {
    return parseInt(string);
}
function toFloat(string) {
    return parseFloat(string);
}
app.put('/item', upload.array('image'), function (req, res) {
    var db = require('./mysql');
    var itemId = req.query.id;
    var data = req.body;
    console.log(data);
    req.body.deleteImageList = req.body.deleteImageList || "";
    req.body.deleteImageList.split(',').forEach(function (item, index) {
        db.query('delete from Image where id=?', [item])
    })
    db.query('update Item set ' +
        ' type=?, title=?, location=?, produced_area=?, real_area=?, floor=?, total_floor=?, room=?, toilet=?, specification=?, available=?, j_price=?, m_price=?, b_price=?, w_price=? ' +
        ' where id=?', [toInt(data.type), data.title, data.location, toFloat(data.produced_area), toFloat(data.real_area), toInt(data.floor), toInt(data.total_floor), toInt(data.room), toInt(data.toilet), data.specification, data.available, data.j_price || null, data.m_price || null, data.b_price || null, data.w_price || null, toInt(itemId)], function (err, result) {
        if (err) {
            res.json(err);
        }
        for (var key in req.files) {
            var dat = req.files[key];
            db.query("insert into Image (url, item) values (?,?)", [dat.filename, itemId], function (err, result) {

            })
        }
        res.json({result: true});
    });

});
app.get('/item', function (req, res) {
    var db = require('./mysql');
    if (req.query.id) {
        db.query('select i.id, i.title from Item i join User u on i.owner = u.id where u.id=?', [req.query.id], function (err, result) {
            res.json({result: result});
        });
    } else {
        db.query('select * from Item i where i.id=?', [req.query.item], function (err, result) {
            db.query('select * from Image where item=?', [req.query.item], function (err2, result2) {
                result[0].images = result2;
                res.json({result: result[0]});
            })
        });
    }
});
app.get('/view', function (req, res) {
    var db = require('./mysql');
    db.query('select * from User where id=?', [req.query.id], function (err, result0) {
        var basic=result0[0];
        db.query('select i.id from Item i join User u on i.owner = u.id where u.id=?', [req.query.id], function (err, result) {
            var length=result.length;
            var counter=0;
            var resultArray=[];
            result.forEach(function(item, index){
                var itemId=item.id;
                db.query('select * from Item i where i.id=?', [itemId], function (err, result2) {
                    db.query('select * from Image where item=?', [itemId], function (err2, result3) {
                        result3=result3.map(function(item){
                            return "http://104.197.153.50/img/"+item.url;
                        });
                        result2[0].images = result3;
                        resultArray.push(result2[0]);
                        counter++;
                        if(counter==length){
                            res.json({list: resultArray, basic: basic})
                        }
                    })
                });
            })
        });
    });
});
app.delete('/item', function (req, res) {
    var db = require('./mysql');
    db.query('delete from Item where id=?', [req.query.id], function (err, result) {
        res.json({result: result});
    });
});
app.put('/user', upload.array('image'), function (request, res) {
    var body = request.body;
    var db = require('./mysql');
    var filename;
    if(request.files){
        filename=request.files[0].filename;
    }else{
        filename=null;
    }
    db.query('update User set store_name=?, ceo_name=?, login_id=?, login_pw=?, tel=?, phone=?, video_num=?, image_num=? ,contract_start=?, contract_duration=?, contract_end=?, video_id=?, image_url=? where id=?', [body.store_name, body.ceo_name, body.login_id, body.login_pw, body.tel, body.phone, body.video_num, body.image_num, body.contract_start, body.contract_duration, body.contract_end, body.video_id, filename ,request.query.id], function (err, result) {
        res.json({result: true});
    });
});
app.get('/user', function (req, res) {
    var db = require('./mysql');
    if (req.query.id) {
        db.query('select * from User where id=?', [req.query.id], function (err, result) {
            res.json({result: result[0]});
        });
    } else {
        db.query('select id, store_name from User', function (err, result) {
            res.json({result: result});
        });
    }
});
app.post('/user', function (request, response) {
    var body = request.body;
    var db = require('./mysql');
    db.query('insert into User (store_name, ceo_name, login_id, login_pw, tel, phone, contract_start, contract_duration, contract_end) values (?,?,?,?,?,?,?,?,?)', [body.store_name, body.ceo_name, body.login_id, body.login_pw, body.tel, body.phone, body.contract_start, body.contract_duration, body.contract_end], function (err, result) {
        response.json({result: true});
    });
});

app.get('*', function (request, response) {
    response.sendFile(_path2.default.resolve(__dirname, '../build', 'index.html'));
});

var server = app.listen('3000', function () {
    console.log('Express listening on port', '3000');
});