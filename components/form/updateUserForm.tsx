'use client';

import * as z from 'zod';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { updateUserSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { SafeUser } from '@/types';

interface UpdateUserFormProps {
  currentUser: SafeUser | null;
}

export const UpdateUserForm = ({ currentUser }: UpdateUserFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: currentUser?.name || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    setIsLoading(true);
    startTransition(() => {
      axios
        .put(`/api/users`, values)
        .then(() => {
          toast.success('Profile berhasil di perbarui');
          setIsLoading(false);
          router.refresh();
        })
        .catch((error) => {
          toast.error('Gagal mengupdate profile!');
          console.log(error);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kolom untuk Avatar */}
          <div className="flex flex-col md:items-start items-center">
            <Avatar className="cursor-pointer h-20 w-20 border-4 border-black">
              <AvatarImage src={currentUser?.image || ''} />
              <AvatarFallback>
                <FaUser size={40} />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Kolom untuk Form */}
          <div>
            <div className="mb-2 relative">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Masukan nama lengkap Anda" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading} className="items-center bg-blue-800">
                {isLoading ? <> Memperbarui profil..</> : 'Simpan'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
