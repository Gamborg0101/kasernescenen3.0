'use client';

import { DeleteUser } from '@/lib/actions/userActions';
import { signOut } from 'next-auth/react';

export default function DeleteUserButton({ userId }: { userId: number }) {
  console.log('Mit id: ', userId);

  const handleDelete = async () => {
    const check = window.confirm('Er du sikker på, at du vil slette din bruger?');
    if (!check) return;
    await DeleteUser(userId);
    await signOut({ redirectTo: '/' });
  };

  return (
    <div className="flex bg-gray-200 w-full justify-between items-center p-2 border border-gray-200 rounded-xl mt-3">
      <div>
        <p className="font-bold">Slet konto</p>
        <p className="font-extralight">Denne handling kan ikke fortrydes</p>
      </div>
      <div>
        <button
          type="button"
          className="w-full text-white rounded-md py-2 bg-red-500 hover:bg-red-700 transition shadow shadow-white p-2"
          onClick={handleDelete}
        >
          Slet bruger
        </button>
      </div>
    </div>
  );
}
