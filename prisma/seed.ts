import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';
import { AllClassroomsList } from './roomlist';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

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
  for (const room of AllClassroomsList) {
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
