var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

// Connection to database
var connection = mysql.createConnection({
     'host'     : process.env.IP,
     'user'     : process.env.C9_USER,
     'password' : '',
     'database' : 'ticket_time'
});
connection.connect(function (err) {
     if(err) {
          console.log('The error was ', err.stack);
          return;
     }
     console.log('Successfully connected with id: ' + connection.threadId);
});

// =========================================================================
// passport session setup 
// =========================================================================
    
passport.serializeUser(function(user, done) {
     done(null, user.id);
});

passport.deserializeUser(function(id, done) {
     connection.query("select * from users where id = "+id,function(err,rows){	
		done(err, rows[0]);
     });
});