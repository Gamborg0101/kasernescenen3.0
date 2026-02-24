import { prisma } from '@/db';

export async function createUser(data: {
  googleId: string;

  firstName: string;
  lastName: string;
  role: string;
  phone: number;
  email: string;
  studentNumber: number;
  cardNumber: number;
  category: string;
}) {
  await prisma.user.create({
    data,
  });
}
