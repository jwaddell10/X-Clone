const {PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")

const prisma = new PrismaClient();

async function generateUsers() {
	const amountOfUsers = 50;

	for (let i = 0; i < amountOfUsers; i++) {
		const fakeUsers = await prisma.user.create({
			data: {
				id: faker.number.int(),
				name: faker.internet.username(),
				password: faker.string.uuid(),
				profile: {
					create: [
						{
							id: faker.number.int(),
							profilePicture: faker.image.avatar(),
						}
					]
				},
			}
		})
		return fakeUsers;
	}
}

generateUsers();