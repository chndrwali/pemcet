import { prisma } from '@/lib/db';

export const getTestReading = async () => {
  try {
    const testReading = await prisma.testReading.findMany();

    return testReading;
  } catch (error) {
    console.error('err', error);
    throw new Error('Failed to fetch test reading');
  }
};
