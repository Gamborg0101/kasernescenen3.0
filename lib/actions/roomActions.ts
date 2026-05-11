'use server';
import { Room } from '@/generated/prisma';
import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';

import { DeleteRoomBookings, deleteRoomFromDb, createRoomDB } from '../db/rooms';
import { updateRoom } from '../db/rooms';
import { ratelimit } from '../ratelimiter';

export async function updateRoomAction(roomId: number, data: Omit<Room, 'id'>) {
  const session = await auth();

  if (!session) throw new Error('Du er ikke logget ind');

  if (session?.user.role !== 'admin') return;
  await updateRoom(roomId, data);
}

export async function deleteRoom(roomId: number) {
  const session = await auth();
  if (session?.user.role !== 'admin') return;
  await DeleteRoomBookings(roomId);
  return deleteRoomFromDb(roomId);
}

export async function createRoom(room: Omit<Room, 'id'> | null) {
  const session = await auth();

  if (session?.user.role !== 'admin') return;

  const userId = Number(session?.user.id);

  const { success } = await ratelimit.limit(`room:create:${userId}`);

  if (!success) {
    return {
      success: false,
      error: 'Ratelimit reached',
    };
  }

  if (!room) return null;
  await createRoomDB(room);
  revalidatePath('/adminpanel/managerooms');
}
