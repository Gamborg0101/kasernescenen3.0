import { signIn } from '@/auth/authSetup';
import Image from 'next/image';

export function Login() {
  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <div className="grid grid-cols-2 gap-32">
          <div>
            <h1 className="text-2xl">Velkommen til Kasernescenen</h1>
            <p>
              Dette er hjemmesiden, som kan bruges af studerende på kasernen til
              at booke lokaler.{' '}
            </p>
            <p>Musikvidenskabsstuderende kan booke til øvelokalerne</p>
            <p>Dramaturgistuderende kan book lille sal</p>
            <p>Øvrige studerende kan booke lokaler i læsesalen </p>
          </div>

          <div>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Log ind
            </h2>

            <div className="flex items-center justify-center w-106 h-126 shadow-xl rounded-3xl  ">
              <button className="px-4 py-2 border-2 flex gap-2  hover:bg-sky-700/20 hover:shadow transition duration-150">
                <Image
                  className=""
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                  width={25}
                  height={25}
                />
                <span>Login with Google </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
