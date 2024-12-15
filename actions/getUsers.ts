'use server';

import { prisma } from '@/lib/db';

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        ExamResult: true,
      },
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};
