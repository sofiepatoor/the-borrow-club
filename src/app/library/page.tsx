import { getCurrentUserId } from '@/auth';
import { getVisibleItemsForUser } from '../actions/items';

import Link from 'next/link';
import AddItemForm from '@/components/features/library/AddItemForm';
import ItemsGrid from '@/components/features/library/ItemsGrid';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

import styles from './library-page.module.scss';

export default async function LibraryPage() {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const items = await getVisibleItemsForUser(userId);

  return (
    <div className={styles.page}>
      <Container>
        <h1>My library</h1>

        <Section className={styles.mainContent}>
          <div className={styles.itemsOverview}>
            <h2>My items</h2>
            <ItemsGrid items={items} currentUserId={userId} />
          </div>
          <div className={styles.addItemSection}>
            <h2>Add item</h2>
            <Card>
              <AddItemForm userId={userId} />
            </Card>
          </div>
        </Section>
      </Container>
    </div>
  );
}
