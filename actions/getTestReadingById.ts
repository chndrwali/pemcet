import { prisma } from '@/lib/db';
import { LevelReading } from '@prisma/client';

export const getTestReadingById = async (levelId: LevelReading) => {
  try {
    const testReading = await prisma.testReading.findUnique({
      where: {
        level: levelId,
      },
    });

    return testReading;
  } catch (error) {
    console.error('err', error);
    throw new Error('Failed to fetch test reading');
  }
};
