'use server';
import { Room } from '@/generated/prisma';
import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';
import { deleteRoomBookings, deleteRoomFromDb, createRoomDB, updateRoom } from '../db/rooms';
import { ratelimit } from '../ratelimiter';
import {
  failedToCreateRoom,
  failedToDeleteRoom,
  failedToFindRoom,
  failedToUpdateRoom,
  ratelimitError,
  sessionError,
  unauthorizedAccess,
} from '../errorMessages';
import { successUpdateRoom, successDeleteRoom, successCreateRoom } from '../successMessages';
import * as z from 'zod';

const roomSchema = z.object({
  name: z.string().min(5).max(30),
  roomNumber: z.string().regex(/^\d{4}-\d{3}[A-Z]?$/),
  capacity: z.number().int().min(5).max(200),
  location: z.string().min(5).max(40),
});

const roomIdSchema = z.number().int().positive();

export async function updateRoomAction(roomId: number, data: Omit<Room, 'id'>) {
  const session = await auth();
  if (!session) return sessionError;

  const roomIdValid = roomIdSchema.safeParse(roomId);
  if (!roomIdValid.success) return failedToUpdateRoom;

  const rawRoomInfo = {
    name: data.name,
    roomNumber: data.roomNumber,
    capacity: data.capacity,
    location: data.location,
  };

  const updateRoomData = roomSchema.safeParse(rawRoomInfo);

  if (!updateRoomData.success) return failedToUpdateRoom;

  const userId = Number(session.user.id);
  const rateLimited = await ratelimit.limit(`room:update:${userId}`);

  if (!rateLimited.success) {
    return ratelimitError;
  }

  if (session.user.role !== 'admin') return unauthorizedAccess;
  try {
    await updateRoom(roomIdValid.data, updateRoomData.data);
    return successUpdateRoom;
  } catch (e) {
    console.error(e);
    return failedToUpdateRoom;
  }
}

export async function deleteRoom(roomId: number) {
  const session = await auth();
  if (!session) return sessionError;

  const userId = Number(session.user.id);

  const validRoomId = roomIdSchema.safeParse(roomId);
  if (!validRoomId.success) {
    return failedToDeleteRoom;
  }

  const rateLimited = await ratelimit.limit(`room:delete:${userId}`);
  if (!rateLimited.success) {
    return ratelimitError;
  }

  if (session.user.role !== 'admin') return unauthorizedAccess;
  try {
    await deleteRoomBookings(validRoomId.data);
    await deleteRoomFromDb(validRoomId.data);
    return successDeleteRoom;
  } catch (e) {
    console.error(e);
    return failedToDeleteRoom;
  }
}

export async function createRoom(room: Omit<Room, 'id'> | null) {
  const session = await auth();
  if (!session) return sessionError;

  if (session.user.role !== 'admin') return unauthorizedAccess;
  if (!room) return failedToFindRoom;

  const userId = Number(session.user.id);

  const createRoomData = roomSchema.safeParse(room);

  const rateLimited = await ratelimit.limit(`room:create:${userId}`);
  if (!rateLimited.success) {
    return ratelimitError;
  }

  if (!createRoomData.success) {
    return failedToCreateRoom;
  }

  try {
    await createRoomDB(createRoomData.data);
    revalidatePath('/adminpanel/managerooms');
    return successCreateRoom;
  } catch (e) {
    console.error(e);
    return failedToCreateRoom;
  }
}
