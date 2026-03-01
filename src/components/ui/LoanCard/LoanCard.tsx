'use client';

import type { LoanWithRelations } from '@/app/actions/loans';
import ItemImage from '@/components/features/library/ItemImage';
import Link from 'next/link';

type LoanCardProps = {
  currentUserId: string;
  loan: LoanWithRelations;
};

import styles from './loan-card.module.scss';

function LoanCard({ currentUserId, loan }: LoanCardProps) {
  const { item, owner, requester, startedAt, endedAt } = loan;
  const isOwnerOfItem = owner?.id === currentUserId;

  return (
    <div className={styles.loanCard}>
      <div className={styles.itemDetails}>
        <ItemImage item={item} className={styles.itemImage} />
        <div>
          <Link href={`/library/${item.id}`} className={styles.itemLink}>
            {item.title}
          </Link>
          {isOwnerOfItem ? (
            <p>
              Borrowed by:{' '}
              <Link href={`/users/${requester.id}`} className={styles.userLink}>
                {requester.name ? requester.name : requester.username}
              </Link>
            </p>
          ) : (
            <p>
              Owner:{' '}
              <Link href={`/users/${owner.id}`} className={styles.userLink}>
                {owner.name ? owner.name : owner.username}
              </Link>
            </p>
          )}
          <p>
            Since:{' '}
            {startedAt.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              timeZone: 'CET',
            })}
          </p>
          {endedAt && (
            <p>
              Ended at:{' '}
              {endedAt.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                timeZone: 'CET',
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanCard;
