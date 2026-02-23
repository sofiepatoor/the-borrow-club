import type { User, Loan } from '@/generated/prisma/client';
import type { ItemWithOwnerAndDetails } from '@/types/items';

export type LoanWithRelations = Loan & {
  item: ItemWithOwnerAndDetails;
  requester: User;
  owner: User;
};

type LoansListProps = {
  loans: LoanWithRelations[];
};

import styles from './loans-list.module.scss';

function LoansList({ loans }: LoansListProps) {
  if (loans.length === 0) {
    return <p>Nothing here</p>;
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {loans.map((loan) => (
          <li key={loan.id}>
            <p>
              <strong>{loan.item.title}</strong>
            </p>
            <p>Borrower: {loan.requester.email}</p>
            <p>Owner: {loan.owner.email}</p>
            <p>Started at: {loan.startedAt.toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoansList;
