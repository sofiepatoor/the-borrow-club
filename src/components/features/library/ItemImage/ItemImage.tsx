'use client';

import { Item } from '@/generated/prisma/client';
import { CldImage } from 'next-cloudinary';

type ItemImageProps = {
  item: Item;
  className?: string;
};

export default function ItemImage({ item, className }: ItemImageProps) {
  if (!item.image) {
    return null;
  }

  return (
    <CldImage
      width="960"
      height="600"
      src={item.image ?? ''}
      sizes="100vw"
      alt={`Image of ${item.title}`}
      className={className}
    />
  );
}
