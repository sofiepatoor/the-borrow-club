import { getCurrentUserId } from '@/auth';
import { type ItemWithOwnerAndDetails } from '@/types/items';
import { getItemByIdForUser } from '@/app/actions/items';
import { getLoansForItem } from '@/app/actions/loans';
import { ITEM_TYPE_LABELS } from '@/lib/item-types';

import Container from '@/components/ui/Container';
import { notFound } from 'next/navigation';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Button from '@/components/ui/Button';
import ItemImage from '@/components/features/library/ItemImage';
import ItemImageUpload from '@/components/features/library/ItemImageUpload';
import EditItemButton from '@/components/features/library/EditItemButton';

import styles from './item-page.module.scss';

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
                  <EditItemButton userId={userId} item={item} />
                </>
              ) : (
                <Button>Ask to borrow</Button>
              )}
            </div>
          </div>

          <div className={styles.main}>
            <Card>
              <h2>Details</h2>
              {item.description && (
                <>
                  <p>{item.description}</p>
                </>
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
              <ul>
                {loans.map((loan) => (
                  <li key={loan.id}>
                    <p>
                      Borrowed by:{' '}
                      {loan.requester.name ?? loan.requester.username}
                    </p>
                    <p>
                      Started at:{' '}
                      {loan.startedAt.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        timeZone: 'CET',
                      })}
                    </p>
                    <p>
                      Ended at:{' '}
                      {loan.endedAt?.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        timeZone: 'CET',
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
