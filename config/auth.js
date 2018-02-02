//MIDDLE WARE A INCLURE DANS LES ROUTES


var User = require('../app/models/user');

exports.isAuthenticated = function (req, res, next){
// passport populate 2 champs dans req : req.user (c'est la session') et req.isAuthenticated() c'est une fonction qui renvoie un boolean'
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
}

exports.userExist = function(req, res, next) {
    User.count({
        email: req.body.email
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            res.redirect("/signup");
        }
    });
}
