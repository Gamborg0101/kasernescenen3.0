import { auth } from '@/auth/authSetup';
import LogoutBtn from './buttons/LogoutBtn';

export async function Navbar() {
  const session = await auth();
  //Skal bruges til at lave role check

  return (
    <nav className="flex justify-between h-16 bg-[rgb(55,160,203)]  items-center">
      <Logo />

      <ul className="flex font-semibold gap-8 pr-10">
        {session ? (
          <>
            <NavItem text="Min side" href="/userpage" />
            <NavItem text="Booking" href="/booking" />
            <NavItem text="Info" href="/" />
            <LogoutBtn />
            {session?.user?.role === 'admin' && (
              <NavItem text="Brugere" href="/brugere" />
            )}
          </>
        ) : (
          !session && (
            <>
              <NavItem text="Opret" href="/opret" />
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
    <div className="flex bg-gray-400 h-full items-center justify-center w-32">
      <img src="#" alt="" />
      <p>Logo </p>
    </div>
  );
}

export function NavItem({
  text,
  href,
  type,
}: {
  text: string;
  href?: string;
  type?: 'button' | 'submit';
}) {
  return (
    <div>
      <li>
        <button type={type}>
          <a href={href}>
            <div className="flex justify-center items-center hover:bg-amber-700 h-16 p-5">
              {text}
            </div>
          </a>
        </button>
      </li>
    </div>
  );
}
