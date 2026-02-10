import { getCurrentUserId } from '@/auth';
import type { Item, User } from '@/generated/prisma/client';
type ItemWithOwner = Item & { owner: User | null };
import { createLoanRequest } from '@/app/actions/loan-requests';

import Button from '@/components/ui/Button';

import styles from './item-card.module.scss';

async function ItemCard({ item }: { item: ItemWithOwner }) {
  const { title, owner } = item;
  const currentUserId = await getCurrentUserId();
  const isOwner = owner?.id === currentUserId;
  const isAvailable = item.isAvailable;

  return (
    <div className={styles.wrapper}>
      <p>
        <strong>{title}</strong>
      </p>
      <p>Owned by: {owner?.email}</p>
      {!isOwner && isAvailable && (
        <form action={createLoanRequest}>
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="ownerId" value={owner?.id} />
          <Button type="submit">Request loan</Button>
        </form>
      )}
      {!isAvailable && <p>Unavailable</p>}
    </div>
  );
}

export default ItemCard;
