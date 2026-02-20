import {
  type FriendshipWithFriend,
  getFriendshipsForUser,
} from '@/app/actions/friendships';
import { getAllUsersExceptCurrent } from '@/app/actions/users';
import { type User } from '@/generated/prisma/client';
import { FriendshipStatus } from '@/generated/prisma/enums';

import AddFriendButton from '@/components/features/friends/AddFriendButton';
import RemoveFriendButton from '@/components/features/friends/RemoveFriendButton';
import CancelFriendRequestButton from '@/components/features/friends/CancelFriendRequestButton';
import AcceptFriendRequestButton from '@/components/features/friends/AcceptFriendRequestButton';
import RejectFriendRequestButton from '@/components/features/friends/RejectFriendRequestButton';
import Link from 'next/link';

import styles from './friends-list.module.scss';

async function FriendsList({ userId }: { userId: string }) {
  const currentUserId = userId;

  const otherUsers = await getAllUsersExceptCurrent(currentUserId);
  const allFriendships = await getFriendshipsForUser(userId);

  const sentFriendRequests = allFriendships.filter(
    (f: FriendshipWithFriend) =>
      f.userId === currentUserId && f.status === FriendshipStatus.PENDING,
  );
  const receivedFriendRequests = allFriendships.filter(
    (f: FriendshipWithFriend) =>
      f.friendId === currentUserId && f.status === FriendshipStatus.PENDING,
  );
  const friends = allFriendships.filter(
    (f: FriendshipWithFriend) => f.status === FriendshipStatus.ACCEPTED,
  );

  const userIdsWithRelationship = new Set([
    ...friends.map((f: FriendshipWithFriend) =>
      f.userId === currentUserId ? f.friendId : f.userId,
    ),
    ...sentFriendRequests.map((f: FriendshipWithFriend) => f.friendId),
    ...receivedFriendRequests.map((f: FriendshipWithFriend) => f.userId),
  ]);

  return (
    <div className={styles.wrapper}>
      <p>
        <strong>All users</strong>
      </p>
      <ul>
        {otherUsers.map((user: User) => {
          const hasRelationship = userIdsWithRelationship.has(user.id ?? '');
          return (
            <li key={user.id}>
              <Link href={`/users/${user.username}`}>{user.username}</Link>
              {!hasRelationship && user.id && (
                <AddFriendButton friendId={user.id} />
              )}
            </li>
          );
        })}
      </ul>

      <p>
        <strong>Friend requests (received)</strong>
      </p>
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

      <p>
        <strong>Friend requests (sent)</strong>
      </p>
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

      <p>
        <strong>My friends</strong>
      </p>
      <ul>
        {friends.map((friendship: FriendshipWithFriend) => {
          return (
            <li key={friendship.id}>
              {friendship.user.id === currentUserId ? (
                <Link href={`/users/${friendship.friend.username}`}>
                  {friendship.friend.username}
                </Link>
              ) : (
                <Link href={`/users/${friendship.user.username}`}>
                  {friendship.user.username}
                </Link>
              )}
              <RemoveFriendButton friendshipId={friendship.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FriendsList;
