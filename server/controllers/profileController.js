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
		res.json({
			errorMessage: "Error when creating profile. Try again later",
		});
	} else if (profile) {
		res.json(profile);
	}
});
