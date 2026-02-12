import { auth } from '@/auth';

import Container from '@/components/ui/Container';
import Link from 'next/link';
import { SignInButton } from '@/components/ui/Button/signInButton';
import { SignOutButton } from '@/components/ui/Button/signOutButton';
import FriendsList from '@/components/features/friends/FriendsList';

import styles from './homepage.module.scss';

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
    <div className={styles.wrapper}>
      <Container>
        <h1>The Borrow Club</h1>

        <section>
          <p>Signed in as: {session.user?.email}</p>
          <SignOutButton />
          <h2>Users</h2>
          <FriendsList />
        </section>

        <section>
          <h2>My library</h2>
          <Link href="/library">View my library</Link>
        </section>
      </Container>
    </div>
  );
}
