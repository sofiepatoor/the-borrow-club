import {
  type FriendshipWithFriend,
  getFriendshipsForUser,
} from '@/app/actions/friendships';
import { FriendshipStatus } from '@/generated/prisma/enums';

import Section from '@/components/ui/Section';
import FriendRequestCard from '@/components/ui/FriendRequestCard/FriendRequestCard';

type FriendRequestsListProps = {
  userId: string;
};

import styles from './friend-requests-list.module.scss';
import { getCurrentUserId } from '@/auth';

async function FriendRequestsList({ userId }: FriendRequestsListProps) {
  const currentUserId = await getCurrentUserId();

  if (!currentUserId || userId !== currentUserId) {
    return null;
  }

  const allFriendRequests = await getFriendshipsForUser(
    userId,
    FriendshipStatus.PENDING,
  );

  return (
    <div className={styles.wrapper}>
      {allFriendRequests.length > 0 && (
        <Section>
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
