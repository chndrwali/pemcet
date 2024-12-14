'use client';

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TestReading } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { testReadingSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';

interface AddReadingFormProps {
  testReading?: TestReading;
}

export const AddReadingForm = ({ testReading }: AddReadingFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof testReadingSchema>>({
    resolver: zodResolver(testReadingSchema),
    defaultValues: {
      level: testReading?.level || undefined,
      title: testReading?.title || '',
      time: testReading?.time || undefined,
      story: testReading?.story || '',
    },
  });

  const onSubmit = (value: z.infer<typeof testReadingSchema>) => {
    setIsLoading(true);

    const apiUrl = testReading ? `/api/admin/test-reading/${testReading.level}` : '/api/admin/test-reading';
    const apiMethod = testReading ? axios.patch : axios.post;

    apiMethod(apiUrl, value)
      .then(() => {
        toast.success(testReading ? 'Test membaca berhasil di update' : 'Test membaca berhasil di tambahkan');
        setIsLoading(false);
        router.push('/admin/test-reading');
      })
      .catch((err) => {
        console.error('Error', err);
        toast.error(testReading ? 'Gagal mengupdate test membaca' : 'Gagal menambahkan test membaca');
        setIsLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <div>
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Kategori</SelectLabel>

                      <SelectItem value="Pemula">Pemula</SelectItem>
                      <SelectItem value="Menengah">Menengah</SelectItem>
                      <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
              <FormMessage />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukan judul" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waktu</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukan waktu" type="number" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="story"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teks</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Masukan Cerita" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderIcon className="size-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Simpan'
          )}
        </Button>
      </form>
    </Form>
  );
};
