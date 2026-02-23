import { auth } from '@/auth/authSetup';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const session = req.auth;
  const isLoggedIn = !!session;
  const isRegistered = session?.user?.isRegistered;
  const path = req.nextUrl.pathname;

  // Ikke logget ind → send til login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Logget ind men ikke registreret → send til registrering
  if (!isRegistered && path !== '/register') {
    return NextResponse.redirect(new URL('/register', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
