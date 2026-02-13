import { signOut } from '@/auth';
import { redirect } from 'next/navigation';
import Button from './Button';

async function signOutAction() {
  'use server';
  try {
    await signOut({ redirect: false });
  } catch {
    // If signOut fails (e.g. no session), still send user to sign-in
  }
  redirect('/api/auth/signin');
}

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button type="submit">Sign out</Button>
    </form>
  );
}
