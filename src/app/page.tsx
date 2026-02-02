import { auth } from '@/auth';

import { SignInButton } from '@/components/Button/signInButton';
import { SignOutButton } from '@/components/Button/signOutButton';
import ItemsList from '@/components/ItemsList';
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

      <p>Signed in as: {session.user?.email}</p>
      <SignOutButton />

      <h2>My library</h2>
      <ItemsList />

      <h3>Add item</h3>
      <AddItemForm />
    </div>
  );
}
