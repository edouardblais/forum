const Community = require("../models/community");

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

exports.community_list = (req, res) => {
  res.send("NOT IMPLEMENTED: communities list");
};

exports.community_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: community detail: ${req.params.id}`);
};

exports.community_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: community create GET");
};

exports.community_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: community create POST");
};

exports.community_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: community delete GET");
};

exports.community_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: community delete POST");
};
