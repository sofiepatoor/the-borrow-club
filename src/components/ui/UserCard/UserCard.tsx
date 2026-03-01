'use client';

import type { User } from '@/generated/prisma/client';
import ProfileImage from '@/components/features/users/ProfileImage';

type UserCardProps = {
  user: User;
};

import styles from './user-card.module.scss';

function UserCard({ user }: UserCardProps) {
  const { username } = user;

  return (
    <div className={styles.userCard}>
      <div className={styles.userImgWrapper}>
        <ProfileImage user={user} className={styles.userImg} />
      </div>
      <div className={styles.userCardContent}>
        <p className={styles.userName}>{user.name ? user.name : username}</p>
        <a href={`/users/${username}`} className={styles.viewProfileLink}>
          <span className="vh">View profile</span>
        </a>
      </div>
    </div>
  );
}

export default UserCard;
