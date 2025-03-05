const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const getItemsInAscendingOrderAndClosestToNowFirst = require("../helpers/getItemsInAscendingOrderAndClosestToNowFirst");

exports.getComment = asyncHandler(async (req, res, next) => {
	const comment = await db.findCommentAndChildComments(
		parseInt(req.params.commentId)
	);

	if (comment === null) {
		res.json({ errorMessage: "No comments" });
	}

	if (comment) {
		res.json({ comment });
	}
});
