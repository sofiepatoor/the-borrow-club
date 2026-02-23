-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('BOOK', 'MOVIE', 'VIDEO_GAME', 'BOARD_GAME', 'OTHER');

-- CreateEnum
CREATE TYPE "BookGenre" AS ENUM ('FANTASY', 'SCIENCE_FICTION', 'THRILLER', 'HORROR', 'DRAMA', 'MYSTERY', 'ROMANCE', 'HISTORICAL', 'POETRY', 'CLASSIC', 'KIDS', 'OTHER');

-- CreateEnum
CREATE TYPE "MovieGenre" AS ENUM ('ACTION', 'ADVENTURE', 'ANIMATION', 'COMEDY', 'THRILLER', 'DOCUMENTARY', 'DRAMA', 'FAMILY', 'FANTASY', 'HISTORY', 'HORROR', 'MUSIC', 'MYSTERY', 'ROMANCE', 'SCI_FI', 'OTHER');

-- CreateEnum
CREATE TYPE "VideoGamePlatform" AS ENUM ('PC', 'PLAYSTATION_4', 'PLAYSTATION_5', 'XBOX', 'NINTENDO_SWITCH', 'NINTENDO_WII', 'NINTENDO_DS', 'OTHER');

-- CreateEnum
CREATE TYPE "VideoGameGenre" AS ENUM ('ACTION', 'ADVENTURE', 'PUZZLE', 'STRATEGY', 'RPG', 'SIMULATION', 'SPORTS', 'PLATFORMER', 'SHOOTER', 'RACING', 'OTHER');

-- CreateEnum
CREATE TYPE "BoardGameGenre" AS ENUM ('FAMILY', 'PARTY', 'STRATEGY', 'DECK_BUILDING', 'CARD', 'PUZZLE', 'TRIVIA', 'OTHER');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "description" TEXT,
ADD COLUMN     "itemType" "ItemType" NOT NULL DEFAULT 'OTHER';

-- CreateTable
CREATE TABLE "BookItemDetails" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "releaseYear" INTEGER,
    "language" TEXT,
    "fiction" BOOLEAN NOT NULL DEFAULT true,
    "genre" "BookGenre"[],

    CONSTRAINT "BookItemDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieItemDetails" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "director" TEXT,
    "releaseYear" INTEGER,
    "genre" "MovieGenre"[],

    CONSTRAINT "MovieItemDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoGameItemDetails" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "platform" "VideoGamePlatform",
    "genre" "VideoGameGenre"[],

    CONSTRAINT "VideoGameItemDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardGameItemDetails" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "minPlayers" INTEGER,
    "maxPlayers" INTEGER,
    "cooperative" BOOLEAN NOT NULL DEFAULT false,
    "genre" "BoardGameGenre"[],

    CONSTRAINT "BoardGameItemDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookItemDetails_itemId_key" ON "BookItemDetails"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieItemDetails_itemId_key" ON "MovieItemDetails"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoGameItemDetails_itemId_key" ON "VideoGameItemDetails"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardGameItemDetails_itemId_key" ON "BoardGameItemDetails"("itemId");

-- AddForeignKey
ALTER TABLE "BookItemDetails" ADD CONSTRAINT "BookItemDetails_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieItemDetails" ADD CONSTRAINT "MovieItemDetails_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoGameItemDetails" ADD CONSTRAINT "VideoGameItemDetails_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameItemDetails" ADD CONSTRAINT "BoardGameItemDetails_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
