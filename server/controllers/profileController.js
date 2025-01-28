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
	console.log(req.body, "req body edit profile");
	console.log(req.params, "req params edit proifle");
	const profile = await db.findProfile(parseInt(req.params.id))
	console.log(profile, 'profile')
});
