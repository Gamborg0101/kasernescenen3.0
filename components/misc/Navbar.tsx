import { auth } from '@/auth/authSetup';
import LogoutBtn from './../buttons/LogoutBtn';
import Logo from './Logo';
import Link from 'next/link';

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between h-16 items-center border-b border-gray-200">
      <Logo />

      <ul className="flex font-semibold gap-8 pr-10 ">
        {session ? (
          <>
            <NavItem text="Min side" href="/userpage" />
            {!session.user.isRegistered && <NavItem text="Registrer" href="/register" />}
            <NavItem text="Booking" href="/booking" />
            <NavItem text="Info" href="/" />
            <LogoutBtn />
            {session?.user?.role === 'admin' && <NavItem text="Adminpanel" href="/adminpanel" />}
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

export function NavItem({ text, href, type }: { text: string; href: string; type?: 'button' | 'submit' }) {
  return (
    <div>
      <li>
        <button type={type}>
          <Link
            href={href}
            className="flex justify-center items-center transition delay-75 duration-150 ease-in-out hover:bg-amber-700 h-16 p-5 select-none"
          >
            {text}
          </Link>
        </button>
      </li>
    </div>
  );
}
