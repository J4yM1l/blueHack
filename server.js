var express = require('express')
var app = express()
var mysql = require('mysql');
var connected = false;
var connection = mysql.createConnection({
    host: 'us-cdbr-sl-dfw-01.cleardb.net',
    user: 'bcc2107420a577',
    password: 'ef936b7a',
});
connection.connect(function(err) {
    // connected! (unless `err` is set)
    if (!err)
        console.log("Connected to Database!");
    else
        console.log("Cannot connect to Database!");

});
app.get("/api/visitors", function(request, response) {
    var names = [];
    if (!connection) {
        response.json(names);
        return;
    }
    console.log("Sending data from database...");

    connection.changeUser({
        database: 'ibmx_2ad1bdc751c11d5'
    }, function(err) {
        if (err) {
            console.log('error in changing database', err);
            return;
        }
        var query = connection.query('SELECT * FROM rescuers', function(err, result, fields) {
            // Neat!
            if (err) throw err;
            console.log(result);
        });
    });
});

// var devMode = process.env.NODE_ENV == 'production';
// var port = (!devMode) ? process.env.PORT : 3000;

var port = process.env.PORT;

app.use(express.static(__dirname + '/views'));
app.listen(port, function() {
    console.log('Assist running on port: ' + port);
});