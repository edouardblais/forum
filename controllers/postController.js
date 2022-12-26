const Post = require("../models/post");

exports.post_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: post create GET");
};

exports.post_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: post create POST");
};

exports.post_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: post delete GET");
};

exports.post_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: post delete POST");
};

exports.post_detail = (req, res) => {
    res.send(`Not implemented: post detail: ${req.params.id}`)
}