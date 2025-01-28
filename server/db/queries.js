const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");
const { getDefaultImageUrl, getAllImages } = require("../services/cloudinary");
const defaultImageUrl = getDefaultImageUrl();

module.exports = {
	findUser: async (username) => {
		console.log(username, "username in findbyusername");
		try {
			const user = await prisma.user.findUnique({
				where: {
					name: username,
				},
			});
			console.log(user, "user found in finduser");
			return user;
		} catch (error) {
			return error;
		}
	},
	findUserById: async (id) => {
		console.log(id, "id in finduserbyid");
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
			console.log(profile, "profile in findprofile");
			return profile;
		} catch (error) {
			return error;
		}
	},
	findProfileByProfileId: async (id) => {
		try {
			const profile = await prisma.profile.findUnique({
				where: {
					id: id
				}
			})
			return profile
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
								id: userId
							},
							data: {
								name: name
							}
						}
					},
					profilePicture: profilePicture
				}
			})
			return updatedProfile
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
					author: {
						omit: {
							password: true,
						},
					},
					text: true,
				},
			});
			console.log(posts, "posts in findall");
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
};
