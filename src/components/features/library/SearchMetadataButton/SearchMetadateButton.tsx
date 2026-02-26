'use client';

import React from 'react';

import {
  searchBookMetadata,
  searchMovieMetadata,
} from '@/app/actions/metadata';

import { ItemType } from '@/lib/item-types';
import { Dialog } from 'radix-ui';
import { Cross2Icon } from '@radix-ui/react-icons';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Form from 'next/form';

type SearchMetadataButtonProps = {
  itemType: ItemType;
  className?: string;
  children: React.ReactNode;
};

import styles from '@/styles/modal.module.scss';

export default function SearchMetadataButton({
  itemType,
  children,
}: SearchMetadataButtonProps) {
  const handleSearch = async (formData: FormData) => {
    const query = formData.get('query') as string;
    if (itemType === 'BOOK') {
      await searchBookMetadata(query);
    } else if (itemType === 'MOVIE') {
      await searchMovieMetadata(query);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button type="button">{children}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modalContent}>
          <Dialog.Title className={styles.modalTitle}>
            Search for {itemType}
          </Dialog.Title>
          <Form action={handleSearch}>
            <Input
              label="Search"
              type="search"
              name="query"
              required
              placeholder="Search by title"
            />
            <Button type="submit">Search</Button>
          </Form>

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
