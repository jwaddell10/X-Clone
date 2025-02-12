/*
  Warnings:

  - You are about to drop the column `Userid` on the `Likes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_Userid_fkey";

-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "Userid",
ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
