import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { prisma } from '@/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.googleId = profile.sub; // Google's unikke id
      }
      return token;
    },
    async session({ session, token }) {
      // Find brugeren i din database
      const dbUser = await prisma.user.findUnique({
        where: { googleId: token.googleId as string },
      });
      session.user.id = dbUser?.id.toString() ?? '';
      session.user.isRegistered = !!dbUser;
      session.user.googleId = token.googleId as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
