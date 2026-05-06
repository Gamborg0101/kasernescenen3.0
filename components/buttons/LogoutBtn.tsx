import { signOut } from '@/auth/authSetup';

export default function LogoutBtn() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <button
        type="submit"
        className="text-sm text-stone-400 hover:text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors duration-150 font-medium cursor-pointer select-none"
      >
        Log ud
      </button>
    </form>
  );
}
