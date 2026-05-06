import { auth } from '@/auth/authSetup';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export default auth((request) => {
  const session = request.auth;
  const pathname = request.nextUrl.pathname;

  if (pathname === '/login') {
    return NextResponse.next();
  }

  if (!session) {
    if (pathname === '/') return NextResponse.next();
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!session.user.id && pathname !== '/register') {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  if (session.user.role !== 'admin' && pathname === '/users') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!session.user.isRegistered && pathname !== '/register') {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
