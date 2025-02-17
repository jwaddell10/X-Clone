/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Likes_postId_userId_commentId_key";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "parentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Likes_postId_userId_key" ON "Likes"("postId", "userId");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
