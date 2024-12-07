'use server';

import * as z from 'zod';
import { registerSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { prisma } from '@/lib/db';

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. Periksa kembali email dan password Anda.' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const emailVerified = new Date();

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email sudah terdaftar!' };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      emailVerified,
      password: hashedPassword,
    },
  });

  return { success: 'Pendaftaran Berhasil!' };
};
