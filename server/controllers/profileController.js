const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { urls } = require("../services/cloudinary");

exports.getAllImageUrls = asyncHandler(async (req, res, next) => {
    const imageUrls = urls.map((url) => 'https://res.cloudinary.com/dak6py2ng/image/upload/' + url)

    if (imageUrls !== null) {
		res.json(imageUrls);
	} else res.json({ errorMessage: "Error fetching profile images" });
});
