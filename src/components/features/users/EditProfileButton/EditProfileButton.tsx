'use client';

import { type User } from '@/generated/prisma/client';
import { Dialog } from 'radix-ui';
import { Cross2Icon } from '@radix-ui/react-icons';
import Button from '@/components/ui/Button';
import EditProfileForm from '../EditProfileForm';

import styles from './edit-profile.module.scss';

type EditProfileButtonProps = {
  user: User;
  className?: string;
};

export default function EditProfileButton({
  user,
  className,
}: EditProfileButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className={className}>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modalContent}>
          <Dialog.Title className={styles.modalTitle}>
            Edit profile
          </Dialog.Title>
          <Dialog.Description className={styles.modalDescription}>
            Edit your profile information.
          </Dialog.Description>
          <EditProfileForm user={user} />
          <Dialog.Close asChild>
            <Button aria-label="Close">
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
