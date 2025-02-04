const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { getAllImages } = require("../services/cloudinary");

exports.getSingleUser = asyncHandler(async (req, res, next) => {
	const profile = await db.findProfileByUserId(parseInt(req.body.id));

	if (!profile) {
		return res.status(400).json({ errorMessage: "User not found" });
	}

	return res.status(200).json(profile);
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await db.findAllUsersWithProfilePicture();

	if (!users) {
		res.json({ errorMessage: "Unable to fetch users." });
	}

	res.json({ users });
});

exports.getProfile = asyncHandler(async (req, res, next) => {
	const profile = await db.findProfileByUserId(parseInt(req.params.id));

	if (!profile) {
		res.json({ errorMessage: "Profile not found" });
	} else if (profile) {
		res.json({ profile: profile });
	}
});
