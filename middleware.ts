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

  if (session.user.role !== 'admin' && pathname === '/users') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!session.user.id && pathname !== '/register') {
    const registerUrl = new URL('/register', request.url);
    registerUrl.searchParams.set('message', 'Du skal registrere dig før du kan tilgå denne side');
    return NextResponse.redirect(registerUrl);
  }

  if (!session.user.isRegistered && pathname !== '/register') {
    const registerUrl = new URL('/register', request.url);
    registerUrl.searchParams.set('message', 'Du skal registrere dig før du kan tilgå denne side');
    return NextResponse.redirect(registerUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
