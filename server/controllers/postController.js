const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const getItemsInAscendingOrderAndClosestToNowFirst = require("../helpers/getItemsInAscendingOrderAndClosestToNowFirst");

exports.getAllPosts = asyncHandler(async (req, res, next) => {
	const posts = await db.findAllPosts();
	const sortedPosts =
		getItemsInAscendingOrderAndClosestToNowFirst.getItemsInAscendingOrderAndClosestToNowFirst(
			posts
		);

	if (sortedPosts === null) {
		res.json({ message: "No posts available" });
	}

	if (sortedPosts) {
		res.json({ sortedPosts });
	}
});

exports.getComments = asyncHandler(async (req, res, next) => {
	const comments = await db.findParentCommentsForPost(
		parseInt(req.params.id)
	);
	const sortedComments =
		getItemsInAscendingOrderAndClosestToNowFirst.getItemsInAscendingOrderAndClosestToNowFirst(
			comments
		);
	if (sortedComments === null) {
		res.json({ message: "No comments available" });
	}

	if (sortedComments) {
		res.json({ sortedComments });
	}
});

exports.submitPost = asyncHandler(async (req, res, next) => {
	const createdPost = await db.createPost(
		parseInt(req.body.loggedInUserId),
		req.body.text
	);

	if (!createdPost) {
		res.status(500).json({
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
	const replyToComment = await db.createReplyToComment(
		parseInt(req.params.postId),
		parseInt(req.params.commentId),
		parseInt(req.body.loggedInUserId),
		req.body.text
	);

	if (!replyToComment) {
		res.json({ errorMessage: "Error occurred creating comment" });
	}
	if (replyToComment) {
		res.json({ replyToComment });
	}
});

exports.likePost = asyncHandler(async (req, res, next) => {
	const post = await db.findPost(parseInt(req.params.id));
	const comment = await db.findComment(parseInt(req.params.id));

	if (post === null && comment === null) {
		res.json({ message: "Unable to like item" });
	}

	let addedLike;

	if (post !== null) {
		addedLike = await db.createPostLike(
			parseInt(req.params.id),
			parseInt(req.body.loggedInUserId)
		);
	}

	if (comment !== null) {
		addedLike = await db.createCommentLike(
			parseInt(req.params.id),
			parseInt(req.body.loggedInUserId)
		);
	}

	if (addedLike === null) {
		return res.json({ message: "Unable to add like" });
	}

	res.json({ addedLike });
});

exports.likeComment = asyncHandler(async (req, res, next) => {
	const comment = await db.findComment(parseInt(req.params.commentId));
	if (comment === null) {
		res.json({ errorMessage: "Unable to fetch post. Try again later" });
	}

	const addedLike = await db.createCommentLike(
		parseInt(req.params.commentId),
		parseInt(req.body.loggedInUserId),
		parseInt(req.params.id)
	);

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
