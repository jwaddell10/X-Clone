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
		// console.log(createdUser, 'created user')
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
	console.log(user, "user from finduserlogin");

	if (user !== null) {
		const token = passportJWTStrategy.createJWT(user);
		console.log(user, "user");
		if (token) {
			res.status(200).json({
				message: "User logged in successfully",
				token: token,
				id: user.id,
			});
		} else
			res.json({
				message: "an error has occurred",
			});
	} else
		res.json({
			message:
				"User not found with that username/password. Please try again",
		});
});
