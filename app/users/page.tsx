import UserList from '@/components/UserList';
import { getUsers } from '@/lib/db/users';

export default async function Users() {
  const users = await getUsers();

  //Need logic for only admin-access to this page

  return (
    <div>
      
      <UserList users={users} />
    </div>
  );
}
