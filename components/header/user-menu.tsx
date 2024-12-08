'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import Link from 'next/link';
import { useConfirm } from '@/hooks/use-confirm';
import { SafeUser } from '@/types';
import { FaUser } from 'react-icons/fa';
import { LogOut } from 'lucide-react';
import { logout } from '@/actions/logout';
import { cn } from '@/lib/utils';

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [ConfirmDialog, confirm] = useConfirm('Apakah kamu yakin?', 'Anda akan keluar akun.');
  const handleLogout = async () => {
    const ok = await confirm();
    if (ok) {
      logout();
      toast.success('Berhasil keluar!');
    }
  };

  const name = currentUser?.name;
  if (!name) return;
  const nameToNumber = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360;
  const color = `hsl(${hue}, 80%, 60%)`;

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={currentUser?.image || ''} />
            <AvatarFallback className={cn(`border-4`)} style={{ backgroundColor: color }}>
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" side="bottom">
          <DropdownMenuLabel>
            <p className="text-sm font-bold text-foreground truncate">{currentUser?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {currentUser?.role === 'ADMIN' && (
            <Link href="/admin">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem asChild onClick={handleLogout} className="cursor-pointer">
            <div className="text-destructive">
              <LogOut className="inline-block mr-2" size={20} />
              Keluar
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
