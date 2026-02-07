import { auth } from '@/auth';
import {
  createFriendship,
  deleteFriendship,
  type FriendshipWithFriend,
  getFriendshipsForUser,
  acceptFriendship,
} from '@/app/actions/friendships';
import { getAllUsersExceptCurrent } from '@/app/actions/users';
import { type User } from '@/generated/prisma/client';
import { FriendshipStatus } from '@/generated/prisma/enums';

import styles from './friends-list.module.scss';
import Button from '../Button/Button';

async function FriendsList() {
  const session = await auth();
  const currentUserId = session?.user?.id ?? '';

  const otherUsers = await getAllUsersExceptCurrent(currentUserId);
  const allFriendships = await getFriendshipsForUser(currentUserId);

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
              <div>{user.email}</div>
              {!hasRelationship && (
                <form action={createFriendship}>
                  <input type="hidden" name="friendId" value={user.id} />
                  <Button type="submit">Add friend</Button>
                </form>
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
              {friendship.user.email}
              <form action={acceptFriendship}>
                <input
                  type="hidden"
                  name="friendshipId"
                  value={friendship.id}
                />
                <Button type="submit">Accept</Button>
              </form>
              <form action={deleteFriendship}>
                <input
                  type="hidden"
                  name="friendshipId"
                  value={friendship.id}
                />
                <Button type="submit">Reject</Button>
              </form>
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
              {friendship.friend.email}
              <form action={deleteFriendship}>
                <input
                  type="hidden"
                  name="friendshipId"
                  value={friendship.id}
                />
                <Button type="submit">Cancel request</Button>
              </form>
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
                <span>{friendship.friend.email}</span>
              ) : (
                <span>{friendship.user.email}</span>
              )}
              <form action={deleteFriendship}>
                <input
                  type="hidden"
                  name="friendshipId"
                  value={friendship.id}
                />
                <Button type="submit">Remove friend</Button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FriendsList;
