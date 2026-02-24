import type { ItemWithOwnerAndDetails } from '@/types/items';
import ItemCard from '@/components/ui/ItemCard';

import styles from './items-grid.module.scss';

type ItemsGridProps = {
  items: ItemWithOwnerAndDetails[];
  currentUserId: string;
};

function ItemsGrid({ items, currentUserId }: ItemsGridProps) {
  if (items.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.id}>
            <ItemCard item={item} currentUserId={currentUserId} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsGrid;
