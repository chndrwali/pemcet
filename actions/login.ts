'use server';

import * as z from 'zod';
import { loginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal.' };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return { error: 'Pengguna tidak ditemukan.' };
    }

    const redirectTo = user.role === 'ADMIN' ? '/admin/users' : '/doa';

    await signIn('credentials', {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Validasi gagal. Periksa kembali email dan password Anda.' };
        default:
          return { error: 'Ada sesuatu yang salah!' };
      }
    }
    throw error;
  }

  return { success: 'Login Berhasil!' };
};
