import { auth } from '@/auth/authSetup';
import LogoutBtn from './buttons/LogoutBtn';
import Image from 'next/image';
import aulogo from '../public/aulogo.png';
import Link from 'next/link';

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between h-16 items-center">
      <Logo />

      <ul className="flex font-semibold gap-8 pr-10">
        {session ? (
          <>
            <NavItem text="Min side" href="/userpage" />
            {!session.user.isRegistered && <NavItem text="Registrer" href="/register" />}
            <NavItem text="Booking" href="/booking" />
            <NavItem text="Info" href="/" />
            <LogoutBtn />
            {session?.user?.role === 'admin' && <NavItem text="Brugere" href="/brugere" />}
          </>
        ) : (
          !session && (
            <>
              <NavItem text="Log ind" href="/" />
            </>
          )
        )}
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex h-full items-center justify-center w-46 ">
      <Link href={'/'}>
        <Image src={aulogo} style={{ background: 'none' }} alt="Aarhus University logo" width={150} height={150} />
      </Link>
    </div>
  );
}

export function NavItem({ text, href, type }: { text: string; href: string; type?: 'button' | 'submit' }) {
  return (
    <div>
      <li>
        <button type={type}>
          <Link
            href={href}
            className="flex justify-center items-center transition delay-75 duration-150 ease-in-out hover:bg-amber-700 h-16 p-5"
          >
            {text}
          </Link>
        </button>
      </li>
    </div>
  );
}
