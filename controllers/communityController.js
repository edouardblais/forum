"use strict";
exports.__esModule = true;
exports.index = function (req, res) {
    res.render("index", { user: req.user });
};
exports.community_list = function (req, res) {
    res.send("NOT IMPLEMENTED: communities list");
};
exports.community_detail = function (req, res) {
    res.send("NOT IMPLEMENTED: community detail: ".concat(req.params.id));
};
exports.community_create_get = function (req, res) {
    res.send("NOT IMPLEMENTED: community create GET");
};
exports.community_create_post = function (req, res) {
    res.send("NOT IMPLEMENTED: community create POST");
};
exports.community_delete_get = function (req, res) {
    res.send("NOT IMPLEMENTED: community delete GET");
};
exports.community_delete_post = function (req, res) {
    res.send("NOT IMPLEMENTED: community delete POST");
};
