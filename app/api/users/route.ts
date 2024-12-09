'use server';

import { getCurrentUser } from '@/actions/getCurrentUser';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const { name } = body;

  try {
    const updateUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { name },
    });

    return NextResponse.json(updateUser, { status: 201 });
  } catch (error) {
    console.error('Error update user', error);
    return NextResponse.json({ error: 'Gagal mengupdate' }, { status: 404 });
  }
}
