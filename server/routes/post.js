const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')
const JWTMethods = require("../passport/passportJWT")

router.get("/", postController.getAllPosts)
router.get("/:id/comment", postController.getComments)

router.post("/", JWTMethods.verifyToken, postController.submitPost)
router.post("/:postId/comment", JWTMethods.verifyToken, postController.replyToPost)
router.post("/:postId/comment/:commentId", JWTMethods.verifyToken, postController.replyToComment);
router.post("/:id/like", JWTMethods.verifyToken, postController.likePost)
router.post("/comment/:commentId/like", JWTMethods.verifyToken, postController.likeComment)

router.delete("/:postId/unlike", JWTMethods.verifyToken, postController.unLikePost)
router.delete("/comment/:commentId/unlike", JWTMethods.verifyToken, postController.unLikeComment)

module.exports = router;