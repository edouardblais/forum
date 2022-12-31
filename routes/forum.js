const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");
const comment_controller = require("../controllers/commentController");

// home page
router.get("/", user_controller.index);

/// USER ROUTES ///

router.get("/register", user_controller.log_register_get);

router.post("/register", user_controller.log_register_post);

router.get("/signin", user_controller.log_signin_get);

router.post("/signin", user_controller.log_signin_post);

router.get("/signout", user_controller.log_signout_get);

/// COMMENT ROUTES ///

router.get("/comment/create", comment_controller.comment_create_get);

router.post("/comment/create", comment_controller.comment_create_post);

router.get("/comment/:id/delete", comment_controller.comment_delete_get);

router.post("/comment/:id/delete", comment_controller.comment_delete_post);

router.get("/comment/:id/update", comment_controller.comment_update_get);

router.post("/comment/:id/update", comment_controller.comment_update_post);

module.exports = router;
