'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (currentUser.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Akses ditolak. Hanya admin yang bisa melakukan tindakan ini.' },
      { status: 403 } // 403 Forbidden
    );
  }

  const body = await request.json();
  const { level, title, story, time } = body;

  try {
    const createTest = await prisma.testReading.create({
      data: {
        title,
        level,
        story,
        time,
        adminId: currentUser.id,
      },
    });

    return NextResponse.json(createTest, { status: 201 });
  } catch (error) {
    console.error('Error creating test:', error);
    return NextResponse.json(
      {
        error: 'Gagal menambahkan test',
        details: error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga',
      },
      { status: 500 }
    );
  }
}
