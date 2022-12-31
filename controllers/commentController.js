"use strict";
exports.__esModule = true;
var express_validator_1 = require("express-validator");
var comment_1 = require("../models/comment");
exports.comment_create_post = [
    (0, express_validator_1.body)("comment", "Please enter a comment").trim().isLength({ min: 1 }).escape(),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render("/", { errors: errors.array() });
        }
        else {
            var comment = new comment_1["default"]({
                comment: req.body.comment,
                date: Date.now(),
                user: res.locals.currentUser
            });
            comment.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        }
    }
];
exports.comment_delete_post = function (req, res, next) {
    comment_1["default"].findByIdAndRemove(req.params.id.toString(), function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
