'use client';

import { DeleteUser } from '@/lib/actions/userActions';
import { signOut } from 'next-auth/react';

export default function DeleteUserButton({ userId }: { userId: number }) {
  console.log('Mit id: ', userId);

  const handleDelete = async () => {
    const check = window.confirm('Er du sikker på, at du vil slette din bruger?');
    if (!check) return;
    await DeleteUser(userId);
    await signOut({ redirectTo: '/' }); // logger ud og redirecter
  };

  return (
    <button
      type="button"
      className="w-full  text-white rounded-md py-2 bg-red-500 hover:bg-red-700 transition mt-2"
      onClick={handleDelete}
    >
      Slet bruger
    </button>
  );
}
