import { auth } from '@/auth';

import { SignInButton } from '@/components/ui/Button/signInButton';
import { SignOutButton } from '@/components/ui/Button/signOutButton';
import FriendsList from '@/components/features/friends/FriendsList';

import styles from './homepage.module.scss';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div className={styles.loginWrapper}>
        <h1>The Borrow Club</h1>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>The Borrow Club</h1>

      <section className={styles.usersSection}>
        <p>Signed in as: {session.user?.email}</p>
        <SignOutButton />
        <h2>Users</h2>
        <FriendsList />
      </section>

      <section className={styles.librarySection}>
        <h2>My library</h2>
        <Link href="/library">View my library</Link>
      </section>
    </div>
  );
}
