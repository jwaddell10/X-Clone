const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const passportJWTStrategy = require("../passport/passportJWT.js");

exports.signUp = asyncHandler(async (req, res, next) => {
	console.log(req.body, "req body signup");
	const user = await db.findUser(req.body.username);
	console.log(user, "user in signup");

	if (user !== null) {
		throw new Error("User already exists. Please try another username");
	} else if (!user) {
		const createdUser = await db.createUserWithHashedPassword(
			req.body.username,
			req.body.password
		);

		const token = passportJWTStrategy.createJWT(createdUser);
		if (token) {
			res.status(200).json({
				message: "User created successfully",
				token: token,
			});
		} else
			res.json({
				message: "An error has occurred. Please try again later",
			});
	}
});

exports.logIn = asyncHandler(async (req, res, next) => {
	console.log(req.body, "req body login");
	const user = await db.findUser(req.body.username);
	console.log(user, "user from findusrebaaA");

	if (user === null) {
		res.json({
			message:
				"Username or password does not match existing user. Please try again",
		});
	} else if (user) {
		const token = passportJWTStrategy.createJWT(user);
		if (token) {
			res.status(200).json({
				message: "User created successfully",
				token: token,
			});
		} else
			res.json({
				message: "An error has occurred. Please try again later",
			});
	}
});
