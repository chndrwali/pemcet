import { prisma } from '@/lib/db';
import { LevelReading } from '@prisma/client';

export const getTestReadingById = async (levelId: string) => {
  try {
    const level = levelId as LevelReading;
    const testReading = await prisma.testReading.findUnique({
      where: {
        level,
      },
    });

    return testReading;
  } catch (error) {
    console.error('err', error);
    throw new Error('Failed to fetch test reading');
  }
};
