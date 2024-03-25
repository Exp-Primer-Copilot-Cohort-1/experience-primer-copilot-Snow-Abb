// Create web server
// Create a GET route that returns all comments
// Create a POST route that creates a new comment
// Create a DELETE route that deletes a comment
// Create a PUT route that updates a comment

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var port = 8080;

app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
      res.send(data);
    }
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments), function(err) {
        if (err) {
          console.error(err);
          res.status(500).send('Server Error');
        } else {
          res.status(201).send('Comment created');
        }
      });
    }
  });
});

app.delete('/comments/:id', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
      var comments = JSON.parse(data);
      comments.splice(req.params.id, 1);
      fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments), function(err) {
        if (err) {
          console.error(err);
          res.status(500).send('Server Error');
        } else {
          res.send('Comment deleted');
        }
      });
    }
  });
});

app.put('/comments/:id', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
      var comments = JSON.parse(data);
      comments[req.params.id] = req.body;