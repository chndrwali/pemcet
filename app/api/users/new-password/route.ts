import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const body = await request.json();
  const { password, newPassword } = body;

  // Retrieve the user's current hashed password from the database
  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: { password: true },
  });

  if (!user || !user.password) {
    return NextResponse.json({ error: 'User not found or password not set' }, { status: 404 });
  }

  // Check if the provided password matches the stored hashed password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 403 });
  }

  // Hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: currentUser.id },
    data: { password: hashedNewPassword },
  });

  return NextResponse.json({ message: 'Password updated successfully' });
}
