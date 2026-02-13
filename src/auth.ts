import NextAuth from 'next-auth';
import authConfig from './auth.config';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Resend from 'next-auth/providers/resend';

const { callbacks: authConfigCallbacks, ...restAuthConfig } = authConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...restAuthConfig,
  adapter: PrismaAdapter(
    prisma as unknown as Parameters<typeof PrismaAdapter>[0],
  ),
  session: { strategy: 'jwt' },
  callbacks: {
    ...authConfigCallbacks,
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    ...(authConfig.providers ?? []),
    Resend({
      from: 'The Borrow Club <noreply@mail.sofiepatoor.be>',
    }),
  ],
});

export const getCurrentUserId = async () => {
  const session = await auth();
  return session?.user?.id ?? null;
};
