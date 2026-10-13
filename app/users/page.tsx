import UserList from '@/components/lists/UserList';
import { getUsers } from '@/lib/db/users';
import { auth } from '@/auth/authSetup';
import { sessionError, adminRoleRequired } from '@/lib/errorMessages';
import { redirect } from 'next/navigation';

export default async function Users() {
  const session = await auth();

  if (!session) {
    console.error(sessionError);
    redirect('/');
  }
  if (session.user.role !== 'admin') {
    console.error(adminRoleRequired);
    redirect('/');
  }

  const users = await getUsers();

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}
