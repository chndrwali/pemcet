import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const { examId, answers } = body;

  try {
    const questions = await prisma.question.findMany({
      where: { examId },
      select: { id: true, correctAnswer: true },
    });

    // Hitung nilai berdasarkan jawaban
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] && answers[q.id] === q.correctAnswer) {
        score += 20;
      }
    });

    // Simpan jawaban dan nilai ke database
    const result = await prisma.examResult.create({
      data: {
        userId: currentUser.id,
        examId,
        answers,
        score,
      },
    });

    return NextResponse.json(result, { status: 201 });
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
