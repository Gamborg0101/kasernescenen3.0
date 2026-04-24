import './globals.css';

import { Navbar } from '@/components/misc/Navbar';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
