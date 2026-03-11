import { signOut } from '@/auth/authSetup';
import { NavItem } from '../Navbar';

export default function LogoutBtn() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <NavItem text="Log ud" href="/login" type="submit" />
    </form>
  );
}
