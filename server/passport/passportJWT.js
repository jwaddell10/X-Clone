const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createJWT = (user) => {
	return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.verifyToken = (req, res, next) => {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];

		req.token = bearerToken;
		const verifiedUser = jwt.verify(req.token, process.env.JWT_SECRET);

		if (!verifiedUser) {
			return res.json({ message: "Unable to access" });
		}
		if (verifiedUser) {
			next();
		}
	} else {
		res.sendStatus(403);
	}
};
