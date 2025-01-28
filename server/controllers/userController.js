const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { getAllImages } = require("../services/cloudinary");

exports.getProfile = asyncHandler(async (req, res, next) => {
	const profile = await db.findProfileByUserId(parseInt(req.params.id));

	if (!profile) {
		res.json({ errorMessage: "Profile not found" });
	} else if (profile) {
		res.json({ profile: profile });
	}
});
