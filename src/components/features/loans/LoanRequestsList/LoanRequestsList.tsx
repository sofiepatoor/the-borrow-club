import type { LoanRequestWithRelations } from '@/app/actions/loan-requests';
import LoanRequestCard from '@/components/ui/LoanRequestCard/LoanRequestCard';

export type { LoanRequestWithRelations };

type LoanRequestsListProps = {
  currentUserId: string;
  loanRequests: LoanRequestWithRelations[];
  onItemPage?: boolean;
};

import styles from './loan-requests-list.module.scss';

function LoanRequestsList({
  currentUserId,
  loanRequests,
  onItemPage = false,
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
            onItemPage={onItemPage}
          />
        </li>
      ))}
    </ul>
  );
}

export default LoanRequestsList;
