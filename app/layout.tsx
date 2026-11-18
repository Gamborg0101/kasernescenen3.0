import './globals.css';

import { Navbar } from '@/components/misc/Navbar';
import localFont from 'next/font/local';

const roboto = localFont({
  src: [
    {
      path: './fonts/roboto/static/roboto-latin-400-normal.woff2', weight: '400', style: 'normal'
    },
    {
      path: './fonts/roboto/static/roboto-latin-500-normal.woff2', weight: '500', style: 'normal',
    },
    {
      path: './fonts/roboto/static/roboto-latin-700-normal.woff2', weight: '700', style: 'normal'
    }
  ],
  display: 'swap'
})

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
