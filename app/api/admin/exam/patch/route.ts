'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { examSchema } from '@/schemas';
import { LevelReading } from '@prisma/client';

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (currentUser.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Akses ditolak. Hanya admin yang bisa melakukan tindakan ini.' }, { status: 403 });
  }

  // Parse dan validasi input
  const body = await request.json();
  const parsedBody = examSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsedBody.error.flatten() }, { status: 400 });
  }

  const { level, questions } = parsedBody.data;

  if (!questions || questions.length === 0) {
    return NextResponse.json({ error: 'Properti questions harus diisi' }, { status: 400 });
  }

  try {
    // Hapus pertanyaan yang sudah ada untuk exam tertentu
    await prisma.question.deleteMany({
      where: { examId: level as LevelReading },
    });

    // Tambahkan pertanyaan baru
    const createdQuestions = await prisma.question.createMany({
      data: questions.map((q) => ({
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctAnswer: q.correctAnswer,
        examId: level as LevelReading,
      })),
    });

    return NextResponse.json({ message: 'Pertanyaan berhasil diperbarui', count: createdQuestions.count }, { status: 200 });
  } catch (error) {
    console.error('Error updating questions:', error);
    return NextResponse.json(
      {
        error: 'Gagal memperbarui pertanyaan',
        details: error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga',
      },
      { status: 500 }
    );
  }
}
