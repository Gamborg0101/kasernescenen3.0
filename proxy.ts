import { auth } from '@/auth/authSetup';
import { NextResponse } from 'next/server';

export default auth((request) => {
  const session = request.auth;
  const pathname = request.nextUrl.pathname;

  // Ikke logget ind → send til /
  if (!session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Logget ind men ikke registreret → send til registrering
  if (!session.user.isRegistered && pathname !== '/register') {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  // Du kan ikke se users liste, medmindre du er admin
  if (session.user.role !== 'admin' && pathname == '/users') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|$).*)'],
};
