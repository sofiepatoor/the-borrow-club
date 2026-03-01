'use client';

import type { LoanRequestWithRelations } from '@/app/actions/loan-requests';
import ItemImage from '@/components/features/library/ItemImage';
import AcceptLoanRequestButton from '@/components/features/loans/AcceptLoanRequestButton';
import RejectLoanRequestButton from '@/components/features/loans/RejectLoanRequestButton';
import CancelLoanRequestButton from '@/components/features/loans/CancelLoanRequestButton';

type LoanRequestCardProps = {
  currentUserId: string;
  loanRequest: LoanRequestWithRelations;
  onItemPage?: boolean;
};

import styles from './loan-request-card.module.scss';
import Link from 'next/link';

function LoanRequestCard({
  currentUserId,
  loanRequest,
  onItemPage = false,
}: LoanRequestCardProps) {
  const { item, requester, owner } = loanRequest;
  const isOwnerOfItem = owner?.id === currentUserId;

  return (
    <div className={styles.loanRequestCard}>
      {isOwnerOfItem ? (
        <p>
          <Link href={`/users/${requester.id}`} className={styles.userLink}>
            {requester.name ? requester.name : requester.username}
          </Link>{' '}
          wants to borrow{onItemPage ? ' this item' : ':'}
        </p>
      ) : (
        <p>You asked to borrow{onItemPage ? ' this item' : ':'}</p>
      )}

      {!onItemPage && (
        <div className={styles.itemDetails}>
          <ItemImage item={item} className={styles.itemImage} />
          <Link href={`/library/${item.id}`} className={styles.itemLink}>
            {item.title}
          </Link>
        </div>
      )}

      <div className={styles.buttons}>
        {isOwnerOfItem ? (
          <>
            <AcceptLoanRequestButton loanRequestId={loanRequest.id} />
            <RejectLoanRequestButton loanRequestId={loanRequest.id} />
          </>
        ) : (
          <CancelLoanRequestButton loanRequestId={loanRequest.id} />
        )}
      </div>
    </div>
  );
}

export default LoanRequestCard;
