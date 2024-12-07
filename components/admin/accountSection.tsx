'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CiEdit } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa6';
import { UpdateUserForm } from '../form/updateUserForm';
import { SafeUser } from '@/types';
import { FormNewPassword } from '../form/newPasswordForm';

interface UserProps {
  currentUser: SafeUser | null;
}

export const AccountsSection = ({ currentUser }: UserProps) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="profil">
        <TabsList className="gap-x-2">
          <TabsTrigger value="profil" className="rounded-sm px-4 py-2 text-base bg-slate-300 text-foreground font-medium data-[state=active]:bg-gradientblue data-[state=active]:text-white data-[state=active]:shadow-sm">
            Profile
          </TabsTrigger>
          <TabsTrigger value="services" className="rounded-sm px-4 py-2 text-base bg-slate-300 text-foreground font-medium data-[state=active]:bg-gradientblue data-[state=active]:text-white data-[state=active]:shadow-sm">
            Ganti password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profil">
          <Card>
            <CardHeader>
              <CardTitle> Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="container mx-auto">
                <main className="flex-1 p-6">
                  <div className="flex flex-col gap-4 sm:mx-4 mx-0">
                    <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-12 sm:ml-8 items-start sm:items-start">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start">
                        <Avatar className="cursor-pointer h-20 w-20 border-4 border-black">
                          <AvatarImage src={currentUser?.image || ''} />
                          <AvatarFallback>
                            <FaUser size={40} />
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                          <span className="mt-2 text-base sm:text-lg leading-tight text-muted-foreground">{currentUser?.email}</span>
                        </div>
                      </div>

                      {/* Bagian Tombol Edit */}
                      <div className="sm:mt-4 mt-1 text-center sm:text-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <CiEdit size={20} className="mr-2" /> Edit Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="overflow-y-auto max-h-[80vh] sm:max-w-[800px] ">
                            <DialogHeader>
                              <DialogTitle>Edit profile</DialogTitle>
                            </DialogHeader>
                            <UpdateUserForm currentUser={currentUser} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="w-full border-b-2 border-black mt-3 mr-4"></div>

                    {/* Bagian Nama dan Lokasi */}
                    <div className="ml-0 sm:ml-8">
                      <table className="table-auto w-full sm:w-auto">
                        <tbody>
                          <tr>
                            <td className="text-base sm:text-lg leading-tight pr-4">Nama Lengkap</td>
                            <td className="text-base sm:text-lg leading-tight font-semibold text-black">
                              <span className="text-black font-normal mr-2">:</span>
                              {currentUser?.name || 'Belum diisi'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </main>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Ganti password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="container mx-auto">
                <div className="max-w-lg">
                  <FormNewPassword />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gallery"></TabsContent>
      </Tabs>
    </div>
  );
};
