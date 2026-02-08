import { auth } from '@/auth';
import { getVisibleItemsForUser } from '../actions/items';

import Link from 'next/link';
import AddItemForm from '@/components/features/library/AddItemForm';
import ItemsList from '@/components/features/library/ItemsList';

import styles from './library-page.module.scss';

export default async function LibraryPage() {
  const session = await auth();
  const userId = session?.user?.id ?? '';

  const items = await getVisibleItemsForUser(userId);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>My library</h1>
      <p>
        <Link href="/">Back to home</Link>
      </p>

      <div className={styles.content}>
        <section className={styles.librarySection}>
          <h2>My items</h2>
          <ItemsList items={items} />
        </section>

        <section className={styles.addItemSection}>
          <h2>Add item</h2>
          <AddItemForm />
        </section>
      </div>
    </div>
  );
}
