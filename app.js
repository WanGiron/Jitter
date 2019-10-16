var express = require('express');
var mysql = require('mysql');
var path = require("path");
var bodyParser = require('body-parser');


//server //
var app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ type: 'application/json' }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

// app.use(function (req, res) {
// res.setHeader('Content-Type', 'text/plain')
// // res.write('you posted:\n')
// // res.end(JSON.stringify(req.body, null, 2))
// })
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());






//Static folder//
app.use(express.static(__dirname + '/assets'));

// Homepage route //
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/index.html"));
});


//create connectioin to database//
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pollito#2',
    database: 'blog'
});

db.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('database connected!');
})



//to get all posts from db //
app.get('/gettheposts', function (req, res) {
    var sql = 'SELECT * FROM blog_body';
    db.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results)
        res.json(results);
    })
})

// to insert posts to db // 
app.post('/postblog', function(req, res){
    var frontPost = req.body;
    console.log("this is the body"+JSON.stringify(frontPost));
    // console.log('this is before'+req.body+'this is after')
    // console.log('this'+JSON.stringify(req.query))
    var post = {
        my_blogs: frontPost.data
    }
    var sql = 'INSERT INTO blog_body SET ?';
    db.query(sql, post, function (err, result) {
        if (err) throw err;
        console.log(result);
    })
    res.json(frontPost);
})

//server setup //
app.listen('3000', function () {
    console.log('listening on port 3000');
})