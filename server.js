
var express = require('express')
var app = express()
var mysql = require('mysql');
var connected = false;
var connection = mysql.createConnection({
  host     : 'us-cdbr-sl-dfw-01.cleardb.net',
  user     : 'bcc2107420a577',
  password : 'ef936b7a',
});
connection.connect(function(err) {
  // connected! (unless `err` is set)
  if(!err)
    console.log("Connected to Database!");
  else
    console.log("Cannot connect to Database!");
  
});
app.get("/api/visitors", function (request, response) {
  var names = [];
  if(!connection) {
    response.json(names);
    return;
  }
  console.log("Sending data from database...");
  var query = connection.query('SELECT * FROM ', function(err, result, fields) {
    // Neat!
    if(err) throw err;
  });
});
app.use(express.static(__dirname + '/views'));
app.listen(3000, function () {
  console.log('Assist running on port 3000!');
});

