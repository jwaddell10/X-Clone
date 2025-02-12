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
			const hashedPassword = bcryptjs.hashSync("B4c0//", salt);
			const user = await prisma.user.create({
				data: {
					name: username,
					password: hashedPassword,
					Profile: {
						create: {
							bio: "",
							profilePicture: defaultImageUrl,
						},
					},
					// include: {
					// 	followedBy: true,
					// 	following: true,
					// }
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
					authorId: true,
					likes: true,
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
	addPostLike: async (postId, userId) => {
		console.log(postId, userId, 'postid userid')
		try {
			const addLike = await prisma.post.update({
				where: {
					id: postId,
				},
				data: {
					likes: {
						increment: 1,
					},
				},
			});
			console.log(addLike, "like");
		} catch (error) {
			return error;
		}
	},
	createLike: async (postId, userId) => {
		try {
			const like = await prisma.likes.create({
				data: {
					post: {
						connect: {
							id: postId,
						},
					},
					author: {
						connect: {
							id: userId,
						},
					},
				},
			});
			console.log(like, "like");
		} catch (error) {
			return error;
		}
	},
};
