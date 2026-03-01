'use client';

import { Dialog } from 'radix-ui';
import { Cross2Icon } from '@radix-ui/react-icons';
import Button from '@/components/ui/Button';
import UsersList from '../UsersList';

import styles from '@/styles/modal.module.scss';

type SearchUsersModalProps = {
  userId: string;
  children: React.ReactNode;
};

export default function SearchUsersModal({
  userId,
  children,
}: SearchUsersModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modalContent}>
          <Dialog.Title className={styles.modalTitle}>
            Search for users
          </Dialog.Title>
          <Dialog.Description className={styles.modalDescription}>
            <span className="vh">Search for users by name or email.</span>
          </Dialog.Description>
          <UsersList userId={userId} />
          <Dialog.Close asChild>
            <Button aria-label="Close" className={styles.closeButton}>
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
