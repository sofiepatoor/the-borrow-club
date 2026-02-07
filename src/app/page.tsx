import { auth } from '@/auth';

import { SignInButton } from '@/components/Button/signInButton';
import { SignOutButton } from '@/components/Button/signOutButton';
import ItemsList from '@/components/ItemsList';
import FriendsList from '@/components/FriendsList';
import AddItemForm from '@/components/AddItemForm';

import styles from './homepage.module.scss';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div className={styles.wrapper}>
        <h1>The Borrow Club</h1>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1>The Borrow Club</h1>

      <section className={styles.section}>
        <p>Signed in as: {session.user?.email}</p>
        <SignOutButton />
      </section>

      <section className={styles.section}>
        <h2>Users</h2>
        <FriendsList />
      </section>

      <section className={styles.section}>
        <h2>My library</h2>
        <ItemsList />
      </section>

      <section className={styles.section}>
        <h3>Add item</h3>
        <AddItemForm />
      </section>
    </div>
  );
}
