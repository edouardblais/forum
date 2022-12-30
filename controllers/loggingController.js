"use strict";
exports.__esModule = true;
var bcrypt = require("bcryptjs");
var passport = require("passport");
var user_1 = require("../models/user");
exports.log_register_get = function (req, res) {
    res.render("signup");
};
exports.log_register_post = function (req, res, next) {
    bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
        if (err) {
            return next(err);
        }
        var user = new user_1["default"]({
            username: req.body.username,
            password: hashedPassword
        }).save(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    });
};
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
