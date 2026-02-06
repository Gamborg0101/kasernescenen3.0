import { PrismaClient } from '../app/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        note: faker.lorem.sentence(),
        category: faker.helpers.arrayElement([
          'dramaturgi',
          'musikvidenskab',
          'æstetik og kultur',
          'retorik',
        ]),
      },
    });
    const room = await prisma.room.create({
      data: {
        name: faker.helpers.arrayElement([
          '114',
          '115',
          '116',
          '117',
          '119',
          '122',
          '211',
          '212',
          '213',
          '214',
          '215',
          '216',
        ]),
        capacity: faker.helpers.arrayElement([10, 20, 30, 40, 50]),
        location: faker.helpers.arrayElement([
          '1. Etage',
          '2. Etage',
          '3. Etage',
        ]),
      },
    });
    await prisma.booking.create({
      data: {
        bookingId: faker.string.uuid(),
        userId: faker.helpers.arrayElement([user.id]),
        roomId: faker.helpers.arrayElement([room.id]),
        startTime: faker.date.soon(),
        endTime: faker.date.soon({ days: 1 }),
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
