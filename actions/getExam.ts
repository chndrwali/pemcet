import { prisma } from '@/lib/db';

export const getExam = async () => {
  try {
    const exam = await prisma.exam.findMany({
      include: {
        questions: true,
      },
    });

    return exam;
  } catch (error) {
    console.error('err', error);
    throw new Error('Failed to fetch test reading');
  }
};
