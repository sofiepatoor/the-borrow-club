'use client';

import { useState } from 'react';
import type { ItemWithOwnerAndDetails } from '@/types/items';
import { Dialog } from 'radix-ui';
import { Cross2Icon } from '@radix-ui/react-icons';
import Button from '@/components/ui/Button';
import EditItemForm from '@/components/features/library/EditItemForm';

import styles from '@/styles/modal.module.scss';

type EditItemModalProps = {
  userId: string;
  item: ItemWithOwnerAndDetails;
  children: React.ReactNode;
};
export default function EditItemModal({
  userId,
  item,
  children,
}: EditItemModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modalContent}>
          <Dialog.Title className={styles.modalTitle}>Edit item</Dialog.Title>
          <Dialog.Description className={styles.modalDescription}>
            Edit the details of &quot;{item.title}&quot;.
          </Dialog.Description>
          <EditItemForm
            userId={userId}
            item={item}
            onSuccess={() => setIsModalOpen(false)}
          />
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
