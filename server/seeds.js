const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const urls = require("./services/cloudinary.js");
const prisma = new PrismaClient();

const imageUrls = urls.urls.map(
	(url) => "https://res.cloudinary.com/dak6py2ng/image/upload/" + url
);

for (let i = 0; i < 10; i++) {
	console.log(
		urls.urls[Math.floor(Math.random() * urls.urls.length)],
		"random url?"
	);
}

async function generateUsers() {
	const amountOfUsers = 50;

	for (let i = 0; i < amountOfUsers; i++) {
		const fakeUsers = await prisma.user.create({
			data: {
				name: faker.internet.username(),
				password: faker.string.uuid(),
				Profile: {
					create: {
						profilePicture:
							imageUrls[
								Math.floor(
									Math.random() * (urls.urls.length - 1)
								)
							],
					},
				},
			},
		});
	}
}

async function generatePostsAndComments() {
	const amountOfPosts = 50;
	const amountOfCommentsPerPost = 5;

	const users = await prisma.user.findMany({ select: { id: true } });

	if (users.length === 0) {
		console.error("❌ No users found! Create users first.");
		return;
	}

	for (let i = 0; i < amountOfPosts; i++) {
		const randomUser = users[Math.floor(Math.random() * users.length)];

		const post = await prisma.post.create({
			data: {
				text: faker.lorem.paragraph().slice(0, 280),
				authorId: randomUser.id,
			},
		});

		for (let j = 0; j < amountOfCommentsPerPost; j++) {
			const randomCommenter =
				users[Math.floor(Math.random() * users.length)];

			await prisma.comment.create({
				data: {
					text: faker.lorem.sentence().slice(0, 280),
					authorId: randomCommenter.id,
					postId: post.id,
				},
			});
		}
	}

	console.log(
		`✅ Created ${amountOfPosts} posts and ${
			amountOfPosts * amountOfCommentsPerPost
		} comments.`
	);
}

generateUsers();
generatePostsAndComments();
