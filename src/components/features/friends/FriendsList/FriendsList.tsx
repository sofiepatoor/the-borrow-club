import {
  type FriendshipWithFriend,
  getFriendshipsForUser,
} from '@/app/actions/friendships';
import { FriendshipStatus } from '@/generated/prisma/enums';
import UserCard from '@/components/ui/UserCard/UserCard';

import styles from './friends-list.module.scss';

async function FriendsList({ userId }: { userId: string }) {
  const currentUserId = userId;
  const allFriendships = await getFriendshipsForUser(userId);
  const friends = allFriendships.filter(
    (f: FriendshipWithFriend) => f.status === FriendshipStatus.ACCEPTED,
  );

  if (friends.length === 0) {
    return <p>You don&apos;t have any friends yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {friends.map((friendship: FriendshipWithFriend) => {
        return (
          <li key={friendship.id}>
            <UserCard
              user={
                friendship.user.id === currentUserId
                  ? friendship.friend
                  : friendship.user
              }
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FriendsList;
