var express = require("express"); //import du modul express
var app = express(); 
var twig = require("twig");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require("express-session");
// app représente l'objet au complet de express (notre MVC)
// use permet de paramètrer différentes options dans le MVC
// l'option parametrée ici est : encodage de l'url en json
app.use(bodyParser.urlencoded({"extended":true}))
app.use(express.static("public"));
app.use(session({secret :"catsanddogs", resave:true, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());

require("./config/strategies")(passport); //renvoie les stratégies sous le nom passport


var errorHandler = require("errorhandler");
var mongoose = require("mongoose");
require("./app/routes.js")(app); // creation de l'objet app qui require les routes dans routes.js

// si NODE_ENV a été assignée, on prend NODE_ENV, sinon on prend development
var env = process.env.NODE_ENV || "development";

// je require le fichier config.js (de mon dossier config) et je lui demande de charger la clé "development" grâce a ma variable env
var config = require("./config/config")[env];

// demande à notre application d'utiliser les error handler lorsqu'on est dans un environnement development
app.set("development" , function(){
	app.use(express.errorHandler());
});

var db = mongoose.connect(config.mongodb)
app.listen(9999);