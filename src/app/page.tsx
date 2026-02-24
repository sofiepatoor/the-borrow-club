import { getCurrentUser } from '@/auth';

import { getVisibleItemsForUser } from './actions/items';
import { getLoansForUser } from './actions/loans';
import {
  getReceivedLoanRequestsForUser,
  getSentLoanRequestsForUser,
} from './actions/loan-requests';

import Container from '@/components/ui/Container';
import { SignInButton } from '@/components/ui/Button/signInButton';
import ItemsSlider from '@/components/ui/ItemsSlider';
import LoansList, {
  type LoanWithRelations,
} from '@/components/features/loans/LoansList';
import LoanRequestsList, {
  type LoanRequestWithRelations,
} from '@/components/features/loans/LoanRequestsList';

import styles from './homepage.module.scss';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div>
        <Container>
          <h1>The Borrow Club</h1>
          <SignInButton />
        </Container>
      </div>
    );
  }

  const recentlyAddedItems = await getVisibleItemsForUser(user.id, 6);
  const loans = await getLoansForUser(user.id);
  const borrowingItems = loans.filter((loan) => loan.ownerId === user.id);
  const borrowedFromYouItems = loans.filter(
    (loan) => loan.requesterId === user.id,
  );
  const receivedLoanRequests = await getReceivedLoanRequestsForUser(user.id);
  const sentLoanRequests = await getSentLoanRequestsForUser(user.id);

  return (
    <div>
      <Container>
        <h1 className="vh">Dashboard</h1>

        <div className={styles.grid}>
          <div className={styles.recentlyAdded}>
            <h2>Recently added</h2>
            <Button href="/library">Add item</Button>
            <Button href="/library">View all items</Button>
            <ItemsSlider items={recentlyAddedItems} currentUserId={user.id} />
          </div>

          <Card className={styles.currentlyBorrowing}>
            <h2>Currently borrowing</h2>
            <LoansList loans={borrowingItems as LoanWithRelations[]} />

            <h3>Requests</h3>
            <LoanRequestsList
              loanRequests={sentLoanRequests as LoanRequestWithRelations[]}
            />
          </Card>

          <Card className={styles.currentlyBorrowedFromYou}>
            <h2>Borrowed from you</h2>
            <LoansList loans={borrowedFromYouItems as LoanWithRelations[]} />

            <h3>Requests</h3>
            <LoanRequestsList
              loanRequests={receivedLoanRequests as LoanRequestWithRelations[]}
            />
          </Card>
        </div>
      </Container>
    </div>
  );
}
