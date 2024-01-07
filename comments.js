// Create web server application

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var comments = require('./comments.json');
var fs = require('fs');

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a static file directory to use for default routing
app.use(express.static(path.join(__dirname, 'public')));

// Set up a route for index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Set up a route for comments.json
app.get('/comments.json', function(req, res) {
    res.sendFile(path.join(__dirname, 'comments.json'));
});

// Set up a route for new comments
app.post('/newComment', function(req, res) {
    var name = req.body.name;
    var comment = req.body.comment;
    var newComment = {
        name: name,
        comment: comment
    };
    comments.push(newComment);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});

// Set up a route for delete comments
app.post('/deleteComment', function(req, res) {
    var index = req.body.index;
    comments.splice(index, 1);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});

// Set up a route for edit comments
app.post('/editComment', function(req, res) {
    var index = req.body.index;
    var name = req.body.name;
    var comment = req.body.comment;
    var newComment = {
        name: name,
        comment: comment
    };
    comments.splice(index, 1, newComment);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});

// Set up a 404 error page
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/404.html'));
});

// Set up the server
var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});
