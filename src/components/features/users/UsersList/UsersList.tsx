'use client';

import { useEffect, useState } from 'react';
import { getAllUsersExceptCurrent } from '@/app/actions/users';
import { type User } from '@/generated/prisma/client';
import UserCard from '@/components/ui/UserCard/UserCard';

import styles from './users-list.module.scss';

export default function UsersList({ userId }: { userId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllUsersExceptCurrent(userId).then((otherUsers) => {
      setUsers(otherUsers);
      setIsLoading(false);
    });
  }, [userId]);

  if (isLoading) {
    return <p className={styles.list}>Loading users...</p>;
  }

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
}
