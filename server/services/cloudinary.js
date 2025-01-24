const cloudinary = require("cloudinary");
require("dotenv").config();

const imagesUrl = {
	smileyFace: "smileyface_fbzuor",
	skullPandemicGuy: "skullpandemicguy_ques1h",
	panda: "panda_kgtgid",
	monkey: "monkey_lgwgco",
	animeCatGirl: "animecatgirl_dvtmoe",
	football: "football_i1dceq",
	dog: "dog_zxtzih",
	emoHatBoy: "emohatboy_euczqj",
};

const urls = []
const url = Object.keys(imagesUrl).forEach((index) => {
	urls.push(imagesUrl[index])
});


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const getDefaultImageUrl = async () => cloudinary.url("smileyface_fbzuor");

module.exports = { getDefaultImageUrl, urls };
