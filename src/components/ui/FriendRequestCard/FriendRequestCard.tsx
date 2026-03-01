'use client';

import type { FriendshipWithFriend } from '@/app/actions/friendships';
import ProfileImage from '@/components/features/users/ProfileImage';
import RejectFriendRequestButton from '@/components/features/friends/RejectFriendRequestButton';
import AcceptFriendRequestButton from '@/components/features/friends/AcceptFriendRequestButton';
import CancelFriendRequestButton from '@/components/features/friends/CancelFriendRequestButton';

type FriendRequestCardProps = {
  currentUserId: string;
  friendRequest: FriendshipWithFriend;
};

import styles from './friend-request-card.module.scss';

function FriendRequestCard({
  currentUserId,
  friendRequest,
}: FriendRequestCardProps) {
  const { user, friend } = friendRequest;
  const isRequestedByCurrentUser = user.id === currentUserId;

  return (
    <div className={styles.friendRequestCard}>
      <div className={styles.userDetails}>
        <ProfileImage
          user={isRequestedByCurrentUser ? friend : user}
          className={styles.userImage}
        />
        {isRequestedByCurrentUser ? (
          <p>
            You sent a friend request to{' '}
            <strong>{friend.name ? friend.name : friend.username}</strong>.
          </p>
        ) : (
          <p>
            <strong>{user.name ? user.name : user.username}</strong> wants to be
            your friend!
          </p>
        )}
      </div>
      <div className={styles.buttons}>
        {isRequestedByCurrentUser ? (
          <CancelFriendRequestButton friendshipId={friendRequest.id} />
        ) : (
          <>
            <AcceptFriendRequestButton friendshipId={friendRequest.id} />
            <RejectFriendRequestButton friendshipId={friendRequest.id} />
          </>
        )}
      </div>
    </div>
  );
}

export default FriendRequestCard;
