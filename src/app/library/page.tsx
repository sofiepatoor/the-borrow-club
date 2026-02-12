import { getCurrentUserId } from '@/auth';
import { getVisibleItemsForUser } from '../actions/items';
import {
  getReceivedLoanRequestsForUser,
  getSentLoanRequestsForUser,
  acceptLoanRequest,
  rejectLoanRequest,
  cancelLoanRequest,
} from '../actions/loan-requests';
import { getLoansForUser, returnLoan } from '../actions/loans';

import Link from 'next/link';
import AddItemForm from '@/components/features/library/AddItemForm';
import ItemsList from '@/components/features/library/ItemsList';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

import styles from './library-page.module.scss';
import Section from '@/components/ui/Section';

export default async function LibraryPage() {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const items = await getVisibleItemsForUser(userId);
  const sentLoanRequests = await getSentLoanRequestsForUser(userId!);
  const receivedLoanRequests = await getReceivedLoanRequestsForUser(userId!);
  const loans = await getLoansForUser(userId!);
  const activeLoans = loans.filter((loan) => !loan.endedAt);
  const completedLoans = loans.filter((loan) => loan.endedAt);

  return (
    <div className={styles.page}>
      <Container>
        <h1>My library</h1>
        <p>
          <Link href="/">Back to home</Link>
        </p>

        <Section className={styles.librarySection}>
          <h2>My items</h2>
          <ItemsList items={items} />
        </Section>

        <Section className={styles.addItemSection}>
          <h2>Add item</h2>
          <AddItemForm />
        </Section>

        <Section>
          <h2>Sent loan requests</h2>
          <ul>
            {sentLoanRequests.map((request) => (
              <li key={request.id}>
                <p>{request.item.title}</p>
                <p>{request.owner.email}</p>
                <form action={cancelLoanRequest}>
                  <input
                    type="hidden"
                    name="loanRequestId"
                    value={request.id}
                  />
                  <Button type="submit">Cancel</Button>
                </form>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <h2>Received loan requests</h2>
          <ul>
            {receivedLoanRequests.map((request) => (
              <li key={request.id}>
                <p>{request.item.title}</p>
                <p>{request.requester.email}</p>
                <form action={acceptLoanRequest}>
                  <input
                    type="hidden"
                    name="loanRequestId"
                    value={request.id}
                  />
                  <Button type="submit">Accept</Button>
                </form>
                <form action={rejectLoanRequest}>
                  <input
                    type="hidden"
                    name="loanRequestId"
                    value={request.id}
                  />
                  <Button type="submit">Reject</Button>
                </form>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <h2>Current loans</h2>
          <ul>
            {activeLoans.map((loan) => (
              <li key={loan.id}>
                <p>
                  <strong>{loan.item.title}</strong>
                </p>
                <p>Borrower: {loan.requester.email}</p>
                <p>Owner: {loan.owner.email}</p>
                <p>Started at: {loan.startedAt.toLocaleDateString()}</p>
                {loan.endedAt && (
                  <p>Ended at: {loan.endedAt.toLocaleDateString()}</p>
                )}
                <form action={returnLoan}>
                  <input type="hidden" name="loanId" value={loan.id} />
                  <Button type="submit">Return</Button>
                </form>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <h2>Completed loans</h2>
          <ul>
            {completedLoans.map((loan) => (
              <li key={loan.id}>
                <p>
                  <strong>{loan.item.title}</strong>
                </p>
                <p>Borrower: {loan.requester.email}</p>
                <p>Owner: {loan.owner.email}</p>
                <p>Started at: {loan.startedAt.toLocaleDateString()}</p>
                <p>Ended at: {loan.endedAt?.toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </div>
  );
}
