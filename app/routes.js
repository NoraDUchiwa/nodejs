
var User = require('./models/user');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var Auth = require('../config/auth.js')
var Reader = require("../reader");

module.exports = function(app){
	app.get("/", Auth.isAuthenticated ,function(req, res){
		// méthode de l'objet response qui nous permet de renseigner une vue à afficher
		    console.log(req.user);

		res.render("layout.twig", {page : '../views/index.twig'});	//envoyer objet e à la route
	}),
	app.get("/login", function(req, res){
		res.render("layout.twig", {message : "login", page : 'login.twig'});
	})

	app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);

	app.get("/signup",Auth.userExist, function(req, res){
		res.render("layout.twig", {page : 'signup.twig'});
	})
	app.post("/signup", function(req, res){
		User.signUp(req.body.nom, req.body.prenom, req.body.email, req.body.password);
		res.redirect("/");
	
	})

	//CONNECT WITH FB

	app.get('/facebook',
 		 passport.authenticate('facebook', {scope:["email","public_profile"]}));//renvoie les paramètres autorisé de facebook 

	app.get('/callbackfb',
  	passport.authenticate('facebook', { failureRedirect: '/login' }),
  		function(req, res) {
    // Successful authentication, redirect home.
   		 res.redirect('/');
 	 });

	app.get("/parser", function(req, res){
		res.render("layout.twig", {page : 'parser.twig'});
	});

	app.post("/render", function(req, res){
		var reader = new Reader("./public/cinemas-a-paris.json");
		var filteredArray = reader.search(req.body, function(result) {
			res.send(result);
		});
		//res.render("layout.twig", {page : 'reader.twig'});
	});
}