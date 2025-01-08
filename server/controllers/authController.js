const express = require("express");
const asyncHandler = require("express-async-handler");

exports.signUp = asyncHandler(async (req, res, next) => {
	console.log("signuppost runs");
});

exports.logIn = asyncHandler(async (req, res, next) => {
	console.log("login runs");
});
