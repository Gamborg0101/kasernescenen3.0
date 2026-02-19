import { signIn } from '@/auth/authSetup';
import Image from 'next/image';

export function Login() {
  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
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
        <div className="flex items-center justify-center w-64 h-24 shadow-xl rounded-3xl  ">
          <button className="px-4 py-2 border-2 flex gap-2  hover:bg-sky-700/20 hover:shadow transition duration-150">
            <Image
              className=""
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
              width={25}
              height={25}
            />
            <span>Login with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}
