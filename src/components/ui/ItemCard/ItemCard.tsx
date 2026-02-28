'use client';

import type { ItemWithOwnerAndDetails } from '@/types/items';
import Card from '@/components/ui/Card';
import { ITEM_TYPE_LABELS } from '@/lib/item-types';
import Link from 'next/link';

type ItemCardProps = {
  item: ItemWithOwnerAndDetails;
  currentUserId: string;
};

// import styles from './item-card.module.scss';

function ItemCard({ item, currentUserId }: ItemCardProps) {
  const { title, owner, isAvailable, createdAt } = item;
  const isOwner = owner?.id === currentUserId;

  return (
    <Card>
      <p>
        <strong>{title}</strong>
      </p>
      <p>Owned by: {isOwner ? 'You' : owner?.email}</p>
      <p>Type: {ITEM_TYPE_LABELS[item.itemType]}</p>
      <p>
        Added on:{' '}
        {createdAt.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          timeZone: 'CET',
        })}
      </p>
      {/* {!isOwner && isAvailable && (
        <form action={createLoanRequest}>
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="ownerId" value={owner?.id} />
          <Button type="submit">Request loan</Button>
        </form>
      )} */}
      {!isAvailable && <p>Unavailable</p>}
      <Link href={`/library/${item.id}`}>View item</Link>
    </Card>
  );
}

export default ItemCard;
