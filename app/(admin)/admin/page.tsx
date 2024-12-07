'use client';

import { useCurrentUser } from '@/hooks/use-current-user';

export default function AdminPage() {
  const user = useCurrentUser();

  return <>{JSON.stringify(user)}</>;
}
