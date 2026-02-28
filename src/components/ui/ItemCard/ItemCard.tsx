'use client';

import type { ItemWithOwnerAndDetails } from '@/types/items';
import Link from 'next/link';
import ItemImage from '@/components/features/library/ItemImage';

type ItemCardProps = {
  item: ItemWithOwnerAndDetails;
  currentUserId: string;
};

import styles from './item-card.module.scss';

function ItemCard({ item, currentUserId }: ItemCardProps) {
  const { title, owner } = item;
  const isOwner = owner?.id === currentUserId;

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemImgWrapper}>
        <ItemImage item={item} className={styles.itemImg} />
      </div>
      <div className={styles.itemContent}>
        <p>
          <strong>{title}</strong>
        </p>
        <p>Owned by: {isOwner ? 'You' : owner?.username}</p>
        {/* <p>Type: {ITEM_TYPE_LABELS[item.itemType]}</p> */}
        <Link href={`/library/${item.id}`} className={styles.itemLink}>
          <span className="vh">View item</span>
        </Link>
      </div>
    </div>
  );
}

export default ItemCard;
