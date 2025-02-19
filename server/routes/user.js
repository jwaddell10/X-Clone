const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

router.get("/", userController.getAllUsers)
router.get("/profile/:profileId", userController.getProfile)
router.get("/:username/:postId", userController.getUserPost)

module.exports = router;
