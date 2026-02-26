'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import type { ItemWithOwnerAndDetails } from '@/types/items';
import ItemCard from '@/components/ui/ItemCard';

import styles from './items-slider.module.scss';

type ItemsSliderProps = {
  items?: ItemWithOwnerAndDetails[] | null;
  currentUserId: string;
};

const splideOptions = {
  gap: '1rem',
  perPage: 3,
  perMove: 1,
  pagination: false,
  classes: {
    arrows: `splide__arrows ${styles.sliderArrows}`,
    arrow: `splide__arrow ${styles.sliderArrow}`,
  },
};

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
