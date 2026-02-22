'use server';

import { getCurrentUser } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getAllUsers() {
  return await prisma.user.findMany({
    orderBy: { id: 'desc' },
  });
}

export async function getAllUsersExceptCurrent(currentUserId: string) {
  return await prisma.user.findMany({
    where: { id: { not: currentUserId } },
    orderBy: { id: 'desc' },
  });
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
  });
}

export async function updateProfile(formData: FormData) {
  const userId = formData.get('userId') as string;
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;

  const currentUser = await getCurrentUser();
  if (userId !== currentUser?.id || !currentUser) return;

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: name.trim() || null,
      bio: bio.trim() || null,
    },
  });

  revalidatePath(`/users/${currentUser.username}`);
}

export async function updateProfileImage(
  userId: string,
  imagePublicId: string,
) {
  const currentUser = await getCurrentUser();
  if (userId !== currentUser?.id || !currentUser) return;

  await prisma.user.update({
    where: { id: userId },
    data: { image: imagePublicId },
  });

  revalidatePath(`/users/${currentUser.username}`);
}
