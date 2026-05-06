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
      return token;
    },

    async session({ session, token }) {
      if (token.googleId) {
        session.user.googleId = token.googleId as string;
      }

      const dbUser = token.googleId
        ? await prisma.user.findUnique({
            where: { googleId: token.googleId as string },
          })
        : null;

      if (!dbUser) {
        session.user.isRegistered = false;
        return session;
      }

      session.user.id = dbUser.id.toString();
      session.user.role = dbUser.role ?? 'student';
      session.user.isRegistered = true;
      session.user.image = token.picture;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
