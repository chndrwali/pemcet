'use client';

import { Book, BookOpen, Users } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { UserMenuFooter } from '@/app/(admin)/_components/userMenuFooter';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const pathname = usePathname();
  // Menu items.
  const items = [
    {
      title: 'Murid',
      url: '/admin/users',
      icon: Users,
      active: pathname === '/admin/users',
    },
    {
      title: 'Test Membaca',
      url: '/admin/test-reading',
      icon: Book,
      active: pathname === '/admin/test-reading',
    },
    {
      title: 'Uji Pemahaman',
      url: '/admin/exam',
      icon: BookOpen,
      active: pathname === '/admin/exam',
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn('flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200', item.active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600')}>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className={cn('h-5 w-5 transition-all duration-200', item.active ? 'text-blue-500' : 'text-gray-500')} />
                      <span className="font-medium text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <UserMenuFooter />
    </Sidebar>
  );
}
