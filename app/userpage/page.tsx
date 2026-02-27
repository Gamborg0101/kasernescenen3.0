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
  });

  console.log('Right here: ', session.user.image);
  console.log('image:', JSON.stringify(session.user.image));

  return (
    <div className="flex justify-center center-items bg-stone-50 font-serif py-52">
      <div className="grid grid-2-rows w-106 h-116 sticky top-8 bg-white border border-stone-200 rounded-sm shadow-sm ">
        <div className="m-4">
          <h3 className="font-serif text-2xl ">Brugerinformation</h3>
          <Image
            src={session.user.image || newDark}
            alt="test"
            width={96}
            height={96}
            className="rounded-full my-5"
          />
          <p>{`${userFromDb?.firstName} ${userFromDb?.lastName}`}</p>
          <p>{userFromDb?.email}</p>
          <p>{userFromDb?.category}</p>
          <p>{userFromDb?.studentNumber}</p>
          <p>{userFromDb?.role}</p>
        </div>
        {/* Following bookings */}
        <div className="flex flex-col-reverse  ">
          <div className="">
            <div className="grid grid-cols-3  ">
              {nextBooking.map((item) => (
                <div key={item.id} className="border">
                  <BookingCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
