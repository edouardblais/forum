"use strict";
exports.__esModule = true;
var bcrypt = require("bcryptjs");
var passport = require("passport");
var express_validator_1 = require("express-validator");
var user_1 = require("../models/user");
var async = require("async");
var LocalStrategy = require("passport-local").Strategy;
// Passport functions for authentification controllers
passport.use(new LocalStrategy(function verify(username, password, cb) {
    user_1["default"].findOne({ username: username }, function (err, user) {
        if (err) {
            return cb(err);
        }
        if (!user) {
            return cb(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, function (err, res) {
            if (res) {
                // passwords match! log user in
                return cb(null, user);
            }
            else {
                // passwords do not match!
                return cb(null, false, { message: "Incorrect password" });
            }
        });
    });
}));
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, user);
    });
});
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
// home controller
exports.index = function (req, res) {
    res.render("index", { user: req.user });
};
// authentification controllers
exports.log_register_get = function (req, res) {
    res.render("signup");
};
exports.log_register_post = [
    (0, express_validator_1.body)("username", "Username required").trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)('email', 'Email required').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password', 'Password of minimally 8 characters required').trim().isLength({ min: 8 }).escape(),
    (0, express_validator_1.body)('confirmpassword', 'Password must be the same as above').custom(function (value, _a) {
        var req = _a.req;
        return value === req.body.password;
    }),
    function (req, res, next) {
        // Extract the validation errors from a request.
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render("signup", { errors: errors.array() });
        }
        else {
            // Hashing password
            bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
                if (err) {
                    return next(err);
                }
                // creating user
                var user = new user_1["default"]({
                    username: req.body.username,
                    password: hashedPassword,
                    email: req.body.email,
                    member_since: Date.now(),
                    admin: false
                });
                async.parallel({
                    // Check if user with same email already exists
                    useremail: function (callback) {
                        user_1["default"].findOne({ email: user.email }).exec(callback);
                    },
                    // Check if User with same username already exists.
                    username: function (callback) {
                        user_1["default"].findOne({ name: user.username }).exec(callback);
                    }
                }, function (err, results) {
                    if (err) {
                        return next(err);
                    }
                    if (results.useremail) {
                        // username already exists.
                        res.render("signup", { errors: ['A user with the same email already exists!'] });
                    }
                    else if (results.username) {
                        // username already exists.
                        res.render("signup", { errors: ['A user with the same username already exists!'] });
                    }
                    else {
                        user.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.redirect("/");
                        });
                    }
                    ;
                });
            });
        }
    }
];
exports.log_signin_get = function (req, res) {
    res.render("signin");
};
exports.log_signin_post = function (req, res, next) {
    passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login', failureMessage: true })(req, res, next);
};
exports.log_signout_get = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
