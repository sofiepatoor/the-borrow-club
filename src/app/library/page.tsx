import { getCurrentUserId } from '@/auth';
import { getVisibleItemsForUser } from '../actions/items';

import Link from 'next/link';
import AddItemForm from '@/components/features/library/AddItemForm';
import ItemsGrid from '@/components/features/library/ItemsGrid';
import Container from '@/components/ui/Container';

import styles from './library-page.module.scss';
import Section from '@/components/ui/Section';

export default async function LibraryPage() {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const items = await getVisibleItemsForUser(userId);

  return (
    <div className={styles.page}>
      <Container>
        <h1>My library</h1>
        <p>
          <Link href="/">Back to home</Link>
        </p>

        <Section className={styles.librarySection}>
          <h2>My items</h2>
          <ItemsGrid items={items} currentUserId={userId} />
        </Section>

        <Section className={styles.addItemSection}>
          <h2>Add item</h2>
          <AddItemForm userId={userId} />
        </Section>
      </Container>
    </div>
  );
}
