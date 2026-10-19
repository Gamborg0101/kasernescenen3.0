import { expect, test, afterEach } from 'bun:test';
import { prisma } from '@/db';
import { createRoomDB, updateRoom } from './rooms';

afterEach(async () => {
  await prisma.room.deleteMany({
    where: {
      roomNumber: '328',
    },
  });
});

test('A room can be created and updated', async () => {
  const roomToBeCreated = {
    name: 'dummyRoom',
    roomNumber: '328',
    capacity: 45,
    location: '1586',
  };
  const createdRoom = await createRoomDB(roomToBeCreated);

  expect(createdRoom.name).toBe(roomToBeCreated.name);

  const roomUpdate = {
    name: 'dummyRoomUpdated',
    roomNumber: '328',
    capacity: 50,
    location: '1586-updated',
  };

  const updatedRoom = await updateRoom(createdRoom.id, roomUpdate);

  expect(updatedRoom.name).toBe('dummyRoomUpdated');
  expect(updatedRoom.roomNumber).toBe('328');
  expect(updatedRoom.capacity).toBe(50);
  expect(updatedRoom.location).toBe('1586-updated');
});
