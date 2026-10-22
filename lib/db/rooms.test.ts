import { expect, test, afterEach } from 'bun:test';
import { prisma } from '@/db';
import { createRoomDB, updateRoom, getRoomByNum } from './rooms';
import { failedToFindRoom } from '../errorMessages';

afterEach(async () => {
  await prisma.room.deleteMany({
    where: {
      roomNumber: { in: ['328', '329'] },
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

test('A room can not be updated, if it does not exist', async () => {
  const roomTryingToUpdate = {
    name: 'dummyRoomUpdated',
    roomNumber: '999',
    capacity: 50,
    location: '999-updated',
  };

  expect(updateRoom(9999, roomTryingToUpdate)).rejects.toThrow();
});

test('You can not update to have duplicate room numbers', async () => {
  const roomToBeCreated1 = {
    name: 'dummyRoom1',
    roomNumber: '328',
    capacity: 45,
    location: '1586',
  };

  const roomToBeCreated2 = {
    name: 'dummyRoom2',
    roomNumber: '329',
    capacity: 50,
    location: '1586',
  };

  const createdRoom1 = await createRoomDB(roomToBeCreated1);
  await createRoomDB(roomToBeCreated2);

  /*Trying to update roomnumber 329 with 328 id */
  const roomUpdate = {
    name: 'dummyRoom1',
    roomNumber: '329', //only updated value
    capacity: 45,
    location: '1586',
  };

  expect(updateRoom(createdRoom1.id, roomUpdate)).rejects.toThrow();
  const findRoom = await getRoomByNum(createdRoom1.roomNumber);
  expect(findRoom).not.toBeNull();

  if (!findRoom) return failedToFindRoom;

  expect(roomToBeCreated1.roomNumber).toBe(findRoom.roomNumber);
});
