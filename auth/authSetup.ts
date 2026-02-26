import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { prisma } from '@/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? 'user', ...profile };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { googleId: user.id },
      });

      session.user.id = dbUser?.id.toString() ?? '';
      session.user.role = dbUser?.role ?? 'student';
      session.user.isRegistered = !!dbUser;
      session.user.googleId = user.id;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
