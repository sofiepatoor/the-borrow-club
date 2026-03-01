import type { User, LoanRequest } from '@/generated/prisma/client';
import type { ItemWithOwnerAndDetails } from '@/types/items';

import LoanRequestCard from '@/components/ui/LoanRequestCard/LoanRequestCard';

export type LoanRequestWithRelations = LoanRequest & {
  item: ItemWithOwnerAndDetails;
  requester: User;
  owner: User;
};

type LoanRequestsListProps = {
  currentUserId: string;
  loanRequests: LoanRequestWithRelations[];
};

import styles from './loan-requests-list.module.scss';

function LoanRequestsList({
  currentUserId,
  loanRequests,
}: LoanRequestsListProps) {
  if (loanRequests.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <ul className={styles.list}>
      {loanRequests.map((loanRequest) => (
        <li key={loanRequest.id}>
          <LoanRequestCard
            currentUserId={currentUserId}
            loanRequest={loanRequest}
          />
        </li>
      ))}
    </ul>
  );
}

export default LoanRequestsList;
