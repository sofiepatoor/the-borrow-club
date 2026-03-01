'use server';

import { getCurrentUserId } from '@/auth';
import { Loan, User } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { ItemWithOwnerAndDetails } from '@/types/items';
import { revalidatePath } from 'next/cache';

const itemInclude = {
  owner: true,
  bookDetails: true,
  movieDetails: true,
  videoGameDetails: true,
  boardGameDetails: true,
} as const;

export type LoanWithRelations = Loan & {
  item: ItemWithOwnerAndDetails;
  requester: User;
  owner: User;
};

export async function getLoansForUser(
  userId: string,
): Promise<LoanWithRelations[]> {
  return await prisma.loan.findMany({
    where: {
      OR: [{ requesterId: userId }, { ownerId: userId }],
    },
    include: {
      item: { include: itemInclude },
      requester: true,
      owner: true,
    },
  });
}

export async function getLoansForItem(
  itemId: number,
): Promise<LoanWithRelations[]> {
  return await prisma.loan.findMany({
    where: { itemId },
    include: {
      item: { include: itemInclude },
      requester: true,
      owner: true,
    },
  });
}

export async function returnLoan(formData: FormData) {
  const loanId = formData.get('loanId') as string;
  const currentUserId = await getCurrentUserId();

  if (!currentUserId || !loanId) return;

  const loan = await prisma.loan.findUnique({
    where: { id: loanId },
    include: { item: true },
  });

  if (!loan) return;

  await prisma.$transaction([
    prisma.loan.update({
      where: { id: loanId },
      data: { endedAt: new Date() },
    }),
    prisma.item.update({
      where: { id: loan.itemId },
      data: { isAvailable: true },
    }),
  ]);

  revalidatePath('/library');
}
