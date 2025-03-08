const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const bcryptjs = require("bcryptjs");
const passportJWTStrategy = require("../passport/passportJWT.js");

exports.signUp = asyncHandler(async (req, res, next) => {
	const user = await db.findUser(req.body.username);

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
				id: createdUser.id,
			});
		} else
			res.json({
				message: "An error has occurred. Please try again later",
			});
	}
});

exports.logIn = asyncHandler(async (req, res, next) => {
	console.log(req.body, "req body login");

	//handle guest login
	if (req.body.guestUsername) {
		const user = await db.findUser(req.body.guestUsername);

		if (user === null) {
			return res.json({
				errorMessage: "Unable to login, try again later",
			});
		}

		if (user !== null) {
			const token = passportJWTStrategy.createJWT(user);
			if (token) {
				return res.status(200).json({
					message: "User logged in successfully",
					token: token,
					id: user.id,
				});
			} else
				return res.json({
					message: "an error has occurred",
				});
		} else
			return res.json({
				message:
					"User not found with that username/password. Please try again",
			});
	}

	//handle non-guest login
	const user = await db.findUser(req.body.username, req.body.password);

	if (user === null) {
		return res.json({ message: "Incorrect username." });
	}

	const isMatch = await bcryptjs.compare(req.body.password, user.password);

	if (isMatch === false) {
		return res.json({ message: "Incorrect password." });
	}

	if (user !== null) {
		const token = passportJWTStrategy.createJWT(user);
		if (token) {
			return res.status(200).json({
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
