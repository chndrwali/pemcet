'use client';

import { Book, Home, Search, Settings, Users } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { UserMenuFooter } from '@/app/(admin)/_components/userMenuFooter';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const pathname = usePathname();
  // Menu items.
  const items = [
    {
      title: 'Dashboard',
      url: '/admin',
      active: pathname === '/admin',
      icon: Home,
    },
    {
      title: 'Murid',
      url: '/admin/users',
      icon: Users,
      active: pathname === '/admin/users',
    },
    {
      title: 'Daftar Baca',
      url: '/admin/test-reading',
      icon: Book,
      active: pathname === '/admin/test-reading',
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
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
                  <SidebarMenuButton asChild className={cn('', item.active ? 'text-blue-500' : '')}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
