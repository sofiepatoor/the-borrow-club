'use client';

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import Button from '@/components/ui/Button';
import { updateItemImage } from '@/app/actions/items';
import { Item } from '@/generated/prisma/client';

type ItemImageUploadProps = {
  item: Item;
};

export default function ItemImageUpload({ item }: ItemImageUploadProps) {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/signature"
      uploadPreset="borrowclub_item_images"
      options={{
        sources: ['local', 'url'],
        maxFiles: 1,
        resourceType: 'image',
      }}
      onSuccess={(result) => {
        const info = result?.info as CloudinaryUploadWidgetInfo;
        const publicId = info?.public_id;
        if (publicId) updateItemImage(item.id, publicId);
      }}
    >
      {({ open }) => (
        <Button type="button" onClick={() => open()}>
          Update item image
        </Button>
      )}
    </CldUploadWidget>
  );
}
