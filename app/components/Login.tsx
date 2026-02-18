import { signIn } from '@/auth/authSetup';
import Image from 'next/image';

export function Login() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Log ind
        </h2>
      </div>

      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        {/* Mangler redirect efter login -> booking page */}
        <div className="flex items-center justify-center h-screen dark:bg-gray-800">
          <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <Image
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
              width={200}
              height={200}
            />
            <span>Login with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}
