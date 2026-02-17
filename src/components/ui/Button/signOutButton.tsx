import { signOutAction } from '@/app/actions/auth';
import Button from './Button';

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button type="submit">Sign out</Button>
    </form>
  );
}
