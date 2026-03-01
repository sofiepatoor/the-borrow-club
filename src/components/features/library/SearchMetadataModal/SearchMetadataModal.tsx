'use client';

import React, { useState } from 'react';

import {
  searchBookMetadata,
  searchMovieMetadata,
} from '@/app/actions/metadata';

import { ItemType } from '@/lib/item-types';
import { Dialog } from 'radix-ui';
import { Cross2Icon } from '@radix-ui/react-icons';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import MetadataSearchResult from '@/components/ui/MetadataSearchResult';

import type { BookFormData, MovieFormData } from '@/lib/metadata-mapping';

type SearchMetadataModalProps = {
  itemType: ItemType;
  onSelectMetadata: (data: BookFormData | MovieFormData) => void;
  className?: string;
  children: React.ReactNode;
};

import modalStyles from '@/styles/modal.module.scss';
import styles from './search-metadata-modal.module.scss';

export default function SearchMetadataModal({
  itemType,
  onSelectMetadata,
  children,
}: SearchMetadataModalProps) {
  const [searchResults, setSearchResults] = useState<
    BookFormData[] | MovieFormData[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (query: string) => {
    if (itemType === 'BOOK') {
      const results = await searchBookMetadata(query);
      setSearchResults(results);
    } else if (itemType === 'MOVIE') {
      const results = await searchMovieMetadata(query);
      setSearchResults(results);
    }
  };

  const handleSelectResult = (result: BookFormData | MovieFormData) => {
    onSelectMetadata(result);
    setSearchResults([]);
    setIsModalOpen(false);
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={modalStyles.overlay} />
        <Dialog.Content className={modalStyles.modalContent}>
          <Dialog.Title className={modalStyles.modalTitle}>
            Search for {itemType}
          </Dialog.Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const query = formData.get('query') as string;
              handleSearch(query);
            }}
          >
            <Input
              label="Search"
              type="search"
              name="query"
              required
              placeholder="Search by title"
            />
            <Button type="submit">Search</Button>
          </form>

          {searchResults.length > 0 && (
            <ul className={styles.resultsList}>
              {searchResults.map((result, index) => (
                <li
                  key={result.id ?? `${result.title}-${index}`}
                  className={styles.resultItem}
                >
                  <MetadataSearchResult
                    result={result}
                    handleSelectResult={handleSelectResult}
                  />
                </li>
              ))}
            </ul>
          )}

          <Dialog.Close asChild>
            <Button aria-label="Close" className={modalStyles.closeButton}>
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
