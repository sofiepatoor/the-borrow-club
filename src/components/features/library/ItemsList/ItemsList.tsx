import type { Item, User } from '@/generated/prisma/client';
import styles from './items-list.module.scss';

type ItemWithOwner = Item & { owner: User | null };

async function ItemsList({ items }: { items: ItemWithOwner[] }) {
  if (items.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <div className={styles.wrapper}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>
              <strong>{item.title}</strong>
            </p>
            <p>Owned by: {item.owner?.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;
