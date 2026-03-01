import type { LoanWithRelations } from '@/app/actions/loans';
import LoanCard from '@/components/ui/LoanCard';

export type { LoanWithRelations };

type LoansListProps = {
  currentUserId: string;
  loans: LoanWithRelations[];
  onItemPage?: boolean;
};

import styles from './loans-list.module.scss';

function LoansList({
  currentUserId,
  loans,
  onItemPage = false,
}: LoansListProps) {
  if (loans.length === 0) {
    return <p>Nothing here</p>;
  }

  return (
    <ul className={styles.list}>
      {loans.map((loan) => (
        <li key={loan.id}>
          <LoanCard
            currentUserId={currentUserId}
            loan={loan}
            onItemPage={onItemPage}
          />
        </li>
      ))}
    </ul>
  );
}

export default LoansList;
