import { getAllUsersExceptCurrent } from '@/app/actions/users';
import { type User } from '@/generated/prisma/client';
import Link from 'next/link';

import styles from './users-list.module.scss';

async function UsersList({ userId }: { userId: string }) {
  const currentUserId = userId;
  const otherUsers = await getAllUsersExceptCurrent(currentUserId);

  return (
    <ul className={styles.list}>
      {otherUsers.map((user: User) => {
        return (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.username}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default UsersList;
