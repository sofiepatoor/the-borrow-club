import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export default {
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      // Redirect unauthenticated users to sign-in (proxy matcher excludes /api/auth, so no loop)
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/api/auth/signin', request.url));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
