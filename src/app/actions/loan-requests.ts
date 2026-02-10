'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentUserId } from '@/auth';
import { LoanRequestStatus } from '@/generated/prisma/client';

export async function getSentLoanRequestsForUser(userId: string) {
  return await prisma.loanRequest.findMany({
    where: {
      requesterId: userId,
      status: LoanRequestStatus.PENDING,
    },
    include: {
      item: true,
      owner: true,
    },
  });
}

export async function getReceivedLoanRequestsForUser(userId: string) {
  return await prisma.loanRequest.findMany({
    where: {
      ownerId: userId,
      status: LoanRequestStatus.PENDING,
    },
    include: {
      item: true,
      requester: true,
    },
  });
}

export async function createLoanRequest(formData: FormData) {
  const ownerId = formData.get('ownerId') as string;
  const itemId = parseInt(formData.get('itemId') as string);
  const currentUserId = await getCurrentUserId();

  if (!currentUserId || !ownerId || !itemId) return;

  const existingLoanRequest = await prisma.loanRequest.findFirst({
    where: {
      itemId,
      ownerId,
      requesterId: currentUserId,
      status: LoanRequestStatus.PENDING,
    },
  });
  if (existingLoanRequest) return;

  await prisma.loanRequest.create({
    data: {
      itemId,
      requesterId: currentUserId,
      ownerId,
    },
  });

  revalidatePath('/library');
}

export async function acceptLoanRequest(formData: FormData) {
  const loanRequestId = formData.get('loanRequestId') as string;
  const currentUserId = await getCurrentUserId();
  if (!currentUserId || !loanRequestId) return;

  const request = await prisma.loanRequest.findUnique({
    where: { id: loanRequestId, ownerId: currentUserId },
    include: { item: true },
  });
  if (!request) return;

  await prisma.$transaction([
    prisma.loanRequest.update({
      where: { id: loanRequestId, ownerId: currentUserId },
      data: { status: LoanRequestStatus.ACCEPTED },
    }),
    prisma.loan.create({
      data: {
        itemId: request.itemId,
        requesterId: request.requesterId,
        ownerId: currentUserId,
      },
    }),
    prisma.item.update({
      where: { id: request.itemId },
      data: { isAvailable: false },
    }),
    // auto-reject other pending requests
    prisma.loanRequest.updateMany({
      where: {
        itemId: request.itemId,
        status: LoanRequestStatus.PENDING,
        NOT: { id: loanRequestId },
      },
      data: { status: LoanRequestStatus.REJECTED },
    }),
  ]);

  revalidatePath('/library');
}

export async function rejectLoanRequest(formData: FormData) {
  const loanRequestId = formData.get('loanRequestId') as string;
  const currentUserId = await getCurrentUserId();
  if (!currentUserId || !loanRequestId) return;

  await prisma.loanRequest.update({
    where: { id: loanRequestId, ownerId: currentUserId },
    data: { status: LoanRequestStatus.REJECTED },
  });

  revalidatePath('/library');
}

export async function cancelLoanRequest(formData: FormData) {
  const loanRequestId = formData.get('loanRequestId') as string;
  const currentUserId = await getCurrentUserId();
  if (!currentUserId || !loanRequestId) return;

  await prisma.loanRequest.delete({
    where: { id: loanRequestId, requesterId: currentUserId },
  });

  revalidatePath('/library');
}
