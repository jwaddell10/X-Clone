const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController.js");

router.get("/image", profileController.getAllImageUrls);
router.get("/:id", profileController.getProfilePosts);

router.post("/edit/:id", profileController.editProfile);
router.post("/:userId/:id/follow", profileController.followProfile);

router.delete("/:userId/:id/unfollow", profileController.unFollowProfile);

module.exports = router;
