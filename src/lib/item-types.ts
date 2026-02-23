import {
  ItemType,
  BookGenre,
  MovieGenre,
  VideoGamePlatform,
  VideoGameGenre,
  BoardGameGenre,
} from '@/generated/prisma/enums';

// Re-export for consumers
export type { ItemType };

export type ItemTypeField = {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'checkbox';
  required?: boolean;
  options?: { value: string; label: string }[];
};

/* Convert a Prisma enum to an array of options. */
function enumToOptions(
  enumObj: Record<string, string>,
  overrides: Partial<Record<string, string>> = {},
): { value: string; label: string }[] {
  return Object.values(enumObj).map((value) => ({
    value,
    label:
      overrides[value] ??
      value
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase()),
  }));
}

export const ITEM_TYPE_OPTIONS: { value: ItemType; label: string }[] = [
  { value: 'BOOK', label: 'Book' },
  { value: 'MOVIE', label: 'Movie' },
  { value: 'VIDEO_GAME', label: 'Video game' },
  { value: 'BOARD_GAME', label: 'Board game' },
  { value: 'OTHER', label: 'Other' },
];

/* e.g. ITEM_TYPE_LABELS[item.itemType] */
export const ITEM_TYPE_LABELS = Object.fromEntries(
  ITEM_TYPE_OPTIONS.map((o) => [o.value, o.label]),
) as Record<ItemType, string>;

// Label overrides for some enum values.

const BOOK_GENRE_OPTIONS = enumToOptions(BookGenre as Record<string, string>, {
  SCIENCE_FICTION: 'Science fiction',
});

const MOVIE_GENRE_OPTIONS = enumToOptions(
  MovieGenre as Record<string, string>,
  {
    SCIENCE_FICTION: 'Science fiction',
  },
);

const VIDEO_GAME_PLATFORM_OPTIONS = enumToOptions(
  VideoGamePlatform as Record<string, string>,
  {
    PLAYSTATION_4: 'PlayStation 4',
    PLAYSTATION_5: 'PlayStation 5',
    NINTENDO_SWITCH: 'Nintendo Switch',
    NINTENDO_WII: 'Nintendo Wii',
    NINTENDO_DS: 'Nintendo DS',
  },
);

const VIDEO_GAME_GENRE_OPTIONS = enumToOptions(
  VideoGameGenre as Record<string, string>,
);

const BOARD_GAME_GENRE_OPTIONS = enumToOptions(
  BoardGameGenre as Record<string, string>,
  {
    DECK_BUILDING: 'Deck building',
  },
);

// Fields for each ItemType.

export const FIELDS_BY_ITEM_TYPE: Record<ItemType, ItemTypeField[]> = {
  BOOK: [
    { key: 'author', label: 'Author', type: 'text', required: true },
    { key: 'releaseYear', label: 'Release year', type: 'number' },
    { key: 'language', label: 'Language', type: 'text' },
    { key: 'fiction', label: 'Fiction', type: 'checkbox' },
    {
      key: 'genre',
      label: 'Genre',
      type: 'multiselect',
      options: BOOK_GENRE_OPTIONS,
    },
  ],
  MOVIE: [
    { key: 'director', label: 'Director', type: 'text' },
    { key: 'releaseYear', label: 'Release year', type: 'number' },
    {
      key: 'genre',
      label: 'Genre',
      type: 'multiselect',
      options: MOVIE_GENRE_OPTIONS,
    },
  ],
  VIDEO_GAME: [
    {
      key: 'platform',
      label: 'Platform',
      type: 'select',
      options: VIDEO_GAME_PLATFORM_OPTIONS,
    },
    {
      key: 'genre',
      label: 'Genre',
      type: 'multiselect',
      options: VIDEO_GAME_GENRE_OPTIONS,
    },
  ],
  BOARD_GAME: [
    { key: 'minPlayers', label: 'Min players', type: 'number' },
    { key: 'maxPlayers', label: 'Max players', type: 'number' },
    { key: 'cooperative', label: 'Cooperative', type: 'checkbox' },
    {
      key: 'genre',
      label: 'Genre',
      type: 'multiselect',
      options: BOARD_GAME_GENRE_OPTIONS,
    },
  ],
  OTHER: [],
};

export function getItemTypeLabel(itemType: ItemType): string {
  return ITEM_TYPE_LABELS[itemType];
}
