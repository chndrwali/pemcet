import { getCurrentUser } from '@/actions/getCurrentUser';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
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
  const { level } = body;

  try {
    const deleteTest = await prisma.testReading.delete({
      where: { level: level },
    });

    return NextResponse.json(deleteTest, { status: 201 });
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
