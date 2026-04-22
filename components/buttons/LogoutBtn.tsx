import { signOut } from '@/auth/authSetup';

export default function LogoutBtn() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit" className="flex justify-center items-center transition hover:bg-amber-700 h-16 p-5">
        Log ud
      </button>
    </form>
  );
}
