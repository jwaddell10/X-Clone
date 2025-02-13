/*
  Warnings:

  - You are about to drop the column `authorId` on the `Likes` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_postId_fkey";

-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" INTEGER;
