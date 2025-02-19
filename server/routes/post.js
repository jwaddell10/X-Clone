const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')
const JWTMethods = require("../passport/passportJWT")

router.get("/", postController.getAllPosts)
router.get("/:id/comment", postController.getComments)

router.post("/", postController.submitPost)
router.post("/:id/like", postController.likePost)
router.post("/:id/comment/:commentId/like", postController.likeComment)

router.delete("/:postId/unlike", postController.unLikePost)
router.delete("/:id/comment/:commentId/unlike", postController.unLikeComment)


module.exports = router;