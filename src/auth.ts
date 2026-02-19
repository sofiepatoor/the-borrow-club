import NextAuth from 'next-auth';
import authConfig from './auth.config';
import type { AdapterUser } from '@auth/core/adapters';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { generateUsernameFromEmail } from '@/lib/username';
import Resend from 'next-auth/providers/resend';

const { callbacks: authConfigCallbacks, ...restAuthConfig } = authConfig;

const baseAdapter = PrismaAdapter(
  prisma as unknown as Parameters<typeof PrismaAdapter>[0],
);

const adapter = {
  ...baseAdapter,
  createUser: async (user: AdapterUser) => {
    const username = await generateUsernameFromEmail(user.email ?? '');
    return baseAdapter.createUser!({
      ...user,
      username,
    } as AdapterUser);
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...restAuthConfig,
  adapter,
  session: { strategy: 'jwt' },
  callbacks: {
    ...authConfigCallbacks,
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
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

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user ?? null;
};
