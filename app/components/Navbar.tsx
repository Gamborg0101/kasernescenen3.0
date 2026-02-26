import { auth, signOut } from '@/auth/authSetup';
import { prisma } from '@/db';
import LogoutBtn from './buttons/LogoutBtn';

export async function Navbar() {
  const session = await auth();

  //Skal bruges til at lave role check
  const userRole = session
    ? await prisma.user.findFirst({
        where: {
          id: Number(session?.user.id),
        },
      })
    : null;

  return (
    <nav className="flex justify-between h-16 bg-amber-200 items-center">
      <Logo />

      <ul className="flex font-semibold gap-8 pr-10">
        {session ? (
          <>
            <NavItem text="Min side" href="/userpage" />
            <NavItem text="Booking" href="/booking" />
            <LogoutBtn />
            {userRole?.role === 'admin' && (
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
