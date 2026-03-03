import { auth } from '@/auth/authSetup';
import { prisma } from '@/db';
import Image from 'next/image';
import BookingCard from '../components/buttons/BookingCard';
import newDark from '../../public/newDark.png';

export default async function UserPage() {
  const session = await auth();

  if (!session) return <div>Not logged in</div>;

  const user = session?.user;

  const userFromDb = await prisma.user.findUnique({
    where: {
      id: Number(user.id),
    },
  });

  const nextBooking = await prisma.booking.findMany({
    where: {
      userId: userFromDb?.id,
    },
    take: 3,
    orderBy: {
      startTime: 'asc',
    },
    include: { room: true },
  });

  return (
    <div className="flex justify-center center-items bg-stone-50 font-serif py-52 ">
      <div className="grid grid-2-rows w-106 h-116 sticky top-8 bg-white border border-stone-200 shadow-sm rounded-t-2xl">
        <div className="m-4 ">
          <h3 className="font-serif text-2xl font-extrabold">Profil</h3>
          <Image
            src={session.user.image || newDark}
            alt="test"
            width={96}
            height={96}
            className="rounded-full my-5"
          />
          <p className="font-extrabold ">{`${userFromDb?.firstName} ${userFromDb?.lastName}`}</p>
          <p className="text-gray-500">{userFromDb?.email}</p>
          <p className="text-gray-500">{userFromDb?.category}</p>
          <p className="text-gray-500">{userFromDb?.studentNumber}</p>
          {/* Fjernes inden prod*/}
          <p className="text-gray-500">{userFromDb?.role}</p>
        </div>
        {/* Following bookings */}
        <div className="flex flex-cols ">
          <div className="grid grid-cols-3 grow">
            {nextBooking.map((item) => (
              <div key={item.id} className="flex flex-col border">
                <BookingCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
