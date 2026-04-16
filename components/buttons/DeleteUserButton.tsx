'use client';

import { DeleteUser } from '@/lib/actions/userActions';

export default function DeleteUserButton({ userId }: { userId: number }) {
  const handleDelete = async () => {
    const firstCheck = window.confirm('Er du sikker på, at du vil slette din bruger?');
    if (!firstCheck) return;

    const secondCheck = window.confirm('Dette kan IKKE fortrydes. Vil du fortsætte?');
    if (!secondCheck) return;

    await DeleteUser(userId);
  };

  return (
    <button
      type="button"
      className="w-full  text-white rounded-md py-2 bg-indigo-600 hover:bg-indigo-700 transition mt-2"
      onClick={handleDelete}
    >
      Slet bruger
    </button>
  );
}
