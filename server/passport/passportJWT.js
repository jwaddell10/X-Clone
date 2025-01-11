const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretKey: process.env.JWT_SECRET,
};

exports.createJWT = (user) => {
	console.log(user, "user in createJWT");
	return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.passportJWTStrategy = () => {
	passport.use(
		new Strategy(options, (payload, done) => {
			try {
				console.log(payload, "this is payload");
			} catch (error) {
				console.log(error, "error in passport");
			}
		})
	);
};
