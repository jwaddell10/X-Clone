const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController.js");
const JWTMethods = require("../passport/passportJWT")

router.get("/image", profileController.getAllImageUrls);
router.get("/:id", profileController.getProfilePosts);

router.post("/edit/:id", JWTMethods.verifyToken, profileController.editProfile);
router.post("/:userId/:id/follow", JWTMethods.verifyToken, profileController.followProfile);

router.delete("/:userId/:id/unfollow", JWTMethods.verifyToken, profileController.unFollowProfile);

module.exports = router;
