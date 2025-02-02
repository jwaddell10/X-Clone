const {PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")

const prisma = new PrismaClient();

async function generateUsers() {
	const amountOfUsers = 50;

	for (let i = 0; i < amountOfUsers; i++) {
		//create users, randomly generate each thing

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
							// followedBy: 
							// bio: faker.person.bio(),
						}
					]
				},
			}
		})
		
		return fakeUsers;
	}
}

// function createPosts() {

// }

generateUsers();

/* model Post {
  id        Int       @unique @default(autoincrement())
  text      String
  createdAt DateTime  @default(now())
  author    User      @relation(fields: [authorId], references: [id])
  authorId  Int
  likes     Likes[]
  Comment   Comment[]
}*/