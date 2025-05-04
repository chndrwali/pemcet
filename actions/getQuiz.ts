import { prisma } from '@/lib/db';

export const getQuiz = async () => {
  try {
    const quiz = await prisma.quizResult.findMany();

    return quiz;
  } catch (error) {
    console.error('err', error);
    throw new Error('Failed to fetch test reading');
  }
};

export const deleteQuiz = async (id: string) => {
  try {
    const deletedQuiz = await prisma.quizResult.delete({
      where: { id },
    });

    return deletedQuiz;
  } catch (error) {
    console.error('Failed to delete quiz result:', error);
    throw new Error('Failed to delete quiz result');
  }
};
