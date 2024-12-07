import { getCurrentUser } from '@/actions/getCurrentUser';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const userId = params.id;

    const userData = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Failed to update user profile:', error);

    return NextResponse.error();
  }
}
