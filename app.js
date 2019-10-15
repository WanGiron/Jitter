var express = require('express');
var mysql = require('mysql');
var path = require("path");



//server //
var app = express();

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

// to insert posts to db // 
app.get('/postblog', function (req, res) {
console.log(req.body);
    var post = {
        my_blogs: req.body.my_blogs
    }

    var sql = 'INSERT INTO blog_body SET ?';
    db.query(sql, post, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send('blog created');
    })
})

//to get all posts from db //
app.get('/gettheposts', function (rep, res) {
    var sql = 'SELECT * FROM blog_body';
    db.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results)
        res.json(results);
    })
})

//server setup //
app.listen('3000', function () {
    console.log('listening on port 3000');
})