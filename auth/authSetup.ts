import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { prisma } from '@/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 30,
  },
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? 'user', ...profile };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.googleId = profile.sub;
        token.picture = profile.picture;
      }

      if (token.googleId) {
        const dbUser = await prisma.user.findUnique({
          where: { googleId: token.googleId as string },
        });

        if (!dbUser) {
          return {};
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (!token.googleId) {
        return session;
      }

      const dbUser = await prisma.user.findUnique({
        where: { googleId: token.googleId as string },
      });
      if (!dbUser) {
        return session;
      }

      session.user.id = dbUser?.id.toString();
      session.user.role = dbUser?.role ?? 'student';
      session.user.isRegistered = !!dbUser;
      session.user.googleId = token.googleId as string;
      session.user.image = token.picture;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
