var mysql = require('mysql');
var express = require('express');

var bodyParser = require('body-parser');
var path=require('path');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'myweb'
});

var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static((__dirname+"/public")));
app.get('/login', function(request, response) {
    response.sendFile(__dirname + '/login.html');
});

app.post('/auth', function(request, response) {
    var username = request.body.eid;
    var password = request.body.pass;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }           
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/home', function(request, response) {
    
        response.send('Welcome back');
    
    response.end();
});

app.listen(3000);
console.log('Server Started');