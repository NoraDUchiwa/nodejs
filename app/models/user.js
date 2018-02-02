var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

//On définit le shéma qu'on va utiliser 
var UserSchema = mongoose.Schema({
    firstName:  String,
    lastName:   String,
    email:      String,
    gender : 	String,
    age : 		String,
    salt:       String,
    hash:       String,
    facebookID : String,
    facebook :  mongoose.Schema.Types.ObjectId
});

UserSchema.statics.signUp = function(firstName, lastName, email, password){
		let User = this;

bcrypt.hash(password, salt = 13, function(err, hash) {
	console.log(hash);
		User.create(
		{
			firstName:firstName, lastName:lastName, email:email, salt:salt, hash : hash
		})
	});
};

UserSchema.methods.validPassword = function(password, hash, finish){
	bcrypt.compare(password, hash, function(err, res) { 
 
    	return finish(res); //renvoi la response true ou false qui va etre verifier dans les stratégies(strategies.js)
	});
}

UserSchema.statics.findOrCreate = function(profile, callback){
	var User = this;
	// vérifier sur la base si le user qui utilise ce profil existe ou pas
	// s'il existe tu lui update ses infos par rapport aux changements effectués
	// s'il est pas sur la base, tu vas le create
	// dans le callback de create, tu renverras return callback(null,user);
	// dans le callback de findOne, tu récuperas l'user, tu updateras ses infos, et tu renverras callback(null, user);
	User.findOne({
            'facebookID': profile.id 
        }, function(err, user) {
        	console.log(user);
            if (err) {
                return callback(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                User.create({
                	facebookID: profile.id,
                    lastName: profile.displayName,
                    email: profile.emails[0].value,
                    firstName: profile.username,
                    gender : profile.gender,
                    age: profile.age_range,
                    provider: 'facebook',
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    facebook: profile._json //recuperer les champs en format json
                }, function(err, newUser){
                    if (err) return callback(err);
                    return callback(null, newUser);
                });
            } 
            if(user){
            	user.lastName = profile.name.familyName;
            	user.email = profile.emails[0].value,
            	user.firstName = profile.displayName;
            	user.save(function(err, updatedUser){
            		console.log(err);
            		    return callback(null, updatedUser);
            	});
            }
        });

}

//On crée un model de mongoose sous le nom de User, prenant le schéma UserSchema
var User = mongoose.model("User", UserSchema);
//On exporte la var User
module.exports = User;