import { getCurrentUserId } from '@/auth';
import { type ItemWithOwnerAndDetails } from '@/types/items';
import { getItemByIdForUser } from '@/app/actions/items';
import { getLoansForItem } from '@/app/actions/loans';
import { getLoanRequestsForItem } from '@/app/actions/loan-requests';
import { ITEM_TYPE_LABELS } from '@/lib/item-types';

import Container from '@/components/ui/Container';
import { notFound } from 'next/navigation';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Button from '@/components/ui/Button';
import ItemImage from '@/components/features/library/ItemImage';
import ItemImageUpload from '@/components/features/library/ItemImageUpload';
import EditItemModal from '@/components/features/library/EditItemModal';
import RequestLoanButton from '@/components/features/loans/RequestLoanButton';
import ReturnLoanButton from '@/components/features/loans/ReturnLoanButton';
import LoansList from '@/components/features/loans/LoansList';
import LoanRequestsList from '@/components/features/loans/LoanRequestsList';
import Section from '@/components/ui/Section';

import styles from './item-page.module.scss';
import LoanCard from '@/components/ui/LoanCard';

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return <p>You must be signed in to view this page.</p>;
  }

  const { id } = await params;
  const item = (await getItemByIdForUser(
    parseInt(id, 10),
    userId,
  )) as ItemWithOwnerAndDetails;
  if (!item) {
    return notFound();
  }

  const isOwnItem = item.ownerId === userId;
  const loans = await getLoansForItem(item.id);
  const activeLoan = loans.find((l) => !l.endedAt);
  const pastLoans = loans.filter((l) => l.endedAt);
  const loanRequestsForItem = await getLoanRequestsForItem(item.id);
  const isBorrower = activeLoan?.requesterId === userId;

  return (
    <div>
      <Container>
        <Link href="/library" className={styles.returnLink}>
          <ArrowLeftIcon />
          Back to library
        </Link>
        <h1>{item.title}</h1>

        <div className={styles.contentWrapper}>
          <div className={styles.sidebar}>
            <ItemImage item={item} className={styles.itemImg} />
            <p>
              Owned by: <strong>{item.owner?.email}</strong>
            </p>
            <p>Type: {ITEM_TYPE_LABELS[item.itemType]}</p>
            <p>
              Added on:{' '}
              {item.createdAt.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                timeZone: 'CET',
              })}
            </p>

            <div className={styles.itemActions}>
              {isOwnItem ? (
                <>
                  <ItemImageUpload item={item} />
                  <EditItemModal userId={userId} item={item}>
                    <Button>Edit item</Button>
                  </EditItemModal>
                </>
              ) : item.isAvailable ? (
                <RequestLoanButton
                  itemId={item.id}
                  ownerId={item.ownerId}
                  className={styles.loanActionButton}
                />
              ) : isBorrower ? (
                <ReturnLoanButton
                  loanId={activeLoan.id}
                  className={styles.loanActionButton}
                />
              ) : (
                <p>This item is currently unavailable</p>
              )}
            </div>
          </div>

          <div className={styles.main}>
            <Card>
              <h2>Details</h2>
              {item.description && (
                <div className="rte">
                  <p>{item.description}</p>
                </div>
              )}

              {item.itemType === 'BOOK' && (
                <>
                  <h2>Book Details</h2>
                  <p>Author: {item.bookDetails?.author}</p>
                  <p>Release year: {item.bookDetails?.releaseYear}</p>
                  <p>Language: {item.bookDetails?.language}</p>
                  <p>Fiction: {item.bookDetails?.fiction ? 'Yes' : 'No'}</p>
                  <p>Genre: {item.bookDetails?.genre?.join(', ')}</p>
                </>
              )}

              {item.itemType === 'MOVIE' && (
                <>
                  <p>Director: {item.movieDetails?.director}</p>
                  <p>Release year: {item.movieDetails?.releaseYear}</p>
                  <p>Genre: {item.movieDetails?.genre?.join(', ')}</p>
                </>
              )}
            </Card>

            <Card>
              <h2>Borrow history</h2>
              <Section>
                <h3>Requests</h3>
                <LoanRequestsList
                  currentUserId={userId}
                  loanRequests={loanRequestsForItem}
                  onItemPage={true}
                />
              </Section>

              {activeLoan && (
                <Section>
                  <h3>Currently borrowed by</h3>
                  <LoanCard
                    currentUserId={userId}
                    loan={activeLoan}
                    onItemPage={true}
                  />
                </Section>
              )}

              <Section>
                <h3>Past loans</h3>
                <LoansList
                  currentUserId={userId}
                  loans={pastLoans}
                  onItemPage={true}
                />
              </Section>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
