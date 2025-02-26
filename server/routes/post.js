const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')
const JWTMethods = require("../passport/passportJWT")

router.get("/", postController.getAllPosts)
router.get("/:id/comment", postController.getComments)

router.post("/", postController.submitPost)
router.post("/:postId/comment", postController.replyToPost)
router.post("/:postId/comment/:commentId", postController.replyToComment);
router.post("/:id/like", postController.likePost)
router.post("/comment/:commentId/like", postController.likeComment)

router.delete("/:postId/unlike", postController.unLikePost)
router.delete("/comment/:commentId/unlike", postController.unLikeComment)

module.exports = router;