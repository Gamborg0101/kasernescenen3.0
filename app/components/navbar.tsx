export function Navbar() {
  return (
    <nav className="flex justify-between h-16 bg-amber-200 items-center">
      <Logo />
      <ul className="flex gap-16 pr-10">
        <NavItem text="Forside" />
        <NavItem text="Booking" />
        <NavItem text="Log ind / ud" />
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex bg-gray-400 h-full items-center justify-center w-32">
      <img src="#" alt="" />
      <p>Test test </p>
    </div>
  );
}

function NavItem({ text }: { text: string }) {
  return (
    <div>
      <a href="#">{text}</a>
    </div>
  );
}
