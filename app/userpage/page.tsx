import { auth } from '@/auth/authSetup';

export default async function UserPage() {
  const session = await auth();

  if (!session) return { name: '', email: '' };

  const user = session?.user;

  const userInfo = {
    name: user?.name || '',
    email: user?.email || '',
  };

  return (
    <div>
      <p>
        These are the credentials:
        <br />
        {userInfo.name}
        <br />
        {userInfo.email}
      </p>
    </div>
  );
}
