import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const rooms = [
  {
    roomNum: 126,
    name: 'Auditorium A',
    capacity: 50,
    location: 'Bygning 1584',
  },
  {
    roomNum: 134,
    name: 'Musikrum (audiolab)',
    capacity: 20,
    location: 'Bygning 1584',
  },
  { roomNum: 140, name: 'Musikrum', capacity: 20, location: 'Bygning 1584' },
  { roomNum: 145, name: 'Musikrum', capacity: 20, location: 'Bygning 1584' },
  {
    roomNum: 212,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNum: 226,
    name: 'Auditorium B',
    capacity: 50,
    location: 'Bygning 1584',
  },
  {
    roomNum: 231,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNum: 233,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNum: 234,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNum: 236,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNum: 237,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNum: 238,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNum: 239,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNum: 246,
    name: 'Undervisning MUSIKLOKALE',
    capacity: 25,
    location: 'Bygning 1584',
  },
  {
    roomNum: 111,
    name: 'Teaterfoyer (studieområde)',
    capacity: 40,
    location: 'Bygning 1585',
  },
  {
    roomNum: 115,
    name: 'Teatersal (Store Sal)',
    capacity: 100,
    location: 'Bygning 1585',
  },
  {
    roomNum: 119,
    name: 'Teatersal (Lille Sal)',
    capacity: 50,
    location: 'Bygning 1585',
  },
];

async function main() {
  await prisma.user.upsert({
    where: {
      phone: 12345678,
    },
    update: {},
    create: {
      firstName: 'Casper',
      lastName: 'G',
      googleId: faker.string.uuid(),
      phone: 12345678,
      role: 'admin',
      studentNumber: 20160012,
      cardNumber: 123456,
      email: 'casperGamborg@hotmail.com',
      note: faker.lorem.sentence(),
      category: 'musikvidenskab',
    },
  });
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: 'student',
        googleId: faker.string.uuid(),
        phone: faker.number.int({ min: 10000000, max: 99999999 }),
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

    const createdRooms = [];
    for (const room of rooms) {
      const createdRoom = await prisma.room.upsert({
        where: { roomNum: room.roomNum }, // brug roomNum som unikt felt
        update: {},
        create: {
          roomNum: room.roomNum,
          name: room.name,
          capacity: room.capacity,
          location: room.location,
        },
      });
      createdRooms.push(createdRoom);
    }

    const roomForBooking = faker.helpers.arrayElement(createdRooms);
    await prisma.booking.create({
      data: {
        bookingId: faker.string.uuid(),
        userId: user.id,
        roomId: roomForBooking.id,
        startTime: faker.date.between({
          from: new Date(),
          to: faker.date.soon({ days: 1 }),
        }),
        endTime: faker.date.soon({ days: 10 }),
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
