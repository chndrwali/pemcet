'use client';

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { newPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export const FormNewPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/users/new-password`, values);
      toast.success('Passwor anda berhasil di perbarui');
      router.refresh();
    } catch (error) {
      toast.error('Password anda gagal di perbarui!');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-2 relative">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata sandi lama</FormLabel>
                <FormControl>
                  <Input {...field} type={showOldPassword ? 'text' : 'password'} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="button" className="absolute top-5 right-0 mt-4 mr-4 focus:outline-none" onClick={() => setShowOldPassword((prev) => !prev)}>
            {showOldPassword ? <EyeOff className="text-slate-400" /> : <Eye className="text-slate-400" />}
          </button>
        </div>

        <div className="mb-2 relative">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata sandi baru</FormLabel>
                <FormControl>
                  <Input {...field} type={showNewPassword ? 'text' : 'password'} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="button" className="absolute top-5 right-0 mt-4 mr-4 focus:outline-none" onClick={() => setShowNewPassword((prev) => !prev)}>
            {showNewPassword ? <EyeOff className="text-slate-400" /> : <Eye className="text-slate-400" />}
          </button>
        </div>

        <Button variant="shine" className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? <div className="w-6 h-6 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" /> : 'Ubah'}
        </Button>
      </form>
    </Form>
  );
};
