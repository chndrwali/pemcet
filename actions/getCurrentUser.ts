import { auth } from '@/auth';
import { getUserByEmail } from '@/data/user';

export const getSession = async () => {
  const session = await auth();

  return session?.user;
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.email) {
      return null;
    }

    const currentUser = await getUserByEmail(session.email);

    if (!currentUser) return null;

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
