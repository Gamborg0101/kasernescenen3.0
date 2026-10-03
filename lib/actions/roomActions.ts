'use server';
import { Room } from '@/generated/prisma';
import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';
import { DeleteRoomBookings, deleteRoomFromDb, createRoomDB, updateRoom } from '../db/rooms';
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
import * as z from 'zod';

export async function updateRoomAction(roomId: number, data: Omit<Room, 'id'>) {
  const session = await auth();
  if (!session) return sessionError;

  const roomIdSchema = z.object({
    roomId: z.number().min(100).max(299),
  });

  const roomIdValid = roomIdSchema.safeParse(roomId);
  if (!roomIdValid.success) return failedToUpdateRoom;

  const updateRoomSchema = z.object({
    name: z.string().min(5).max(30),
    roomNumber: z.string().min(100).max(299),
    capacity: z.number().min(5).max(200),
    location: z.string().min(5).max(40),
  });

  const rawRoomInfo = {
    name: data.name,
    roomNumber: data.roomNumber,
    capacity: data.capacity,
    location: data.location,
  };

  const updateRoomData = updateRoomSchema.safeParse(rawRoomInfo);

  if (!updateRoomData.success) return failedToUpdateRoom;

  const userId = Number(session.user.id);
  const { success } = await ratelimit.limit(`room:update:${userId}`);

  if (!success) {
    return ratelimitError;
  }

  if (session.user.role !== 'admin') return unauthorizedAccess;
  try {
    await updateRoom(roomIdValid.data.roomId, updateRoomData.data);
    return success;
  } catch (e) {
    console.error(e);
    return failedToUpdateRoom;
  }
}

export async function deleteRoom(roomId: number) {
  const session = await auth();
  if (!session) return sessionError;

  const userId = Number(session.user.id);

  const { success } = await ratelimit.limit(`room:delete:${userId}`);
  if (!success) {
    return ratelimitError;
  }
  if (session.user.role !== 'admin') return unauthorizedAccess;
  try {
    await DeleteRoomBookings(roomId);
    await deleteRoomFromDb(roomId);
    return success;
  } catch (e) {
    console.error(e);
    return failedToDeleteRoom;
  }
}

export async function createRoom(room: Omit<Room, 'id'> | null) {
  const session = await auth();
  if (!session) return sessionError;

  const userId = Number(session.user.id);

  const { success } = await ratelimit.limit(`room:create:${userId}`);

  if (!success) {
    return ratelimitError;
  }

  if (session.user.role !== 'admin') return unauthorizedAccess;
  if (!room) return failedToFindRoom;

  try {
    await createRoomDB(room);
    revalidatePath('/adminpanel/managerooms');
    return success;
  } catch (e) {
    console.error(e);
    return failedToCreateRoom;
  }
}
