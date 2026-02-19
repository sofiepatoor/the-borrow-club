'use server';

import { prisma } from '@/lib/prisma';

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
