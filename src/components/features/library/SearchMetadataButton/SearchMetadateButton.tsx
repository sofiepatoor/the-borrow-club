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

import type { BookFormData, MovieFormData } from '@/lib/metadata-mapping';

type SearchMetadataButtonProps = {
  itemType: ItemType;
  onSelectMetadata: (data: BookFormData | MovieFormData) => void;
  className?: string;
  children: React.ReactNode;
};

import styles from '@/styles/modal.module.scss';

export default function SearchMetadataButton({
  itemType,
  onSelectMetadata,
  children,
}: SearchMetadataButtonProps) {
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
      <Dialog.Trigger asChild>
        <Button type="button">{children}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modalContent}>
          <Dialog.Title className={styles.modalTitle}>
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
            <ul>
              {searchResults.map((result, index) => (
                <li key={result.id ?? `${result.title}-${index}`}>
                  <h3>{result.title}</h3>
                  {result.description && <p>{result.description}</p>}
                  {result.releaseYear && <p>{result.releaseYear}</p>}
                  {'author' in result && result.author && (
                    <p>{result.author}</p>
                  )}
                  <Button
                    type="button"
                    onClick={() => handleSelectResult(result)}
                  >
                    Use this
                  </Button>
                </li>
              ))}
            </ul>
          )}

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
