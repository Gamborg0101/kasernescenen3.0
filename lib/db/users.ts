import { prisma } from '@/db';
import { User } from '@/generated/prisma';
import { auth } from '@/auth/authSetup';

export async function getUser(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function createUser(data: {
  googleId: string;

  firstName: string;
  lastName: string;
  role: string;
  phone: number;
  email: string;
  studentNumber: number;
  cardNumber: number;
  study: string;
}) {
  return await prisma.user.create({ data });
}

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function DeleteUserBookings(userId: number) {
  return await prisma.booking.deleteMany({
    where: {
      userId: userId,
    },
  });
}

export async function DeleteUser(userId: number) {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function updateUser(userId: number, data: Partial<User>) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
}

export async function getUserFromDb() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Brugeren mangler id');
  }

  const user = await getUser(Number(session.user.id));

  if (!user) {
    throw new Error('Bruger ikke fundet');
  }
  return user;
}

export async function getUserInfoFromSession() {
  const session = await auth();

  if (!session) return { name: '', email: '' };

  return {
    name: session.user?.name || '',
    email: session.user?.email || '',
    image: session.user?.image || '',
    id: session.user.id,
  };
}
