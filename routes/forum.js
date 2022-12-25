const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");
const community_controller = require("../controllers/communityController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

/// COMMUNITIES ROUTES ///

// home page
router.get("/", community_controller.index);

router.get("/community/create", community_controller.community_create_get);

router.post("/community/create", community_controller.community_create_post);

router.get("/community/:name/:id/delete", community_controller.community_delete_get);

router.post("/community/:name/:id/delete", community_controller.community_delete_post);

router.get("/community/:name/:id", community_controller.community_detail);

router.get("/communities", community_controller.community_list);

/// USER ROUTES ///

router.get("/user/create", user_controller.user_create_get);

router.post("/user/create", user_controller.user_create_post);

router.get("/user/:username/:id/delete", user_controller.user_delete_get);

router.post("/user/:username/:id/delete", user_controller.user_delete_post);

router.get("/user/:username/:id", user_controller.user_detail);

/// POST ROUTES ///

router.get("/post/create", post_controller.post_create_get);

router.post("/post/create", post_controller.post_create_post);

router.get("/post/:id/delete", post_controller.post_delete_get);

router.post("/post/:id/delete", post_controller.post_delete_post);

router.get("/post/:id", post_controller.post_detail);

/// COMMENT ROUTES ///

router.get("/comment/create", comment_controller.comment_create_get);

router.post("/comment/create", comment_controller.comment_create_post);

router.get("/comment/:id/delete", comment_controller.comment_delete_get);

router.post("/comment/:id/delete", comment_controller.comment_delete_post);

router.get("/comment/:id/update", comment_controller.comment_update_get);

router.post("/comment/:id/update", comment_controller.comment_update_post);

module.exports = router;
