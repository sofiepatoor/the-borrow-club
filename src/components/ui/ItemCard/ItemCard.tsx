'use client';

import type { Item, User } from '@/generated/prisma/client';

// import Button from '@/components/ui/Button';

type ItemCardProps = {
  item: Item & { owner: User | null };
  currentUserId: string;
};

import styles from './item-card.module.scss';

function ItemCard({ item, currentUserId }: ItemCardProps) {
  const { title, owner, isAvailable, createdAt } = item;
  const isOwner = owner?.id === currentUserId;

  return (
    <div className={styles.itemCard}>
      <p>
        <strong>{title}</strong>
      </p>
      <p>Owned by: {isOwner ? 'You' : owner?.email}</p>
      <p>Added on: {createdAt.toLocaleDateString()}</p>
      {/* {!isOwner && isAvailable && (
        <form action={createLoanRequest}>
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="ownerId" value={owner?.id} />
          <Button type="submit">Request loan</Button>
        </form>
      )} */}
      {!isAvailable && <p>Unavailable</p>}
    </div>
  );
}

export default ItemCard;
