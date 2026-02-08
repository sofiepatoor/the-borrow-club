'use server';

import { revalidatePath } from 'next/cache';
import { FriendshipStatus } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function getFriendsForUser(userId: string) {
  return await prisma.friendship.findMany({
    where: {
      OR: [{ userId }, { friendId: userId }],
      status: FriendshipStatus.ACCEPTED,
    },
    include: { friend: true, user: true },
  });
}

export async function getFriendIdsForUser(userId: string) {
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [{ userId }, { friendId: userId }],
      status: FriendshipStatus.ACCEPTED,
    },
    select: { userId: true, friendId: true },
  });
  return friendships.map((f) =>
    f.userId === userId ? f.friendId : f.userId,
  );
}

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

export async function findFriendshipBetweenUsers(
  userId: string,
  friendId: string,
) {
  if (!userId || !friendId) {
    return null;
  }
  return await prisma.friendship.findFirst({
    where: {
      OR: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
    },
  });
}

export async function createFriendship(formData: FormData): Promise<void> {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;
    if (!currentUserId) return;

    const friendId = formData.get('friendId') as string;
    if (!friendId) return;

    const existingFriendship = await findFriendshipBetweenUsers(
      currentUserId,
      friendId,
    );
    if (existingFriendship) return;

    await prisma.friendship.create({
      data: {
        userId: currentUserId,
        friendId,
        status: FriendshipStatus.PENDING,
      },
    });

    revalidatePath('/');
  } catch {
    // Error handled - page won't revalidate, user can retry
  }
}

export async function acceptFriendship(formData: FormData): Promise<void> {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;
    if (!currentUserId) return;

    const friendshipId = parseInt(formData.get('friendshipId') as string);
    if (!friendshipId) return;

    const friendship = await prisma.friendship.findUnique({
      where: { id: friendshipId },
    });
    if (!friendship || friendship.friendId !== currentUserId) return;

    await prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: FriendshipStatus.ACCEPTED },
    });

    revalidatePath('/');
  } catch {
    // Error handled - page won't revalidate, user can retry
  }
}

export async function deleteFriendship(formData: FormData): Promise<void> {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;
    if (!currentUserId) return;

    const friendshipId = parseInt(formData.get('friendshipId') as string);
    if (!friendshipId) return;

    const friendship = await prisma.friendship.findUnique({
      where: { id: friendshipId },
    });
    const isParticipant =
      friendship?.userId === currentUserId ||
      friendship?.friendId === currentUserId;
    if (!friendship || !isParticipant) return;

    await prisma.friendship.delete({
      where: { id: friendshipId },
    });

    revalidatePath('/');
  } catch {
    // Error handled - page won't revalidate, user can retry
  }
}

export type FriendshipWithFriend = Awaited<
  ReturnType<typeof getFriendshipsForUser>
>[number];
