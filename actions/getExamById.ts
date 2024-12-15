import { prisma } from '@/lib/db';
import { LevelReading } from '@prisma/client';

export const getExamById = async (levelId: string) => {
  try {
    const level = levelId as LevelReading;
    const question = await prisma.exam.findUnique({
      where: {
        level,
      },
      include: {
        questions: true,
      },
    });

    return question;
  } catch (error) {
    console.error('err', error);
    throw new Error('Failed to fetch test reading');
  }
};
