/*
  Warnings:

  - The values [SCI_FI] on the enum `MovieGenre` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MovieGenre_new" AS ENUM ('ACTION', 'ADVENTURE', 'ANIMATION', 'COMEDY', 'THRILLER', 'DOCUMENTARY', 'DRAMA', 'FAMILY', 'FANTASY', 'HISTORY', 'HORROR', 'MUSIC', 'MYSTERY', 'ROMANCE', 'SCIENCE_FICTION', 'OTHER');
ALTER TABLE "MovieItemDetails" ALTER COLUMN "genre" TYPE "MovieGenre_new"[] USING ("genre"::text::"MovieGenre_new"[]);
ALTER TYPE "MovieGenre" RENAME TO "MovieGenre_old";
ALTER TYPE "MovieGenre_new" RENAME TO "MovieGenre";
DROP TYPE "public"."MovieGenre_old";
COMMIT;
