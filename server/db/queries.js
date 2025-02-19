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
									Profile: {
										select: {
											profilePicture: true,
										},
									},
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
	findComment: async (id) => {
		try {
			const comment = await prisma.comment.findUnique({
				where: {
					id: id,
				},
			});
			return comment;
		} catch (error) {
			return error;
		}
	},
	findComments: async (postId) => {
		try {
			const comments = await prisma.comment.findMany({
				where: {
					postId: postId,
				},
				select: {
					id: true,
					author: {
						select: {
							name: true,
							Profile: {
								select: {
									profilePicture: true,
								},
							},
						},
					},
					post: true,
					text: true,
					createdAt: true,
					likes: true,
				},
			});
			return comments;
		} catch (error) {
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
			return error;
		}
	},
	createCommentLike: async (commentId, userId, postId) => {
		try {
			const like = await prisma.likes.create({
				data: {
					id: commentId,
					user: {
						connect: { id: userId },
					},
					post: {
						connect: { id: postId },
					},
					comment: {
						connect: { id: commentId },
					},
				},
			});
			return like;
		} catch (error) {
			return error;
		}
	},
	deletePostLike: async (postId, loggedInUserId) => {
		try {
			console.log(postId, loggedInUserId, 'ids')
			const deletedLike = await prisma.likes.delete({
				where: {
					postId_userId: {
						postId: postId,
						userId: loggedInUserId,
					},
				},
			});
			console.log(deletedLike, 'deleted like')
			return deletedLike;
		} catch (error) {
			return error;
		}
	},
	deleteCommentLike: async(commentId, postId, loggedInUserId) => {
		try {
			const deletedLike = await prisma.likes.delete({
				where: {
					postId_userId: {
						postId: postId,
						userId: loggedInUserId
					},
					commentId: commentId
				}
			})
			return deletedLike;
		} catch (error) {
			return error;
		}
	}
};
