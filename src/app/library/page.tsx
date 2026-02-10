import { getCurrentUserId } from '@/auth';
import { getVisibleItemsForUser } from '../actions/items';
import {
  getReceivedLoanRequestsForUser,
  getSentLoanRequestsForUser,
  acceptLoanRequest,
  rejectLoanRequest,
  cancelLoanRequest,
} from '../actions/loan-requests';

import Link from 'next/link';
import AddItemForm from '@/components/features/library/AddItemForm';
import ItemsList from '@/components/features/library/ItemsList';

import styles from './library-page.module.scss';
import Button from '@/components/ui/Button';

export default async function LibraryPage() {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const items = await getVisibleItemsForUser(userId);
  const sentLoanRequests = await getSentLoanRequestsForUser(userId!);
  const receivedLoanRequests = await getReceivedLoanRequestsForUser(userId!);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>My library</h1>
      <p>
        <Link href="/">Back to home</Link>
      </p>

      <div className={styles.content}>
        <section className={styles.librarySection}>
          <h2>My items</h2>
          <ItemsList items={items} />
        </section>

        <section className={styles.addItemSection}>
          <h2>Add item</h2>
          <AddItemForm />
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
        </section>
      </div>
    </div>
  );
}
