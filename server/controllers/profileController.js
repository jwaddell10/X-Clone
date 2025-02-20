const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { urls } = require("../services/cloudinary");

exports.getAllImageUrls = asyncHandler(async (req, res, next) => {
	const imageUrls = urls.map(
		(url) => "https://res.cloudinary.com/dak6py2ng/image/upload/" + url
	);

	if (imageUrls !== null) {
		res.json(imageUrls);
	} else res.json({ errorMessage: "Error fetching profile images" });
});

exports.editProfile = asyncHandler(async (req, res, next) => {
	const { formData } = req.body;

	const profile = await db.updateProfile(
		parseInt(req.params.id),
		formData.imageUrl,
		formData.username,
		parseInt(req.body.userId)
	);

	if (!profile) {
		res.status(400).json({
			errorMessage: "Error when creating profile. Try again later",
		});
	} else if (profile) {
		res.status(200).json(profile);
	}
});

exports.getProfilePosts = asyncHandler(async (req, res, next) => {
	const profilePosts = await db.findAllUserPosts(parseInt(req.params.id));

	if (profilePosts === null) {
		return res.json({ errorMessage: "No posts at this time" });
	}

	res.json({ profilePosts });
});

exports.followProfile = asyncHandler(async (req, res, next) => {
	const followProfile = await db.createFollowProfile(
		parseInt(req.params.userId),
		parseInt(req.params.id)
	);
	if (!followProfile) {
		return res.json({ error: "Error occurred when following profile" });
	}

	res.json({ followProfile });
});

exports.unFollowProfile = asyncHandler(async (req, res, next) => {
	const unFollowProfile = await db.deleteFollowProfile(
		parseInt(req.params.userId),
		parseInt(req.params.id)
	);
	
	if (!unFollowProfile) {
		return res.json({ error: "Error occurred when following profile" });
	}

	res.json({ unFollowProfile });
});
