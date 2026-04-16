'use server';

import { auth } from '@/auth/authSetup';
import { getUser } from '../../lib/db/users';
import { getThreeBookings } from '../../lib/db/bookings';
import Image from 'next/image';
import BookingCard from '../../components/buttons/BookingCard';
import newDark from '../../public/newDark.png';

export default async function UserPage() {
  const session = await auth();

  if (!session) return <div>Not logged in</div>;

  const userId = Number(session.user.id);

  const user = await getUser(Number(userId));

  const threeBookings = await getThreeBookings(Number(userId));

  return (
    <div className="flex justify-center center-bookings bg-stone-50 font-serif py-52 ">
      <div className="grid grid-2-rows w-106 h-116 sticky top-8 bg-white border border-stone-200 shadow-sm rounded-t-2xl">
        <div className="m-4 ">
          <h3 className="font-serif text-2xl font-extrabold">Profil</h3>

          <Image
            src={session.user.image || newDark}
            alt="black picture"
            width={96}
            height={96}
            className="rounded-full my-5"
          />
          <p className="font-extrabold ">{`${user?.firstName} ${user?.lastName}`}</p>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-gray-500">{user?.category}</p>
          <p className="text-gray-500">{user?.studentNumber}</p>
          <p className="text-gray-500">{user?.role}</p>
        </div>
        {/* Following bookings */}
        <div className="flex flex-cols ">
          <div className="grid grid-cols-3 grow">
            {threeBookings.map((booking) => (
              <div key={booking.id} className="flex flex-col border">
                <BookingCard booking={booking} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
