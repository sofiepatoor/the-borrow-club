'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getFriendIdsForUser } from './friendships';
import { type ItemType as ItemTypeValue } from '@/lib/item-types';
import {
  parseOptionalInt,
  parseCheckbox,
  filterEnumValues,
} from '@/lib/form-data';
import {
  ItemType as ItemTypeEnum,
  BookGenre,
  MovieGenre,
  VideoGamePlatform,
  VideoGameGenre,
  BoardGameGenre,
} from '@/generated/prisma/enums';

const VALID_ITEM_TYPES = new Set(Object.values(ItemTypeEnum));

export type CreateItemResult = { error?: string };

export async function createItem(
  formData: FormData,
): Promise<CreateItemResult> {
  const title = formData.get('title') as string | null;
  const ownerId = formData.get('ownerId') as string | null;
  const itemTypeRaw = formData.get('itemType') as string | null;
  const description = (formData.get('description') as string) ?? '';

  if (!title?.trim()) {
    return { error: 'Title is required' };
  }
  if (!ownerId) {
    return { error: 'Missing owner' };
  }
  if (!itemTypeRaw || !VALID_ITEM_TYPES.has(itemTypeRaw as ItemTypeValue)) {
    return { error: 'Please select a valid item type' };
  }

  const itemType = itemTypeRaw as ItemTypeValue;

  if (itemType === 'BOOK') {
    const author = (formData.get('author') as string)?.trim();
    if (!author) {
      return { error: 'Author is required for books' };
    }
  }

  await prisma.$transaction(async (tx) => {
    const item = await tx.item.create({
      data: {
        title: title.trim(),
        ownerId,
        itemType,
        description: description.trim() || undefined,
      },
    });

    switch (itemType) {
      case 'BOOK': {
        const author = (formData.get('author') as string)?.trim() ?? '';
        const releaseYear = parseOptionalInt(formData, 'releaseYear');
        const language =
          (formData.get('language') as string)?.trim() || undefined;
        const fiction = parseCheckbox(formData, 'fiction');
        const genre = filterEnumValues(
          formData.getAll('genre'),
          BookGenre as Record<string, string>,
        ) as import('@/generated/prisma/client').BookGenre[];
        await tx.bookItemDetails.create({
          data: {
            itemId: item.id,
            author,
            releaseYear,
            language,
            fiction,
            genre,
          },
        });
        break;
      }
      case 'MOVIE': {
        const director =
          (formData.get('director') as string)?.trim() || undefined;
        const releaseYear = parseOptionalInt(formData, 'releaseYear');
        const genre = filterEnumValues(
          formData.getAll('genre'),
          MovieGenre as Record<string, string>,
        ) as import('@/generated/prisma/client').MovieGenre[];
        await tx.movieItemDetails.create({
          data: {
            itemId: item.id,
            director,
            releaseYear,
            genre,
          },
        });
        break;
      }
      case 'VIDEO_GAME': {
        const platformRaw = formData.get('platform') as string | null;
        const platform =
          platformRaw &&
          Object.values(VideoGamePlatform).includes(platformRaw as never)
            ? (platformRaw as keyof typeof VideoGamePlatform)
            : undefined;
        const genre = filterEnumValues(
          formData.getAll('genre'),
          VideoGameGenre as Record<string, string>,
        ) as import('@/generated/prisma/client').VideoGameGenre[];
        await tx.videoGameItemDetails.create({
          data: {
            itemId: item.id,
            platform: platform ?? undefined,
            genre,
          },
        });
        break;
      }
      case 'BOARD_GAME': {
        const minPlayers = parseOptionalInt(formData, 'minPlayers');
        const maxPlayers = parseOptionalInt(formData, 'maxPlayers');
        const cooperative = parseCheckbox(formData, 'cooperative');
        const genre = filterEnumValues(
          formData.getAll('genre'),
          BoardGameGenre as Record<string, string>,
        ) as import('@/generated/prisma/client').BoardGameGenre[];
        await tx.boardGameItemDetails.create({
          data: {
            itemId: item.id,
            minPlayers,
            maxPlayers,
            cooperative,
            genre,
          },
        });
        break;
      }
      case 'OTHER':
        break;
    }
  });

  revalidatePath('/');
  revalidatePath('/library');
  return {};
}

export async function getOwnedItemsForUser(userId: string) {
  return await prisma.item.findMany({
    where: { ownerId: userId },
    orderBy: { id: 'desc' },
    include: {
      owner: true,
      bookDetails: true,
      movieDetails: true,
      videoGameDetails: true,
      boardGameDetails: true,
    },
  });
}

export async function getVisibleItemsForUser(
  userId: string,
  limit: number = 10,
) {
  const friendIds = await getFriendIdsForUser(userId);
  return await prisma.item.findMany({
    where: { ownerId: { in: [userId, ...friendIds] } },
    orderBy: { id: 'desc' },
    include: {
      owner: true,
      bookDetails: true,
      movieDetails: true,
      videoGameDetails: true,
      boardGameDetails: true,
    },
    take: limit,
  });
}
