"use strict";
exports.__esModule = true;
var bcrypt = require("bcryptjs");
var passport = require("passport");
var express_validator_1 = require("express-validator");
var user_1 = require("../models/user");
exports.log_register_get = function (req, res) {
    res.render("signup");
};
exports.log_register_post = [
    (0, express_validator_1.body)("username", "Username required").trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)('email', 'Email required').isEmail().normalizeEmail().escape(),
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
                    password: hashedPassword
                });
                // Check if User with same username already exists.
                user_1["default"].findOne({ name: user.username }).exec(function (err, found_user) {
                    if (err) {
                        return next(err);
                    }
                    if (found_user) {
                        // username already exists.
                        res.render("signup", { errors: ['Username already exists'] });
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
exports.log_signin_post = function (req, res) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    });
};
exports.log_signout_get = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
