const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const timeAgo = require("../helpers/timeAgo.js")

exports.getAllPosts = asyncHandler(async (req, res, next) => {
	const posts = await db.findAllPosts();

	if (posts === null) {
		res.json({ message: "No posts available" });
	}

	if (posts) {
		res.json({ posts });
	}
});

exports.submitPost = asyncHandler(async (req, res, next) => {
	
    const user = await db.findUserById(parseInt(req.body.id));
	
    if (user === null) {
		res.json({ message: "No user found, please try again later" });
	}

	const createdPost = await db.createPost(user, req.body.text);

	if (!createdPost) {
		res.status(400).json({ message: "Unable to create post, please try again later" });
	} else if (createdPost) {
		res.json({ createdPost });
	}
});
