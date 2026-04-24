import Image from 'next/image';
import aulogo from '../../public/aulogo.png';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className="flex h-full items-center justify-center w-46 ">
      <Link href={'/'}>
        <Image src={aulogo} style={{ background: 'none' }} alt="Aarhus University logo" width={150} height={150} />
      </Link>
    </div>
  );
}
