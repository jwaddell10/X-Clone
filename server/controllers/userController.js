const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { getAllImages } = require("../services/cloudinary");

exports.getUserPost = asyncHandler(async (req, res, next) => {
	const post = await db.findPost(parseInt(req.params.postId));

	if (post === null) {
		return res.json({
			errorMessage:
				"An error has occurred fetching post. Try again later",
		});
	}

	res.json({ post });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await db.findAllUsersWithProfilePicture();

	if (!users) {
		res.json({ errorMessage: "Unable to fetch users." });
	}

	res.json({ users });
});

exports.getProfile = asyncHandler(async (req, res, next) => {
	const profile = await db.findProfileByUserId(parseInt(req.params.profileId));
	if (!profile) {
		res.json({ errorMessage: "Profile not found" });
	}

	if (profile) {
		res.json({ profile });
	}
});
