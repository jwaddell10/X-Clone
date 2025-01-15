const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getAllPosts = asyncHandler(async(req, res, next) => {
    
})

exports.submitPost = asyncHandler(async (req, res, next) => {
	const user = await db.findUserById(parseInt(req.body.id));
	if (user === null) {
		res.json({ message: "No user found, please try again later" });
	}

	const createdPost = db.createPost(user, req.body.text);

	if (!createdPost) {
		res.json({ message: "Unable to create post, please try again later" });
	} else if (createdPost) {
		res.json({ createdPost });
	}
	//create post (ensure no error)
	//send success back to user, refresh page so post displays
});
