const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController.js");


router.get("/image", profileController.getAllImageUrls);

router.post("/edit/:id", profileController.editProfile);

module.exports = router;
