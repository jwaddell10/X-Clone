const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')
const JWTMethods = require("../passport/passportJWT")

router.get("/", postController.getAllPosts)
router.post("/", postController.submitPost)

router.post("/:id/like", postController.likePost)

module.exports = router;