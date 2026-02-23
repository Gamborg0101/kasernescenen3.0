import { prisma } from '@/db';

export async function createUser(data: {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  studentNumber: number;
  cardNumber: number;
  category: string;
}) {
  return prisma.user.create({
    data,
  });
}
