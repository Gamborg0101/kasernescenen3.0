import { PrismaClient } from '../app/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const casper = await prisma.user.upsert({
    where: { email: 'casper@example.com' },
    update: {},
    create: {
      name: 'Casper',
      email: 'casper@example.com',
      password: 'securedpassword',
      note: 'Admin',
      category: 'Admin',
    },
  });
  const room = await prisma.room.upsert({
    where: { name: '114' },
    update: {},
    create: {
      name: '114',
      capacity: 20,
      location: '1584-114',
    },
  });
  const booking = await prisma.booking.upsert({
    where: { id: 1 },
    update: {},
    create: {
      bookingId: '1',
      userId: casper.id,
      roomId: room.id,
      startTime: new Date(),
      endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
  });
  console.log({ casper, room, booking });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
