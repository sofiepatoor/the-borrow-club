import { signIn } from '@/auth';
import Button from './Button';

export function SignInButton() {
  return (
    <form
      action={async (formData) => {
        'use server';
        await signIn('resend', formData);
      }}
    >
      <input type="text" name="email" placeholder="Email" />
      <Button type="submit">Sign in</Button>
    </form>
  );
}
