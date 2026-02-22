'use client';

import { User } from '@/generated/prisma/client';
import { CldImage } from 'next-cloudinary';

type ProfileImageProps = {
  user: User;
  className?: string;
};

export default function ProfileImage({ user, className }: ProfileImageProps) {
  if (!user.image) {
    return null;
  }

  return (
    <CldImage
      width="960"
      height="600"
      src={user.image ?? ''}
      sizes="100vw"
      alt="Profile image"
      className={className}
    />
  );
}
