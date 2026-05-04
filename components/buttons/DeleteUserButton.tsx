'use client';

import { DeleteUser } from '@/lib/actions/userActions';
import { signOut } from 'next-auth/react';

export default function DeleteUserButton({ userId }: { userId: number }) {
  const handleDelete = async () => {
    const check = window.confirm('Er du sikker på, at du vil slette din bruger?');
    if (!check) return;
    await DeleteUser(userId);
    await signOut({ redirectTo: '/' });
  };

  return (
    <div className="flex justify-between items-center bg-white border border-stone-100 shadow-sm rounded-2xl p-4 mt-3 w-full">
      <div>
        <p className="text-stone-800 font-semibold text-sm">Slet konto</p>
        <p className="text-stone-400 text-xs mt-0.5">Denne handling kan ikke fortrydes</p>
      </div>
      <button 
        type="button"
        className="text-xs text-stone-400 hover:text-red-500 hover:bg-red-50 border border-stone-100 hover:border-red-100 px-4 py-1.5 rounded-xl transition-colors duration-150 font-medium"
        onClick={handleDelete}
      >
        Slet bruger
      </button>
    </div>
  );
}
