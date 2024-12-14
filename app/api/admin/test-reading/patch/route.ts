'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
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
    const updatedTest = await prisma.testReading.update({
      where: { level: level },
      data: {
        title,
        story,
        time,
      },
    });

    return NextResponse.json(updatedTest, { status: 201 });
  } catch (error) {
    console.error('Error updating announcement:', error);
    return NextResponse.json(
      {
        error: 'Gagal mengupdate pengumuman',
        details: error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga',
      },
      { status: 500 }
    );
  }
}
