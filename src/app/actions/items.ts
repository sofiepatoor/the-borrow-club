'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function createItem(formData: FormData) {
  const title = formData.get('title') as string;
  const ownerId = formData.get('ownerId') as string;
  const ownerIdNum = parseInt(ownerId, 10);

  await prisma.item.create({
    data: {
      title: title.trim(),
      ownerId: ownerIdNum,
    },
  });

  revalidatePath('/');
}
