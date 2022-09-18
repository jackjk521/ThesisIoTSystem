const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt; // to extract the token from the url
const opts = {}
const UserModel = require("./app/Models/usermodel");
const passport = require("passport")
 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // extrat without bearer and authenticate if it is JWT
opts.secretOrKey = 'Random string'; // secretPrivateKey

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload); // test this first with token

    UserModel.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
            console.log("successfully authenticated")
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
