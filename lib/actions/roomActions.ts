'use server';
import { Room } from '@/generated/prisma';
import { auth } from '@/auth/authSetup';
import { DeleteRoomBookings, deleteRoomFromDb } from '../db/rooms';
import { updateRoom } from '../db/rooms';

export async function updateRoomAction(roomId: number, data: Omit<Room, 'id'>) {
  const session = await auth();

  if (session?.user.role !== 'admin') return;
  await updateRoom(roomId, data);
}

export async function deleteRoom(roomId: number) {
  const session = await auth();
  if (session?.user.role !== 'admin') return;
  await DeleteRoomBookings(roomId);
  await deleteRoomFromDb(roomId);
}
