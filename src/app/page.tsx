import { auth } from '@/auth';

import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { SignInButton } from '@/components/ui/Button/signInButton';
import { SignOutButton } from '@/components/ui/Button/signOutButton';
import FriendsList from '@/components/features/friends/FriendsList';

// import styles from './homepage.module.scss';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div>
        <Container>
          <h1>The Borrow Club</h1>
          <SignInButton />
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <h1>The Borrow Club</h1>

        <Section>
          <p>Signed in as: {session.user?.email}</p>
          <SignOutButton />
        </Section>
        <Section>
          <h2>Users</h2>
          <FriendsList />
        </Section>

        <Section>
          <h2>My library</h2>
          <Link href="/library">View my library</Link>
        </Section>
      </Container>
    </div>
  );
}
