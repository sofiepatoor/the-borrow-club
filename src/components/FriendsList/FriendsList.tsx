import { auth } from '@/auth';
import { User } from 'next-auth';
import {
  createFriendship,
  findFriendship,
  deleteFriendship,
  type FriendshipWithFriend,
  getFriendshipsForUser,
  getReceivedFriendRequests,
  getSentFriendshipRequests,
  acceptFriendship,
} from '@/app/actions/friendships';
import { getAllUsersExceptCurrent } from '@/app/actions/users';

import styles from './friends-list.module.scss';
import Button from '../Button/Button';
import { FriendshipStatus } from '@/generated/prisma/enums';

async function FriendsList() {
  const session = await auth();
  const currentUserId = session?.user?.id ?? '';

  const [otherUsers, receivedFriendRequests, sentFriendRequests, friends] =
    await Promise.all([
      getAllUsersExceptCurrent(currentUserId),
      currentUserId ? getReceivedFriendRequests(currentUserId) : [],
      currentUserId ? getSentFriendshipRequests(currentUserId) : [],
      currentUserId
        ? getFriendshipsForUser(currentUserId, FriendshipStatus.ACCEPTED)
        : [],
    ]);

  return (
    <div className={styles.wrapper}>
      <p>
        <strong>All users</strong>
      </p>
      <ul>
        {otherUsers.map(async (user: User) => {
          const friendship = await findFriendship(user.id ?? '');
          return (
            <li key={user.id}>
              <div>{user.email}</div>
              {!friendship && (
                <form action={createFriendship}>
                  <input type="hidden" name="userId" value={currentUserId} />
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
