export { auth as proxy } from '@/auth/authSetup';

// export const config = {
//   matcher: ['/((?!api|_next/static|opret|_next/image|favicon.ico).*)'],
// };

export const config = {
  matcher: ['/booking', '/brugere'],
};
