import { auth } from '@/auth/authSetup';
import { prisma } from '@/db';

export default async function UserPage() {
  const session = await auth();

  if (!session) return { name: '', email: '' };

  const user = session?.user;

  //ID fra session
  const userInfo = {
    name: user?.name || '',
    email: user?.email || '',
    id: user?.id || '',
  };

  //Alt brugerinfo fra DB
  const userFromDb = await prisma.user.findFirst({
    where: {
      id: Number(userInfo.id),
    },
  });

  console.log(userFromDb);

  return (
    <div>
      <p>These are the credentials:</p>
      <br />
      <p>{`${userFromDb?.firstName} ${userFromDb?.lastName}`}</p>
    </div>
  );
}
