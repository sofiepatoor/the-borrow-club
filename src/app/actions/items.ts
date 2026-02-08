'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getFriendIdsForUser } from './friendships';

export async function createItem(formData: FormData) {
  const title = formData.get('title') as string;
  const ownerId = formData.get('ownerId') as string;

  await prisma.item.create({
    data: {
      title: title.trim(),
      ownerId,
    },
  });

  revalidatePath('/');
}

export async function getOwnedItemsForUser(userId: string) {
  return await prisma.item.findMany({
    where: { ownerId: userId },
    orderBy: { id: 'desc' },
    include: { owner: true },
  });
}

export async function getVisibleItemsForUser(userId: string) {
  const friendIds = await getFriendIdsForUser(userId);
  return await prisma.item.findMany({
    where: { ownerId: { in: [userId, ...friendIds] } },
    orderBy: { id: 'desc' },
    include: { owner: true },
  });
}
