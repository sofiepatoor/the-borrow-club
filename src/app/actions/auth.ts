'use server';

import { signOut } from '@/auth';
import { redirect } from 'next/navigation';

export async function signOutAction() {
  try {
    await signOut({ redirect: false });
  } catch {
    // If signOut fails (e.g. no session), still send user to sign-in
  }
  redirect('/api/auth/signin');
}
