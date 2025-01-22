const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getProfile = asyncHandler(async (req, res, next) => {
	const profile = await db.findProfile(parseInt(req.params.id));
	console.log(profile, "profile");

	if (!profile) {
		res.json({ errorMessage: "Profile not found" });
	} else if (profile) {
		res.json({ profile: profile });
	}
});
