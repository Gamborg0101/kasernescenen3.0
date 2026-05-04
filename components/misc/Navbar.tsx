import { auth } from '@/auth/authSetup';
import LogoutBtn from './../buttons/LogoutBtn';
import Logo from './Logo';
import Link from 'next/link';

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between h-14 items-center border-b border-stone-100 bg-white px-6">
      <Logo />

      <ul className="flex items-center gap-1">
        {session ? (
          <>
            <NavItem text="Min side" href="/userpage" />
            {!session.user.isRegistered && <NavItem text="Registrer" href="/register" />}
            <NavItem text="Booking" href="/booking" />
            <NavItem text="Info" href="/" />
            {session?.user?.role === 'admin' && <NavItem text="Adminpanel" href="/adminpanel" />}

            {/* Skillelinje før logout */}
            <li className="list-none w-px h-4 bg-stone-200 mx-2" />

            <LogoutBtn />
          </>
        ) : (
          <NavItem text="Log ind" href="/" />
        )}
      </ul>
    </nav>
  );
}

export function NavItem({ text, href, type }: { text: string; href: string; type?: 'button' | 'submit' }) {
  return (
    <li className="list-none">
      <button type={type}>
        <Link
          href={href}
          className="text-sm text-stone-700 hover:text-stone-900 hover:bg-stone-100 px-4 py-2 rounded-xl transition-colors duration-150 font-medium select-none"
        >
          {text}
        </Link>
      </button>
    </li>
  );
}
