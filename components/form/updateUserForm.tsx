/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UploadButton } from '@/components/uploadthing';
import Image from 'next/image';
import { Loader2, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { SafeUser } from '@/types';

interface UpdateUserFormProps {
  currentUser: SafeUser | null;
}

export const UpdateUserForm = ({ currentUser }: UpdateUserFormProps) => {
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>('');
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: currentUser?.name || '',
      image: currentUser?.image || '',
      email: currentUser?.email || '',
    },
  });

  useEffect(() => {
    if (typeof image === 'string') {
      form.setValue('image', image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [form, image]);

  useEffect(() => {
    if (currentUser?.image) {
      setImage(currentUser.image);
    }
  }, [currentUser]);

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    setIsLoading(true);
    startTransition(() => {
      axios
        .put(`/api/users/${currentUser?.id}`, values)
        .then(() => {
          toast({
            variant: 'success',
            title: 'Berhasil',
            description: 'Profile berhasil di update',
          });
          setIsLoading(false);
          router.refresh();
        })
        .catch((error) => {
          toast({ variant: 'destructive', title: 'Gagal', description: 'Gagal mengupdate profile' });
          console.log(error);
        });
    });
  };

  const handleImageDelete = async (image: string) => {
    try {
      setImageIsDeleting(true);
      await axios.delete(`/api/uploadthing/delete`, {
        data: {
          url: image,
        },
      });
      setImage(undefined);
      toast({
        variant: 'success',
        title: 'Berhasil',
        description: 'Berhasil menghapus gambar',
      });
    } catch (error) {
      console.error('Error menghapus file:', error);
      toast({ variant: 'destructive', title: 'Gagal', description: 'Gagal menghapus gambar' });
    } finally {
      setImageIsDeleting(false);
    }
  };

  const handleImageUploadComplete = (res: { url: string }[]) => {
    if (res && res.length > 0) {
      setImage(res[0].url);
      form.setValue('image', res[0].url);
      console.log('Files', res);
      toast({ variant: 'success', title: 'Berhasil', description: 'Berhasil mengupload gambar' });
    }
  };

  const handleImageUploadAndDelete = async (res: { url: string }[]) => {
    console.log('Gambar lama:', image);
    if (image) {
      await handleImageDelete(image);
    }
    handleImageUploadComplete(res);
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
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3 mt-4">
                  <div className="flex md:justify-start justify-center items-center mt-4">{image ? null : <FormLabel>Unggah gambar</FormLabel>}</div>
                  <FormControl>
                    {image ? (
                      <>
                        <div className="relative max-w-[200px] min-w-[200px] max-h-[200px] min-h-[200px] mt-4">
                          <Image src={image} alt="Gambar profil" fill className="object-contain" />
                          <Button onClick={() => handleImageDelete(image)} type="button" size="icon" variant="ghost" className="absolute right-[-12px] top-0">
                            {imageIsDeleting ? <Loader2 /> : <XCircle />}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={handleImageUploadAndDelete}
                        onUploadError={(error: Error) => {
                          console.error('Upload error:', error);
                          toast({ variant: 'destructive', title: 'Gagal', description: 'Gagal upload gambar' });
                        }}
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
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
