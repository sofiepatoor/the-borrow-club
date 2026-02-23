import type {
  Item,
  User,
  BookItemDetails,
  MovieItemDetails,
  VideoGameItemDetails,
  BoardGameItemDetails,
} from '@/generated/prisma/client';

export type ItemWithOwnerAndDetails = Item & {
  owner: User | null;
  bookDetails: BookItemDetails | null;
  movieDetails: MovieItemDetails | null;
  videoGameDetails: VideoGameItemDetails | null;
  boardGameDetails: BoardGameItemDetails | null;
};
