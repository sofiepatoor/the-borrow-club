import type { User, LoanRequest } from '@/generated/prisma/client';
import type { ItemWithOwnerAndDetails } from '@/types/items';

export type LoanRequestWithRelations = LoanRequest & {
  item: ItemWithOwnerAndDetails;
  requester: User;
  owner: User;
};

type LoanRequestsListProps = {
  loanRequests: LoanRequestWithRelations[];
};

import styles from './loan-requests-list.module.scss';

function LoanRequestsList({ loanRequests }: LoanRequestsListProps) {
  if (loanRequests.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {loanRequests.map((loanRequest) => (
          <li key={loanRequest.id}>
            <p>
              <strong>{loanRequest.item.title}</strong>
            </p>
            <p>Requested by: {loanRequest.requester.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoanRequestsList;
