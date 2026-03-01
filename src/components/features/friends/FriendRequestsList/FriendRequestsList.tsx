import {
  type FriendshipWithFriend,
  getFriendshipsForUser,
} from '@/app/actions/friendships';
import { FriendshipStatus } from '@/generated/prisma/enums';

import CancelFriendRequestButton from '@/components/features/friends/CancelFriendRequestButton';
import AcceptFriendRequestButton from '@/components/features/friends/AcceptFriendRequestButton';
import RejectFriendRequestButton from '@/components/features/friends/RejectFriendRequestButton';
import Section from '@/components/ui/Section';
import Link from 'next/link';

import styles from './friend-requests-list.module.scss';

async function FriendRequestsList({ userId }: { userId: string }) {
  const currentUserId = userId;
  const allFriendships = await getFriendshipsForUser(userId);

  const sentFriendRequests = allFriendships.filter(
    (f: FriendshipWithFriend) =>
      f.userId === currentUserId && f.status === FriendshipStatus.PENDING,
  );
  const receivedFriendRequests = allFriendships.filter(
    (f: FriendshipWithFriend) =>
      f.friendId === currentUserId && f.status === FriendshipStatus.PENDING,
  );

  return (
    <div className={styles.wrapper}>
      {receivedFriendRequests.length > 0 && (
        <Section>
          <h3>Friend requests (received)</h3>
          <ul>
            {receivedFriendRequests.map((friendship: FriendshipWithFriend) => {
              return (
                <li key={friendship.id}>
                  <Link href={`/users/${friendship.user.username}`}>
                    {friendship.user.username}
                  </Link>
                  <AcceptFriendRequestButton friendshipId={friendship.id} />
                  <RejectFriendRequestButton friendshipId={friendship.id} />
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {sentFriendRequests.length > 0 && (
        <Section>
          <h3>Friend requests (sent)</h3>
          <ul>
            {sentFriendRequests.map((friendship: FriendshipWithFriend) => {
              return (
                <li key={friendship.id}>
                  <Link href={`/users/${friendship.friend.username}`}>
                    {friendship.friend.username}
                  </Link>
                  <CancelFriendRequestButton friendshipId={friendship.id} />
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </div>
  );
}

export default FriendRequestsList;
