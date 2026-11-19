import { auth } from '@/auth/authSetup';
import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { Role } from "@/generated/prisma";

export default auth((request) => {
  const session = request.auth;
  const pathname = request.nextUrl.pathname;

  function nextWithCsp(request: NextRequest) {

    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const isDev = process.env.NODE_ENV === 'development'
    const cspHeader = `
default-src 'self';
script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval' " : ''};
style-src 'self' 'unsafe-inline';
img-src 'self' https://lh3.googleusercontent.com data:;
font-src 'self';
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
`

    const contentSecurityPolicyHeaderValue = cspHeader
      .replace(/\s+/g, ' ')
      .trim()
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue
    )
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    response.headers.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue
    )
    return response
  }

  if (pathname === '/login') {
    return nextWithCsp(request);
  }

  if (!session) {
    if (pathname === '/') return nextWithCsp(request);
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session.user.role !== Role.admin && pathname === '/users') {
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

  return nextWithCsp(request);
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
