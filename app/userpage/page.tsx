'use server';

import { auth } from '@/auth/authSetup';
import { getUser } from '../../lib/db/users';
import { getThreeBookings } from '../../lib/db/bookings';
import Image from 'next/image';
import BookingCard from '../../components/buttons/BookingCard';
import newDark from '../../public/newDark.png';
import DeleteUserButton from '../../components/buttons/DeleteUserButton';

export default async function UserPage() {
  const session = await auth();

  if (!session) return <div>Not logged in</div>;

  const userId = Number(session.user.id);
  const user = await getUser(Number(userId));
  const threeBookings = await getThreeBookings(Number(userId));

  return (
    <div className="flex flex-row justify-center bg-stone-50 mt-20">
      <div>
        <div className="w-176 top-8 bg-white border border-stone-200 shadow-sm rounded-2xl mb-4">
          <h3 className="font-serif text-2xl font-extrabold ml-3 mt-3">Profil</h3>
          <div className="flex items-center ml-3 mt-3">
            <Image
              src={session.user.image || newDark}
              alt="black picture"
              width={96}
              height={96}
              className="rounded-full my-5 whitespace-nowrap"
            />
            <div className="pl-4">
              <p className="font-extrabold">{`${user?.firstName} ${user?.lastName}`}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Userinfo section */}
          <div className="grid grid-cols-2 gap-px bg-stone-100 rounded-2xl overflow-hidden border border-stone-100 m-2">
            <div className="bg-white px-4 py-4">
              <p className="text-gray-500 text-xs tracking-wider uppercase mb-1">Studie</p>
              <p className="capitalize">{user?.study}</p>
            </div>

            <div className="bg-white px-4 py-4">
              <p className="text-gray-500 text-xs tracking-wider uppercase mb-1">Rolle</p>
              <p className="capitalize">{user?.role}</p>
            </div>

            <div className="bg-white px-4 py-4">
              <p className="text-gray-500 text-xs tracking-wider uppercase mb-1">Studienummer</p>
              <p>{user?.studentNumber}</p>
            </div>

            <div className="bg-white px-4 py-4">
              <p className="text-gray-500 text-xs tracking-wider uppercase mb-1">Kortnummer</p>
              <p>{user?.cardNumber}</p>
            </div>
          </div>
        </div>
        {/* Following bookings */}
        <p className="text-gray-500 text-s font-bold mb-2">
          BOOKINGER <span className="text-xs">(Dine 3 næste bookinger)</span>
        </p>
        <div className="flex flex-cols">
          <div className="grid grid-cols-3 grow gap-3 ">
            {threeBookings
              .filter((booking) => booking.endTime > new Date())
              .map((booking) => (
                <div key={booking.id} className="flex flex-col ">
                  <BookingCard booking={booking} />
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col justify-end items-center w-full">
          <DeleteUserButton userId={Number(session.user.id)} />
        </div>
      </div>
    </div>
  );
}
