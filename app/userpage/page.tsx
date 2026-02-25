import { auth } from '@/auth/authSetup';
import { prisma } from '@/db';
import Image from 'next/image';
import BookingCard from '../components/buttons/BookingCard';


export default async function UserPage() {
  const session = await auth();

  if (!session) return <div>Not logged in</div>;

  const user = session?.user;

  //Alt brugerinfo fra DB
  const userFromDb = await prisma.user.findFirst({
    where: {
      id: Number(user.id),
    },
  });

  const nextBooking = await prisma.booking.findMany({
    where: {
      userId: userFromDb?.id,
    },
  });

  console.log(nextBooking);

  return (
    <div className=" flex justify-center center-items bg-stone-50 font-serif py-52">
      <div className="w-106 h-106 sticky top-8 bg-white border border-stone-200 rounded-sm p-8 shadow-sm ">
        <h3 className="font-serif text-2xl ">Brugerinformation</h3>
        <Image
          src={session.user?.image || ''}
          alt={`${user.name}`}
          width={96}
          height={96}
          className="rounded-full my-5"
        />
        <p>{`${userFromDb?.firstName} ${userFromDb?.lastName}`}</p>
        <p>{userFromDb?.email}</p>
        <p>{userFromDb?.category}</p>
        <p>{userFromDb?.studentNumber}</p>

        {/* Following bookings */}
        <div>
          <h3>3 næste bookinger:</h3>
          <div className="grid grid-cols-3 gap-4 ">
            {nextBooking.map((item, index) =>
              index < 3 ? (
                <div key={index}>
                  <BookingCard item={item} />
                </div>
              ) : (
                ''
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
