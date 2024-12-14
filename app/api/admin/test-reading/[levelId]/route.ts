'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { LevelReading } from '@prisma/client';

export async function PATCH(request: Request, { params }: { params: { levelId: string } }) {
  const { levelId } = await params;

  if (!Object.values(LevelReading).includes(levelId as LevelReading)) {
    return NextResponse.json({ error: `Invalid levelId: ${levelId}` }, { status: 400 });
  }

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

  if (!levelId) {
    return new NextResponse('notes Id is Required', { status: 400 });
  }

  const body = await request.json();
  const { title, story, time } = body;

  try {
    const updatedTest = await prisma.testReading.update({
      where: { level: levelId as LevelReading },
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

export async function DELETE(request: Request, { params }: { params: { levelId: string } }) {
  const { levelId } = await params;

  if (!Object.values(LevelReading).includes(levelId as LevelReading)) {
    return NextResponse.json({ error: `Invalid levelId: ${levelId}` }, { status: 400 });
  }
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

  if (!levelId) {
    return new NextResponse('notes Id is Required', { status: 400 });
  }

  try {
    const deleteAnnouncement = await prisma.testReading.delete({
      where: { level: levelId as LevelReading },
    });

    return NextResponse.json(deleteAnnouncement, { status: 201 });
  } catch (error) {
    console.error('Error create notes:', error);
    return NextResponse.json(
      {
        error: 'Gagal delete notes',
        details: error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga',
      },
      { status: 500 }
    );
  }
}
