var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/users');
var bcrypt = require('bcrypt')


module.exports = function(passport) {
   passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

   passport.use('local-login', new LocalStrategy(
       {
            usernameField : 'email',
            passwordField : 'pass',
            passReqToCallback : true
        },
        function(req, email, password, done) {
                process.nextTick(function() {
                User.findOne({ 'email' :  req.body.email }, async function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (!await bcrypt.compare(req.body.pass, user.pass))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                return done(null, user);
                });
            });
        }
   ));

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'pass',
            passReqToCallback : true 
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                User.findOne({ 'email' : req.body.email }, async function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Email  đã tồn tại .'));
                    } else {
                        if(req.body.pass!==req.body.repass)
                            return done(null, false, req.flash('signupMessage', 'Mật khẩu không khớp .'));
                        var newUser = new User({
                            username: req.body.username,
                            birthday: req.body.birthday,
                            sex: req.body.gender,
                            email: req.body.email,
                            address: req.body.address,
                            pass : await bcrypt.hash(req.body.pass, 10),
                            });
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));
}
