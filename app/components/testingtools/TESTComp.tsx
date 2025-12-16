import { ThisIsInfo } from './TESTInfo';

export default function NavBar() {
  const whatIsWannaPlusWith = 5;

  return (
    <div>
      <ThisIsInfo plusWith={whatIsWannaPlusWith} />
      <p>This is my test</p>
    </div>
  );
}
