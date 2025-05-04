'use client';

import { Button } from '@/components/ui/button';
import { QuizResult } from '@prisma/client';
import { LoaderIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useConfirm } from '@/hooks/use-confirm';
import axios from 'axios';
import { toast } from 'sonner';
// import { DetailExam } from './detail-exam';

interface TableQuizProps {
  quiz: QuizResult[];
}

export const TableQuiz = ({ quiz }: TableQuizProps) => {
  const [isLoadingId, setIsLoadingId] = useState<string | null>(null);
  const [ConfirmDialog, confirm] = useConfirm('Apakah anda yakin menghapus item ini?', 'Item ini akan di hapus dari list');
  const [rows, setRows] = useState<QuizResult[]>(quiz ?? []);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const handleDelete = async (quiz: QuizResult) => {
    const ok = await confirm();

    if (ok) {
      setIsLoadingId(quiz.id);
      axios
        .post(`/api/admin/quiz/delete`, { id: quiz.id })
        .then(() => {
          setRows((prevRows) => prevRows.filter((row) => row.id !== quiz.id)); // Update rows
          toast.success('Berhasil hapus item');
          setIsLoadingId(null);
        })
        .catch(() => {
          setIsLoadingId(null);
          toast.error('Gagal hapus item');
        });
    }
  };

  return (
    <div className="flex flex-col  rounded-md shadow-sm p-4">
      <ConfirmDialog />

      <div className="w-full overflow-hidden border rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap border-collapse border-gray-300">
            <thead>
              <tr className=" bg-gray-200 text-xs font-semibold tracking-wide text-left text-foreground uppercase border-b">
                <th className="px-4 py-2 border border-gray-300">Nama </th>
                <th className="px-4 py-2 border border-gray-300">Kelas</th>
                <th className="px-4 py-2 border border-gray-300">Waktu Membaca</th>
                <th className="px-4 py-2 border border-gray-300">Skor</th>
                <th className="px-4 py-2 border border-gray-300">Kategori</th>
                <th className="px-4 py-2 border border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-foreground/80 `}>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center space-x-2">
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{row.class} SD</td>

                  <td className="px-4 py-2 border border-gray-300">{row.count} Detik</td>
                  <td className="px-4 py-2 border border-gray-300">{row.quiz}</td>
                  <td className="px-4 py-2 border border-gray-300">{row.type}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center gap-4">
                      <Button variant="destructive" onClick={() => handleDelete(row)} disabled={isLoadingId === row.id}>
                        {isLoadingId === row.id ? (
                          <>
                            <LoaderIcon className="size-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            {' '}
                            <Trash2 className="mr-2 h-5 w-5" size={20} /> Hapus
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
        <div className="flex items-center  px-4 py-3 text-xs font-semibold tracking-wide text-foreground/80 uppercase border-t bg-background">
          <span className="flex mt-2 sm:mt-auto">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                {Array.from({ length: Math.ceil(totalItems / pagination.itemsPerPage) }).map((_, index) => (
                  <li key={index}>
                    <Button
                      onClick={() => changePage(index + 1)}
                      className={`${
                        pagination.currentPage === index + 1
                          ? 'px-3 py-1 text-white transition-colors duration-150 bg-primary border border-r-0 border-primary rounded-md focus:outline-none focus:shadow-outline-purple'
                          : 'px-3 py-1 transition-colors duration-150 hover:bg-blue-500 hover:text-white rounded-md focus:outline-none focus:shadow-outline-purple'
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
