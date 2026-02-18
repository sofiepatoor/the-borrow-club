import type { Item, User } from '@/generated/prisma/client';
import ItemCard from '@/components/ui/ItemCard';
type ItemWithOwner = Item & { owner: User | null };

import styles from './items-list.module.scss';

type ItemsListProps = {
  items: ItemWithOwner[];
  currentUserId: string;
};

function ItemsList({ items, currentUserId }: ItemsListProps) {
  if (items.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <ItemCard item={item} currentUserId={currentUserId} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;
