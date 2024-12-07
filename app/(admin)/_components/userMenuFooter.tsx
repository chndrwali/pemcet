'use client';

import Link from 'next/link';
import { logout } from '@/actions/logout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useConfirm } from '@/hooks/use-confirm';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ChevronUp, User2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const UserMenuFooter = () => {
  const { toast } = useToast();
  const [ConfirmDialog, confirm] = useConfirm('Apakah kamu yakin?', 'Anda akan keluar akun.');
  const user = useCurrentUser();

  const LogOut = async () => {
    const ok = await confirm();
    if (ok) {
      logout();
      toast({
        variant: 'success',
        description: 'Berhasil keluar',
      });
    }
  };

  return (
    <SidebarFooter>
      <ConfirmDialog />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.image || ''} alt={user?.name || 'Undefined'} />
                  <AvatarFallback className="bg-sky-500">
                    <User2 className="text-white" />
                  </AvatarFallback>
                </Avatar>
                {user?.name}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
              <Link href="/admin/account">
                <DropdownMenuItem>
                  <span>Akun</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={LogOut}>
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
