var mongoose = require("mongoose");
var User = require("../app/models/user");
var LocalStrategy = require('passport-local').Strategy;

var FbStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    //  console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  passport.use(new LocalStrategy({usernameField : "firstName", passwordField : "pass"},
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        user.validPassword(password, user.hash, function(res){ //function est le call back après la verification de la fonction ValidPassword dans user.js

          //La redirection si res est true ou false se fait dans les routes 

            if (res) return done(null, user); //done est le callback de passport prend 2 arguments : en premier, erreur
            else return done(null, false);

        });
      });
    }
  ));

  /////FACEBOOK STRATEGY

  passport.use(new FbStrategy({
    clientID: '1971484736435390',
    clientSecret: '682a4fb9e340e65231802f0859a3589c',
    callbackURL: "http://localhost:9999/callbackfb",
    profileFields: ['id', 'displayName', 'photos', 'email',"name", "gender","age_range"]
  },
  function(accessToken, refreshToken, user, cb) {
    User.findOrCreate( user, function (err, user) {
      //console.log(user);
      return cb(err, user);
    });
  }
));


}

