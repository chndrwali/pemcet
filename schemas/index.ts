import * as z from 'zod';

export function extractTextFromHTML(html: string) {
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
  name: z.string().min(1, {
    message: 'Nama harus diisi',
  }),
});

export const testReadingSchema = z.object({
  level: z.enum(['Pemula', 'Menengah', 'Lanjutan']).default('Pemula'),
  title: z.string().min(1, {
    message: 'Judul harus diisi!',
  }),
  time: z.coerce.number().min(1, {
    message: 'Waktu harus diisi!',
  }),
  story: z.string().min(1, {
    message: 'deskripsi harus diisi',
  }),
});

const questionSchema = z.object({
  questionText: z.string().min(1, 'Question text is required'),
  optionA: z.string().min(1, 'Option A is required'),
  optionB: z.string().min(1, 'Option B is required'),
  optionC: z.string().min(1, 'Option C is required'),
  optionD: z.string().min(1, 'Option D is required'),
  correctAnswer: z.enum(['A', 'B', 'C', 'D']).optional(),
});

export const examSchema = z.object({
  level: z.enum(['Pemula', 'Menengah', 'Lanjutan']).default('Pemula'),
  questions: z.array(questionSchema).min(1).max(5),
});

export const quizSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  class: z.coerce.number().min(1, 'Class is required'),
  count: z.coerce.number().min(1),
  quiz: z.coerce.number().min(1),
});
