const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const checkUser = require("../helpers/checkUser");

exports.signUp = asyncHandler(async (req, res, next) => {
	const user = await checkUser(req.body.username);

	if (user) {
		throw new Error("User already exists. Please try another username");
	}

	if (!user) {
		const createdUser = await db.createUserWithHashedPassword(
			req.body.username,
			req.body.password
		);
		res.json({
			message: "User created",
		});
	}
});

exports.logIn = asyncHandler(async (req, res, next) => {
	console.log("login runs");
});
