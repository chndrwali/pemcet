import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { examSchema } from '@/schemas';
import { LevelReading } from '@prisma/client';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== 'ADMIN') {
    return NextResponse.error();
  }

  const body = await request.json();
  const parsedBody = examSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsedBody.error.flatten() }, { status: 400 });
  }

  const { level, questions } = parsedBody.data;

  try {
    const exam = await prisma.$transaction(async (prisma) => {
      const createdExam = await prisma.exam.create({
        data: {
          level,
        },
      });

      if (questions && questions.length > 0) {
        await prisma.question.createMany({
          data: questions.map((q) => ({
            questionText: q.questionText,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            correctAnswer: q.correctAnswer,
            examId: createdExam.level as LevelReading,
          })),
        });
      } else {
        console.log('Error: Properti tidak dipilih');
        return NextResponse.json({ error: 'Properti harus dipilih' }, { status: 400 });
      }

      return createdExam;
    });

    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    console.error('Error creating exam or styles:', error);
    return NextResponse.json(
      {
        error: 'Gagal menambahkan exam',
        details: error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga',
      },
      { status: 500 }
    );
  }
}
