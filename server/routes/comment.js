const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')

router.get("/:name/:commentId", commentController.getComment)

module.exports = router