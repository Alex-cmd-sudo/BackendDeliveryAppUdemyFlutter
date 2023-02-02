const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const Keys = require('./keys');
const User = require('../models/user');

module.exports = (passport) => {
    
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;

    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {

        User.findById(jwt_payload.id, (err, user)=> {

            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }
            else{
                return done(null, null);
            }

        });
    }));
}