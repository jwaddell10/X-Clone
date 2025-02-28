const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");
const { getDefaultImageUrl, getAllImages } = require("../services/cloudinary");

module.exports = {
	findUser: async (username) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					name: username,
				},
			});
			return user;
		} catch (error) {
			return error;
		}
	},
	findAllUsersWithProfilePicture: async () => {
		try {
			const users = await prisma.user.findMany({
				omit: {
					password: true,
				},
				include: {
					Profile: {
						select: {
							profilePicture: true,
							followedBy: true,
						},
					},
				},
			});
			return users;
		} catch (error) {
			return error;
		}
	},
	findUserById: async (id) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: id,
				},
			});
			return user;
		} catch (error) {
			return error;
		}
	},
	createUserWithHashedPassword: async (username, password) => {
		const defaultImageUrl = await getDefaultImageUrl();

		try {
			const salt = bcryptjs.genSaltSync(10);
			const hashedPassword = bcryptjs.hashSync(password, salt); // Use the provided password

			const user = await prisma.user.create({
				data: {
					name: username,
					password: hashedPassword,
					Profile: {
						create: {
							profilePicture: defaultImageUrl,
						},
					},
				},
				include: {
					Profile: true,
				},
			});
			return user;
		} catch (error) {
			return error;
		}
	},
	findProfileByUserId: async (id) => {
		try {
			const profile = await prisma.profile.findUnique({
				where: {
					userId: id,
				},
				include: {
					user: {
						select: {
							name: true,
						},
					},
					followedBy: true,
					following: true,
				},
			});
			return profile;
		} catch (error) {
			return error;
		}
	},
	findProfileByProfileId: async (id) => {
		try {
			const profile = await prisma.profile.findUnique({
				where: {
					id: id,
				},
			});
			return profile;
		} catch (error) {
			return error;
		}
	},
	updateProfile: async (id, profilePicture, name, userId) => {
		try {
			const updatedProfile = await prisma.profile.update({
				where: {
					id: id,
				},
				data: {
					user: {
						update: {
							where: {
								id: userId,
							},
							data: {
								name: name,
							},
						},
					},
					profilePicture: profilePicture,
				},
			});
			return updatedProfile;
		} catch (error) {
			return error;
		}
	},

	findPost: async (postId) => {
		try {
			const post = await prisma.post.findUnique({
				select: {
					id: true,
					text: true,
					createdAt: true,
					author: {
						select: {
							Profile: true,
						},
					},
					likes: true,
					Comment: {
						select: {
							author: {
								select: {
									Profile: true,
									name: true,
									likes: true,
								},
							},
							text: true,
							createdAt: true,
						},
					},
				},
				where: {
					id: postId,
				},
			});
			return post;
		} catch (error) {
			return error;
		}
	},
	findAllPosts: async () => {
		try {
			const posts = await prisma.post.findMany({
				select: {
					id: true,
					createdAt: true,
					text: true,
					likes: true,
					Comment: true,
					author: {
						select: {
							name: true,
							Profile: {
								select: {
									id: true,
									profilePicture: true,
								},
							},
						},
					},
				},
			});
			return posts;
		} catch (error) {
			return error;
		}
	},
	findAllUserPosts: async (id) => {
		try {
			const userPosts = await prisma.post.findMany({
				where: {
					authorId: id,
				},
				include: {
					author: {
						select: {
							id: true,
							name: true,
							Profile: {
								select: {
									profilePicture: true,
								},
							},
						},
					},
					likes: true,
					Comment: true,
				},
			});
			return userPosts;
		} catch (error) {
			return error;
		}
	},
	findComment: async (id) => {
		try {
			const comment = await prisma.comment.findUnique({
				where: {
					id: id,
				},
				include: {
					parent: true,
				},
			});
			return comment;
		} catch (error) {
			return error;
		}
	},
	findCommentAndChildComments: async (commentId) => {
		try {
			//trying to find a comment, and it's children comments
			const commentAndChildComments = await prisma.comment.findUnique({
				where: {
					id: commentId,
				},
				select: {
					id: true,
					author: {
						select: {
							name: true,
							Profile: {
								select: {
									id: true,
									profilePicture: true,
								},
							},
						},
					},
					text: true,
					createdAt: true,
					likes: true,
					children: {
						select: {
							id: true,
							text: true,
							createdAt: true,
							authorId: true,
							postId: true,
							parentId: true,
							likes: true,
							author: {
								select: {
									name: true,
									Profile: {
										select: {
											id: true,
											profilePicture: true,
										},
									},
								},
							},
						},
					},
				},
			});
			return commentAndChildComments;
		} catch (error) {
			console.log(error, "error in find comment and child comments");
			return error;
		}
	},
	findParentCommentsForPost: async (postId) => {
		try {
			const comments = await prisma.comment.findMany({
				where: {
					postId: postId,
					parentId: null,
				},
				select: {
					id: true,
					author: {
						select: {
							name: true,
							Profile: true,
						},
					},
					post: true,
					text: true,
					createdAt: true,
					likes: true,
					parentId: true,
					children: true,
				},
			});
			return comments;
		} catch (error) {
			return error;
		}
	},
	findLike: async (commentId, userId) => {
		try {
			const like = await prisma.likes.findUnique({
				where: {
					commentId: commentId,
					userId: userId,
				},
			});
			return like;
		} catch (error) {
			console.log(error, "error in foundlike");
			return error;
		}
	},
	createPost: async (user, text) => {
		try {
			const post = await prisma.post.create({
				data: {
					author: {
						connect: { id: user.id },
					},
					text: text,
				},
			});
			return post;
		} catch (error) {
			return error;
		}
	},
	createReplyToPost: async (postId, loggedInUserId, text) => {
		try {
			const replyToPost = await prisma.comment.create({
				data: {
					authorId: loggedInUserId,
					text: text,
					postId: postId,
				},
			});
			return replyToPost;
		} catch (error) {
			console.log(error, "error");
			return error;
		}
	},
	createReplyToComment: async (postId, commentId, loggedInUserId, text) => {
		try {
			const replyToComment = await prisma.comment.create({
				data: {
					author: {
						connect: {
							id: loggedInUserId,
						},
					},
					text: text,
					parent: {
						connect: {
							id: commentId,
						},
					},
				},
			});
			return replyToComment;
		} catch (error) {
			console.log(error, "error in create reploy comment");
			return error;
		}
	},
	createPostLike: async (postId, userId) => {
		try {
			const like = await prisma.likes.create({
				data: {
					postId: postId,
					userId: userId,
				},
			});
			return like;
		} catch (error) {
			console.log(error, "post like error");
			return error;
		}
	},
	createCommentLike: async (commentId, userId) => {
		try {
			const like = await prisma.likes.create({
				data: {
					comment: {
						connect: {
							id: commentId,
						},
					},
					user: {
						connect: { id: userId },
					},
				},
			});
			return like;
		} catch (error) {
			return error;
		}
	},
	createFollowProfile: async (userId, userToFollowId) => {
		try {
			const follow = await prisma.follows.create({
				data: {
					followedById: userToFollowId,
					followingId: userId,
				},
			});
			return follow;
		} catch (error) {
			return error;
		}
	},
	deleteLike: async (likeId) => {
		try {
			const deletedLike = await prisma.likes.delete({
				where: {
					id: likeId,
				},
			});
			return deletedLike;
		} catch (error) {
			console.log(error, "error");
			return error;
		}
	},
	deleteFollowProfile: async (userId, userToFollowId) => {
		try {
			const deletedFollow = await prisma.follows.delete({
				where: {
					followingId_followedById: {
						followedById: userToFollowId,
						followingId: userId,
					},
				},
			});
			return deletedFollow;
		} catch (error) {
			return error;
		}
	},
};
