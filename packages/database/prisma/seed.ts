import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // @faker-js/faker v10 is ESM-only; dynamic import keeps this file compatible
  // with the package's CommonJS module setting under NodeNext.
  const { faker } = await import("@faker-js/faker");

  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);

  console.time("🧹 Cleaned up the database...");
  await prisma.user.deleteMany();
  console.timeEnd("🧹 Cleaned up the database...");

  console.time("🌱 Seeded users...");
  await prisma.user.createMany({
    data: [
      {
        email: "john",
        name: "John Doe",
      },
      {
        email: faker.internet.email(),
        name: faker.person.firstName(),
      },
    ],
  });
  console.timeEnd("🌱 Seeded users...");

  console.timeEnd(`🌱 Database has been seeded`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
