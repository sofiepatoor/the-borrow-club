import type { ItemWithOwnerAndDetails } from '@/types/items';
import ItemCard from '@/components/ui/ItemCard';

import styles from './items-list.module.scss';

type ItemsListProps = {
  items: ItemWithOwnerAndDetails[];
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
