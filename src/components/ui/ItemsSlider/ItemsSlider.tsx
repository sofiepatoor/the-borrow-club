'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import type { Item, User } from '@/generated/prisma/client';
type ItemWithOwner = Item & { owner: User | null };
type ItemsSliderProps = {
  items?: ItemWithOwner[] | null;
  currentUserId: string;
};

const splideOptions = {
  gap: '1rem',
  perPage: 2,
  perMove: 1,
};

import ItemCard from '@/components/features/library/ItemCard';

import styles from './items-slider.module.scss';

function ItemsSlider({ items = [], currentUserId }: ItemsSliderProps) {
  const list = items ?? [];
  if (list.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <div className={styles.wrapper}>
      <Splide options={splideOptions}>
        {list.map((item) => (
          <SplideSlide key={item.id}>
            <ItemCard item={item} currentUserId={currentUserId} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default ItemsSlider;
