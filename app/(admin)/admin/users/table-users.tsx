'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExamResult, User } from '@prisma/client';
import { FaUser } from 'react-icons/fa6';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import axios from 'axios';
import { useConfirm } from '@/hooks/use-confirm';
import DetailUser from './detail-user';
// import DetailUser from './detailUser';

interface TableUserProps {
  users: UserWithResult[];
}

export type UserWithResult = User & {
  ExamResult: ExamResult[];
};

const TableUser = ({ users }: TableUserProps) => {
  const [ConfirmDialog, confirm] = useConfirm('Anda yakin menghapus pengguna ini?', 'Data akan di hapus dari list');
  const [rows, setRows] = useState<UserWithResult[]>(users || []);
  const [selectedUser, setSelectedUser] = useState<UserWithResult | null>(null);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleDeleteUser = async (userId: string) => {
    const ok = await confirm();
    if (ok) {
      setIsLoading(userId);
      try {
        toast('Sedang menghapus akun pengguna...');
        await axios.post(`/api/users/delete`, { userId });

        const updatedRows = rows.filter((user) => user.id !== userId);
        setRows(updatedRows);
        toast.success('Pengguna sudah terhapus');
        setIsLoading(null);
      } catch (error) {
        toast.error('Ups! Ada yang salah');
        console.error('Failed to delete user:', error);
        setIsLoading(null);
      }
    }
  };

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  return (
    <div className="flex flex-col items-center ">
      <ConfirmDialog />

      <div className="w-full overflow-hidden border rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto min-h-[580px]">
          <table className="w-full whitespace-no-wrap border-collapse border-gray-300 ">
            <thead>
              <tr className=" bg-gray-200 text-xs font-semibold tracking-wide text-left text-foreground uppercase border-b">
                <th className="px-4 py-2 border border-gray-300">Nama User</th>
                <th className="px-4 py-2 border border-gray-300">Email User</th>
                <th className="px-4 py-2 border border-gray-300">Role</th>
                <th className="px-4 py-2 border border-gray-300">Detail</th>
                <th className="px-4 py-2 border border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-foreground/80 `}>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="cursor-pointer ">
                        <AvatarImage src={row.image || ''} />
                        <AvatarFallback>
                          <FaUser size={20} />
                        </AvatarFallback>
                      </Avatar>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.role === 'USER' ? 'MURID' : 'GURU'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Dialog>
                      <DialogTrigger asChild onClick={() => setSelectedUser(row)}>
                        <Button type="button" variant="outline">
                          Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[900px] w-[90%]">
                        <DialogHeader>
                          <DialogTitle>Detail User</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[75vh] overflow-y-auto px-2">{selectedUser && <DetailUser user={selectedUser} />}</div>
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center space-x-4 text-sm">
                      <Button variant="destructive" onClick={() => handleDeleteUser(row.id)} disabled={isLoading === row.id}>
                        {isLoading ? (
                          <div className=" w-5 h-5 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="mr-2 w-5 h-5" />
                            Hapus
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-xs font-semibold tracking-wide text-foreground/80 uppercase border-t bg-background">
          <span className="flex items-center">
            Menampilkan {indexOfFirstItem + 1} - {indexOfLastItem} dari {totalItems}
          </span>
          {/* Pagination */}
          <span className="flex mt-2 sm:mt-auto">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                {Array.from({ length: Math.ceil(totalItems / pagination.itemsPerPage) }).map((_, index) => (
                  <li key={index}>
                    <Button
                      onClick={() => changePage(index + 1)}
                      className={`${
                        pagination.currentPage === index + 1
                          ? 'px-3 py-1 text-white transition-colors duration-150 bg-gradientblue border border-r-0 border-gradientblue rounded-md focus:outline-none focus:shadow-outline-purple'
                          : 'px-3 py-1 transition-colors duration-150 hover:bg-brown-500 hover:text-white rounded-md focus:outline-none focus:shadow-outline-purple'
                      }`}
                    >
                      {index + 1}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableUser;
