import { auth } from '@/auth/authSetup';

export default async function UserPage() {
  const session = await auth();

  if (!session) {
    <div>you are not logged in</div>;
  }

  const user = session?.user;

  const userInfo = {
    name: user?.name,
    email: user?.email,
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
