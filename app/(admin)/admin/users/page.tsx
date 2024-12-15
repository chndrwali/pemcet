import { getCurrentUser } from '@/actions/getCurrentUser';
import { getUsers } from '@/actions/getUsers';
import { FaUserCog } from 'react-icons/fa';
import TableUser from './table-users';

const ManagementUserPage = async () => {
  const users = await getUsers();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'ADMIN') return <p>Anda bukan admin!</p>;

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center space-x-4">
        <FaUserCog className="h-11 w-11 mr-2" />
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Manajemen Data User</h1>
      </div>

      <TableUser users={users} />
    </div>
  );
};

export default ManagementUserPage;
