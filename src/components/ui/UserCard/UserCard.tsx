'use client';

import type { User } from '@/generated/prisma/client';

type UserCardProps = {
  user: User;
};

import styles from './user-card.module.scss';

function UserCard({ user }: UserCardProps) {
  const { username } = user;

  return (
    <div className={styles.userCard}>
      <p className={styles.username}>
        <strong>{username}</strong>
      </p>
      <a href={`/users/${username}`} className={styles.viewProfileLink}>
        <span className="vh">View profile</span>
      </a>
    </div>
  );
}

export default UserCard;
