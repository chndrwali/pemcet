'use server';

import { prisma } from '@/lib/db';
import { quizSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const postQuiz = async (data: z.infer<typeof quizSchema>) => {
  try {
    // Validate the data
    const validatedData = quizSchema.parse(data);

    // Save to database
    const result = await prisma.quizResult.create({
      data: {
        name: validatedData.name,
        class: validatedData.class,
        count: validatedData.count,
        quiz: validatedData.quiz,
        type: 'Test Membaca',
      },
    });

    // Revalidate the path to update any cached data
    revalidatePath('/');

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to save quiz result:', error);
    return { success: false, error: 'Failed to save quiz result' };
  }
};

export const postQuizOne = async (data: z.infer<typeof quizSchema>) => {
  try {
    // Validate the data
    const validatedData = quizSchema.parse(data);

    // Save to database
    const result = await prisma.quizResult.create({
      data: {
        name: validatedData.name,
        class: validatedData.class,
        count: validatedData.count,
        quiz: validatedData.quiz,
        type: 'Meningkatkan Membaca 1',
      },
    });

    // Revalidate the path to update any cached data
    revalidatePath('/');

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to save quiz result:', error);
    return { success: false, error: 'Failed to save quiz result' };
  }
};

export const postQuizTwo = async (data: z.infer<typeof quizSchema>) => {
  try {
    // Validate the data
    const validatedData = quizSchema.parse(data);

    // Save to database
    const result = await prisma.quizResult.create({
      data: {
        name: validatedData.name,
        class: validatedData.class,
        count: validatedData.count,
        quiz: validatedData.quiz,
        type: 'Meningkatkan Membaca 2',
      },
    });

    // Revalidate the path to update any cached data
    revalidatePath('/');

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to save quiz result:', error);
    return { success: false, error: 'Failed to save quiz result' };
  }
};

export const postQuizThree = async (data: z.infer<typeof quizSchema>) => {
  try {
    // Validate the data
    const validatedData = quizSchema.parse(data);

    // Save to database
    const result = await prisma.quizResult.create({
      data: {
        name: validatedData.name,
        class: validatedData.class,
        count: validatedData.count,
        quiz: validatedData.quiz,
        type: 'Meningkatkan Membaca 3',
      },
    });

    // Revalidate the path to update any cached data
    revalidatePath('/');

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to save quiz result:', error);
    return { success: false, error: 'Failed to save quiz result' };
  }
};

export const postQuizFour = async (data: z.infer<typeof quizSchema>) => {
  try {
    // Validate the data
    const validatedData = quizSchema.parse(data);

    // Save to database
    const result = await prisma.quizResult.create({
      data: {
        name: validatedData.name,
        class: validatedData.class,
        count: validatedData.count,
        quiz: validatedData.quiz,
        type: 'Meningkatkan Membaca 4',
      },
    });

    // Revalidate the path to update any cached data
    revalidatePath('/');

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to save quiz result:', error);
    return { success: false, error: 'Failed to save quiz result' };
  }
};
