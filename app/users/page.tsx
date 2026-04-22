import UserList from '@/components/UserList';
import { getUsers } from '@/lib/db/users';

export default async function Users() {
  
  const users = await getUsers();

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}
