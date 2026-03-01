import type { User, Loan } from '@/generated/prisma/client';
import type { ItemWithOwnerAndDetails } from '@/types/items';
import LoanCard from '@/components/ui/LoanCard';

export type LoanWithRelations = Loan & {
  item: ItemWithOwnerAndDetails;
  requester: User;
  owner: User;
};

type LoansListProps = {
  currentUserId: string;
  loans: LoanWithRelations[];
};

import styles from './loans-list.module.scss';

function LoansList({ currentUserId, loans }: LoansListProps) {
  if (loans.length === 0) {
    return <p>Nothing here</p>;
  }

  return (
    <ul className={styles.list}>
      {loans.map((loan) => (
        <li key={loan.id}>
          <LoanCard currentUserId={currentUserId} loan={loan} />
        </li>
      ))}
    </ul>
  );
}

export default LoansList;
