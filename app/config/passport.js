'use strict';


var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');
//var configAuth = require('./auth');


module.exports = function (passport) {



	
	
	
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	


passport.use(new LocalStrategy(
  function(username, password, done) {
   
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
  	  console.log("sup",username);
      return done(null, user);
    });
  }
));
};
