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
    roomNumber: 126,
    name: 'Auditorium A',
    capacity: 50,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 134,
    name: 'Musikrum (audiolab)',
    capacity: 20,
    location: 'Bygning 1584',
  },
  { roomNumber: 140, name: 'Musikrum', capacity: 20, location: 'Bygning 1584' },
  { roomNumber: 145, name: 'Musikrum', capacity: 20, location: 'Bygning 1584' },
  {
    roomNumber: 212,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 226,
    name: 'Auditorium B',
    capacity: 50,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 231,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 233,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 234,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 236,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 237,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 238,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 239,
    name: 'Undervisning',
    capacity: 30,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 246,
    name: 'Undervisning MUSIKLOKALE',
    capacity: 25,
    location: 'Bygning 1584',
  },
  {
    roomNumber: 111,
    name: 'Teaterfoyer (studieområde)',
    capacity: 40,
    location: 'Bygning 1585',
  },
  {
    roomNumber: 115,
    name: 'Teatersal (Store Sal)',
    capacity: 100,
    location: 'Bygning 1585',
  },
  {
    roomNumber: 119,
    name: 'Teatersal (Lille Sal)',
    capacity: 50,
    location: 'Bygning 1585',
  },
];

function bookingData() {
  const now = new Date();
  const days = faker.number.int({ min: 0, max: 30 });
  const startHour = faker.number.int({ min: 8, max: 18 });
  const duration = faker.number.int({ min: 1, max: 3 });

  const startTime = new Date(now);
  startTime.setDate(startTime.getDate() + days);
  startTime.setHours(startHour, 0, 0, 0);

  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + duration);

  return { startTime, endTime };
}

async function main() {
  //Delete all existing bookings, users and rooms.
  await prisma.booking.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.room.deleteMany({});

  const createdRooms = [];
  for (const room of rooms) {
    const createdRoom = await prisma.room.upsert({
      where: { roomNumber: room.roomNumber.toString() },
      update: {},
      create: {
        roomNumber: room.roomNumber.toString(),
        name: room.name,
        capacity: room.capacity,
        location: room.location,
      },
    });
    createdRooms.push(createdRoom);
  }
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
        study: faker.helpers.arrayElement(['dramaturgi', 'musikvidenskab', 'æstetik og kultur', 'retorik']),
      },
    });
    for (let n = 0; n < 100; n++) {
      const roomForBooking = faker.helpers.arrayElement(createdRooms);
      const { startTime, endTime } = bookingData();
      await prisma.booking.create({
        data: {
          userId: user.id,
          roomId: roomForBooking.id,
          startTime: startTime,
          endTime: endTime,
          reason: faker.lorem.lines(1),
        },
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
