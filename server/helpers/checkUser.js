const db = require("../db/queries.js");

async function checkUser(username) {
	const user = await db.findUser(username);
	if (user === undefined) {
		return undefined;
	} else return user;
}

module.exports = checkUser;
