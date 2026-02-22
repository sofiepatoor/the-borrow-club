'use client';

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import Button from '@/components/ui/Button';
import { updateProfileImage } from '@/app/actions/users';
import { User } from '@/generated/prisma/client';

type ProfileImageUploadProps = {
  user: User;
};

export default function ProfileImageUpload({ user }: ProfileImageUploadProps) {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/signature"
      uploadPreset="borrowclub_profile_images"
      options={{
        sources: ['local', 'url'],
        maxFiles: 1,
        resourceType: 'image',
      }}
      onSuccess={(result) => {
        const info = result?.info as CloudinaryUploadWidgetInfo;
        const publicId = info?.public_id;
        if (publicId) updateProfileImage(user.id, publicId);
      }}
    >
      {({ open }) => (
        <Button type="button" onClick={() => open()}>
          Update profile image
        </Button>
      )}
    </CldUploadWidget>
  );
}
