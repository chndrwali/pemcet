'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Exam, LevelReading, Question } from '@prisma/client';
import { LoaderIcon, PencilLine, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useConfirm } from '@/hooks/use-confirm';
import axios from 'axios';
import { toast } from 'sonner';
import { MultiQuestionExamForm } from './add-exam-form';
import { DetailExam } from './detail-exam';

interface TableExamProps {
  exam: ExamWithQuestion[];
}

export type ExamWithQuestion = Exam & {
  questions: Question[];
};
export const TableExam = ({ exam }: TableExamProps) => {
  const [isLoadingId, setIsLoadingId] = useState<LevelReading | null>(null);
  const [ConfirmDialog, confirm] = useConfirm('Apakah anda yakin menghapus item ini?', 'Item ini akan di hapus dari list');
  const [rows, setRows] = useState<ExamWithQuestion[]>(exam ?? []);
  const [selectedExam, setSelectedExam] = useState<ExamWithQuestion | null>(null);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const handleDelete = async (exam: Exam) => {
    const ok = await confirm();

    if (ok) {
      setIsLoadingId(exam.level);
      axios
        .post(`/api/admin/exam/delete`, { level: exam.level })
        .then(() => {
          setRows((prevRows) => prevRows.filter((row) => row.level !== exam.level)); // Update rows
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
      <div className="max-w-[200px] mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Soal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[900px] w-[90%]">
            <DialogHeader>
              <DialogTitle>Tambah Soal</DialogTitle>
            </DialogHeader>
            <div className="max-h-[75vh] overflow-y-auto px-2">
              <MultiQuestionExamForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full overflow-hidden border rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap border-collapse border-gray-300">
            <thead>
              <tr className=" bg-gray-200 text-xs font-semibold tracking-wide text-left text-foreground uppercase border-b">
                <th className="px-4 py-2 border border-gray-300">Level</th>
                <th className="px-4 py-2 border border-gray-300">Jumlah Soal</th>
                <th className="px-4 py-2 border border-gray-300">Detail</th>
                <th className="px-4 py-2 border border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <tr key={row.level} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-foreground/80 `}>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center space-x-2">
                      <span>{row.level}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{row.questions.length} soal</td>

                  <td className="px-4 py-2 border border-gray-300">
                    <Dialog>
                      <DialogTrigger asChild onClick={() => setSelectedExam(row)}>
                        <Button type="button" variant="outline">
                          Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[900px] w-[90%]">
                        <DialogHeader>
                          <DialogTitle>Detail</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[75vh] overflow-y-auto px-2">{selectedExam && <DetailExam exam={selectedExam} />}</div>
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline">
                            <PencilLine className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[900px] w-[90%]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-1">
                              <PencilLine className="h-4 w-4 mr-2" />
                              Update Soal
                            </DialogTitle>
                          </DialogHeader>
                          <div className="max-h-[75vh] overflow-y-auto px-2">
                            <MultiQuestionExamForm exam={row} />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="destructive" onClick={() => handleDelete(row)} disabled={isLoadingId === row.level}>
                        {isLoadingId === row.level ? (
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
