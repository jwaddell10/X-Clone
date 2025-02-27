const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const timeAgo = require("../helpers/timeAgo.js");

exports.getAllPosts = asyncHandler(async (req, res, next) => {
	const posts = await db.findAllPosts();

	if (posts === null) {
		res.json({ message: "No posts available" });
	}

	if (posts) {
		res.json({ posts });
	}
});

exports.getComments = asyncHandler(async (req, res, next) => {
	const comments = await db.findComments(parseInt(req.params.id));
	if (comments === null) {
		res.json({ message: "No comments available" });
	}

	if (comments) {
		res.json({ comments });
	}
});

exports.submitPost = asyncHandler(async (req, res, next) => {
	const user = await db.findUserById(parseInt(req.body.id));

	if (user === null) {
		res.json({ message: "No user found, please try again later" });
	}

	const createdPost = await db.createPost(user, req.body.text);

	if (!createdPost) {
		res.status(400).json({
			message: "Unable to create post, please try again later",
		});
	} else if (createdPost) {
		res.json({ createdPost });
	}
});

exports.replyToPost = asyncHandler(async (req, res, next) => {
	const replyToPost = await db.createReplyToPost(
		parseInt(req.params.postId),
		parseInt(req.body.loggedInUserId),
		req.body.text
	);

	if (!replyToPost) {
		res.json({ errorMessage: "Error occurred creating comment" });
	}
	if (replyToPost) {
		res.json({ replyToPost });
	}
});

exports.replyToComment = asyncHandler(async (req, res, next) => {
	console.log(req.params, "req params", req.body, "req body");

	const replyToComment = await db.createReplyToComment(
		parseInt(req.params.postId),
		parseInt(req.params.commentId),
		parseInt(req.body.loggedInUserId),
		req.body.text
	);
	console.log(replyToComment, "comment reply");

	if (!replyToComment) {
		res.json({ errorMessage: "Error occurred creating comment" });
	}
	if (replyToComment) {
		res.json({ replyToComment });
	}
});

exports.likePost = asyncHandler(async (req, res, next) => {
	const post = await db.findPost(parseInt(req.params.id));

	if (post === null) {
		res.json({ errorMessage: "Unable to fetch post. Try again later" });
	}

	const addedLike = await db.createPostLike(
		parseInt(req.params.id),
		parseInt(req.body.loggedInUserId)
	);

	if (addedLike === null) {
		return res.json({ message: "Unable to add like" });
	}

	res.json({ addedLike });
});

exports.likeComment = asyncHandler(async (req, res, next) => {
	console.log(req.params, "req params");
	const comment = await db.findComment(parseInt(req.params.commentId));
	if (comment === null) {
		res.json({ errorMessage: "Unable to fetch post. Try again later" });
	}

	const addedLike = await db.createCommentLike(
		parseInt(req.params.commentId),
		parseInt(req.body.loggedInUserId),
		parseInt(req.params.id)
	);
	console.log(addedLike, "added like");

	if (addedLike === null) {
		return res.json({ message: "Unable to add like" });
	}

	res.json({ addedLike });
});

exports.unLikePost = asyncHandler(async (req, res, next) => {
	const deletedLike = await db.deleteLike(parseInt(req.body.likeId));
	if (!deletedLike) {
		res.json({ errorMessage: "Unable to remove like" });
	}
	res.json({
		deletedLike: deletedLike,
	});
});

exports.unLikeComment = asyncHandler(async (req, res, next) => {
	const deletedLike = await db.deleteLike(parseInt(req.body.likeId));
	if (!deletedLike) {
		res.json({ errorMessage: "Unable to remove like" });
	}
	res.json({ deletedLike });
});
