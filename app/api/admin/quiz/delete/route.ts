import { getCurrentUser } from '@/actions/getCurrentUser';
import { deleteQuiz } from '@/actions/getQuiz';
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
  const { id } = body;

  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { error: 'Invalid ID' },
      { status: 401 } // 403 Forbidden
    );
  }

  try {
    const result = await deleteQuiz(id);

    return NextResponse.json(result, { status: 201 });
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
