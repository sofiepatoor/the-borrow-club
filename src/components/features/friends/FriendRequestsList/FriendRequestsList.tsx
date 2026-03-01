import {
  type FriendshipWithFriend,
  getFriendshipsForUser,
} from '@/app/actions/friendships';
import { FriendshipStatus } from '@/generated/prisma/enums';

import Section from '@/components/ui/Section';
import FriendRequestCard from '@/components/ui/FriendRequestCard/FriendRequestCard';

import styles from './friend-requests-list.module.scss';

async function FriendRequestsList({ userId }: { userId: string }) {
  const currentUserId = userId;
  const allFriendRequests = await getFriendshipsForUser(
    userId,
    FriendshipStatus.PENDING,
  );

  return (
    <div className={styles.wrapper}>
      {allFriendRequests.length > 0 && (
        <Section>
          <h3>Friend requests</h3>
          <ul>
            {allFriendRequests.map((friendship: FriendshipWithFriend) => {
              return (
                <li key={friendship.id}>
                  <FriendRequestCard
                    currentUserId={currentUserId}
                    friendRequest={friendship}
                  />
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
