import { PrismaClient } from '../generated/prisma';
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
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        googleId: faker.string.uuid(),
        phone: faker.number.int({ min: 100000000, max: 999999999 }),
        studentNumber: faker.number.int({ min: 10000000, max: 99999999 }),
        cardNumber: faker.number.int({ min: 10000000, max: 99999999 }),
        email: faker.internet.email(),
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
        name: faker.airline.recordLocator(),
        capacity: faker.helpers.arrayElement([114, 116, 118, 120]),
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
        startTime: faker.date.between({
          from: new Date(),
          to: faker.date.soon({ days: 1 }),
        }),
        endTime: faker.date.soon({ days: 10, refDate: new Date() }),
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
