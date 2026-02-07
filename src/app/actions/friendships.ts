'use server';

import { revalidatePath } from 'next/cache';
import { FriendshipStatus } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export async function getFriendshipsForUser(
  userId: string,
  status?: FriendshipStatus,
) {
  return await prisma.friendship.findMany({
    where: {
      OR: [{ userId }, { friendId: userId }],
      status,
    },
    include: { friend: true, user: true },
  });
}

export async function findFriendship(userId: string) {
  if (!userId) {
    return null;
  }
  return await prisma.friendship.findFirst({
    where: {
      OR: [{ userId }, { friendId: userId }],
    },
  });
}

export async function getSentFriendshipRequests(userId: string) {
  return await prisma.friendship.findMany({
    where: {
      userId,
      status: FriendshipStatus.PENDING,
    },
    include: { friend: true },
  });
}

export async function getReceivedFriendRequests(userId: string) {
  return await prisma.friendship.findMany({
    where: {
      friendId: userId,
      status: FriendshipStatus.PENDING,
    },
    include: { user: true },
  });
}

export async function createFriendship(formData: FormData) {
  const userId = formData.get('userId') as string;
  const friendId = formData.get('friendId') as string;

  await prisma.friendship.create({
    data: {
      userId,
      friendId,
      status: FriendshipStatus.PENDING,
    },
  });

  revalidatePath('/');
}

export async function acceptFriendship(formData: FormData) {
  const friendshipId = parseInt(formData.get('friendshipId') as string);
  if (!friendshipId) {
    return;
  }

  await prisma.friendship.update({
    where: { id: friendshipId },
    data: { status: FriendshipStatus.ACCEPTED },
  });

  revalidatePath('/');
}

export async function deleteFriendship(formData: FormData) {
  const friendshipId = parseInt(formData.get('friendshipId') as string);
  if (!friendshipId) {
    return;
  }

  await prisma.friendship.delete({
    where: { id: friendshipId },
  });

  revalidatePath('/');
}

export type FriendshipWithFriend = Awaited<
  ReturnType<typeof getFriendshipsForUser>
>[number];
