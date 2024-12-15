'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa6';
import { UserWithResult } from './table-users';

interface DetailUserProps {
  user: UserWithResult;
}

const DetailUser = ({ user }: DetailUserProps) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
      {/* User Information */}
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.image || ''} />
          <AvatarFallback>
            <FaUser size={40} />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.name || 'Tidak ada nama'}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500 capitalize">Role: {user.role === 'USER' ? 'MURID' : 'GURU'}</p>
        </div>
      </div>

      {/* Exam Results */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-4">Hasil Ujian</h3>
        {user.ExamResult.length > 0 ? (
          <ul className="space-y-3">
            {user.ExamResult.map((result) => (
              <li key={result.id} className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md shadow-sm">
                <div>
                  <p className="text-sm font-medium text-gray-800">Ujian: {result.examId}</p>
                  <p className="text-sm text-gray-500">Skor: {result.score}</p>
                </div>
                <span className="text-xs text-gray-400">{new Date(result.submittedAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Belum ada hasil ujian.</p>
        )}
      </div>
    </div>
  );
};

export default DetailUser;
