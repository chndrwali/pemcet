import { getCurrentUser } from '@/actions/getCurrentUser';
import { AccountsSection } from '@/components/admin/accountSection';

export default async function AccountPage() {
  const currentUser = await getCurrentUser();

  return (
    <section className="flex w-full container mx-auto p-4">
      <AccountsSection currentUser={currentUser} />
    </section>
  );
}
