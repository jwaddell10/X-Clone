import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
require("dotenv").config();

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretKey: process.env.JWT_SECRET,
};

export function passportJWTStrategy() {
	passport.use(
		new Strategy(options, (payload, done) => {
			try {
				console.log(payload, "this is payload");
			} catch (error) {
				console.log(error, "error in passport");
			}
		})
	);
}
