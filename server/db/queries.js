const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");

module.exports = {
	findUser: async (username) => {
		console.log(username, "username in find");
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
	findUserById: async (id) => {
		console.log(id, "id in find");
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
				},
			});
			return user;
		} catch (error) {
			return error;
		}
	},
	findProfile: async (id) => {
		try {
			const profile = await prisma.profile.findUnique({
				where: {
					id: id,
				},
			});
			console.log(profile, "profile in findprofile");
			return profile;
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
