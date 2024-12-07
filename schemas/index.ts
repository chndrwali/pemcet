import * as z from 'zod';

function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent?.trim() || '';
}

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Email harus diisi dengan format yang valid.',
  }),
  password: z.string().min(1, {
    message: 'Password wajib diisi.',
  }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(1, {
    message: 'Password wajib diisi.',
  }),
  newPassword: z.string().min(1, {
    message: 'Password baru harus diisi',
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: 'Email harus diisi dengan format yang valid.',
  }),
  password: z.string().min(1, {
    message: 'Password wajib diisi.',
  }),
  name: z.string().min(1, {
    message: 'Nama harus diisi',
  }),
});

export const updateUserSchema = z.object({
  email: z.string().email({
    message: 'Email harus diisi dengan format yang valid.',
  }),
  image: z.string().min(1, {
    message: 'Password wajib diisi.',
  }),
  name: z.string().min(1, {
    message: 'Nama harus diisi',
  }),
});
